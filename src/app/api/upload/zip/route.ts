import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import unzipper from "unzipper";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Create temp directory
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "upload-"));

    // Save uploaded file to temp directory
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const zipPath = path.join(tempDir, file.name);
    fs.writeFileSync(zipPath, buffer);

    // Unzip the file
    await fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: tempDir }))
      .promise();

    // TODO: Parse code files in tempDir (e.g., .ts, .js, .py)
    // For now, just list files
    let fileNames: string[] = [];
    try {
      const files = fs.readdirSync(tempDir, { withFileTypes: true });
      fileNames = files.map((f) => f.name);
    } catch {
      // ignore
    }

    // Clean up tempDir after processing
    fs.rmSync(tempDir, { recursive: true, force: true });

    return NextResponse.json({ message: "ZIP uploaded and extracted", files: fileNames });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}
