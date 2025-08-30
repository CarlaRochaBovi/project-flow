import { eq } from "drizzle-orm";
import type {
  FastifyPluginCallbackZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const deleteProjectRoute: FastifyPluginCallbackZod = (app) => {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/projects/:projectId",
    {
      schema: {
        params: z.object({
          projectId: z.uuid(),
        }),
        response: {
          200: z.object({
            message: z.string("Project deleted successfuly!"),
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
          .delete(schema.projects)
          .where(eq(schema.projects.id, projectId));

        return reply
          .status(201)
          .send({ message: "Project deleted successfuly!" });
      } catch (error) {
        return reply.status(500).send({
          error: "Server error...",
        });
      }
    },
  );
};
