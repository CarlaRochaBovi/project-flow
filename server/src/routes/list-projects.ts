import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";
import z from "zod";

export const listProjectsRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/projects",
    {
      schema: {
        response: {
          200: z.object({
            projects: z.array(
              z.object({
                id: z.string().uuid(),
                name: z.string(),
                description: z.string().nullable().optional(),
                createdAt: z.date(),
              }),
            ),
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),

          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      try {
        const projects = await db
          .select()
          .from(schema.projects)
          .orderBy(schema.projects.createdAt);

        return reply.status(200).send({
          projects,
          message:
            projects.length === 0
              ? "No projects found!"
              : `${projects.length} project(s) found!`,
        });
      } catch (error) {
        return reply.status(500).send({
          error: "Server error...",
        });
      }
    },
  );
};
