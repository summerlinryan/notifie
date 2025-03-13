import { env } from "process";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import unkey from "~/server/unkey";

export const projectsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(32),
        description: z.string().optional(),
        generateApiKey: z.boolean().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const project = await ctx.db.project.create({
          data: {
            name: input.name,
            description: input.description || "",
            userId: ctx.session.user.id,
          },
        });

        let apiKey = null;
        if (input.generateApiKey) {
          const keyResponse = await unkey.keys.create({
            apiId: env.UNKEY_API_ID ?? "",
            prefix: "ntf",
            meta: { projectId: project.id.toString() },
          });

          if (keyResponse.error) {
            throw new Error(keyResponse.error.message);
          }

          await ctx.db.apiKey.create({
            data: {
              projectId: project.id,
              keyId: keyResponse.result?.keyId,
            },
          });

          apiKey = keyResponse.result?.key;
        }

        return {
          success: true,
          project,
          apiKey,
        };
      } catch (error) {
        return {
          success: false,
          error: `Failed to create project: ${error}`,
        };
      }
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.project.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        apiKeys: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const projectsWithKeyDetails = await Promise.all(
      projects.map(async (project) => {
        if (project.apiKeys.length === 0) {
          return { ...project, apiKeys: [] };
        }

        const keysWithDetails = await Promise.all(
          project.apiKeys.map(async (key) => {
            try {
              const keyDetails = await unkey.keys.get({
                keyId: key.keyId,
              });

              return {
                ...key,
                status:
                  keyDetails.error || !keyDetails.result
                    ? "revoked"
                    : keyDetails.result.enabled
                      ? "active"
                      : "revoked",
              };
            } catch (error) {
              console.error(
                `Error fetching key details for ${key.keyId}:`,
                error,
              );
              return { ...key, status: "revoked" };
            }
          }),
        );

        return { ...project, apiKeys: keysWithDetails };
      }),
    );

    return projectsWithKeyDetails;
  }),
  revokeApiKey: protectedProcedure
    .input(
      z.object({
        keyId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const revokeResult = await unkey.keys.delete({
          keyId: input.keyId,
        });

        if (revokeResult.error) {
          throw new Error(revokeResult.error.message);
        }

        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: `Failed to revoke API key: ${error}`,
        };
      }
    }),
  generateApiKey: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const project = await ctx.db.project.findFirst({
          where: {
            id: input.projectId,
            userId: ctx.session.user.id,
          },
        });

        if (!project) {
          throw new Error("Project not found or you don't have access");
        }

        const keyResponse = await unkey.keys.create({
          apiId: env.UNKEY_API_ID ?? "",
          prefix: "ntf",
          meta: { projectId: project.id.toString() },
        });

        if (keyResponse.error) {
          throw new Error(keyResponse.error.message);
        }

        await ctx.db.apiKey.create({
          data: {
            projectId: input.projectId,
            keyId: keyResponse.result?.keyId,
          },
        });

        return {
          success: true,
          apiKey: keyResponse.result?.key,
        };
      } catch (error) {
        return {
          success: false,
          error: `Failed to generate API key: ${error}`,
        };
      }
    }),
});
