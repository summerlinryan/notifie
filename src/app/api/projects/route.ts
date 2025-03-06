import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export async function POST(request: Request) {
  // Check authentication
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, description, generateApiKey } = await request.json();

    // Create project in database
    const project = await db.project.create({
      data: {
        name,
        description,
        userId: session.user.id,
      },
    });

    // Generate API key if requested
    let apiKey = null;
    if (generateApiKey) {
      // Similar API key creation logic as above
    }

    return NextResponse.json({ project, apiKey });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
