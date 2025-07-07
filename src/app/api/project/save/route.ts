import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/lib/db";
import { projects, files, graphNodes, graphEdges } from "@/lib/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectName, description, files: fileData, nodes, edges } = await request.json();

    if (!projectName || !fileData || !nodes || !edges) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert project
    const projectResult = await db.insert(projects).values({
      userId: Number(session.user.id as string),
      name: projectName,
      description: description || "",
      isPublic: false,
    }).returning();

    const projectId = projectResult[0].id;

    // Insert files
    for (const file of fileData) {
      await db.insert(files).values({
        projectId,
        path: file.path || "",
        content: file.content || "",
        language: file.language || "",
      });
    }

    // Insert graph nodes
    for (const node of nodes) {
      await db.insert(graphNodes).values({
        projectId,
        label: node.label,
        type: node.type,
        content: node.content || "",
      });
    }

    // Insert graph edges
    for (const edge of edges) {
      await db.insert(graphEdges).values({
        fromNode: edge.fromNode,
        toNode: edge.toNode,
        type: edge.type || "",
      });
    }

    return NextResponse.json({ message: "Project saved successfully", projectId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}
