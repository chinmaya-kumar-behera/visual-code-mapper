import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { files } = await request.json();

    // TODO: Implement actual parsing logic using tree-sitter or other parser
    // For now, simulate parsed data structure

    const parsedData = files.map((file: string, index: number) => ({
      id: index + 1,
      label: file,
      type: "file",
      content: "Simulated file content for " + file,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    return NextResponse.json({ parsedData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}
