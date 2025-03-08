"use server";

import { revalidatePath } from "next/cache";
import { env } from "process";
import { db } from "~/server/db";
import unkey from "~/server/unkey";

export async function createProject({
  name,
  description,
  generateApiKey,
}: {
  name: string;
  description: string;
  generateApiKey: boolean;
}): Promise<{ apiKey: string | null; error: string | null }> {
  try {
    const project = await db.project.create({
      data: {
        name,
        description,
      },
    });

    let apiKey = null;
    if (generateApiKey) {
      const keyResponse = await unkey.keys.create({
        apiId: env.UNKEY_API_ID!,
        prefix: "ntf",
        meta: { projectId: project.id },
      });

      if (keyResponse.error) {
        throw new Error(keyResponse.error.message);
      }

      await db.apiKey.create({
        data: {
          projectId: project.id,
          keyId: keyResponse.result?.keyId,
        },
      });

      apiKey = keyResponse.result?.key;
    }

    revalidatePath("/projects");
    revalidatePath("/dashboard");

    return { apiKey, error: null };
  } catch (error) {
    return {
      apiKey: null,
      error: `Failed to create project or corresponding API key: ${error}`,
    };
  }
}
