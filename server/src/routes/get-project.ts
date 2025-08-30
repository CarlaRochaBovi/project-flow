import { eq } from "drizzle-orm";
import type {
  FastifyPluginCallbackZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const getProjectRoute: FastifyPluginCallbackZod = (app) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/projects/:projectId",
    {
      schema: {
        params: z.object({
          projectId: z.string().uuid(), // Use z.string().uuid() em vez de z.uuid()
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string().nullable(),
            createdAt: z.date(),
          }),
          404: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      try {
        const { projectId } = req.params;
        
        const [project] = await db
          .select()
          .from(schema.projects)
          .where(eq(schema.projects.id, projectId));
        
        if (!project) {
          return reply.status(404).send({
            error: "Project not found",
          });
        }
        
        return reply.status(200).send({
          id: project.id,
          name: project.name,
          description: project.description,
          createdAt: project.createdAt,
        });
        
      } catch (error) {
        console.error("Error fetching project:", error);
        return reply.status(500).send({
          error: "Internal server error",
        });
      }
    }
  );
};
