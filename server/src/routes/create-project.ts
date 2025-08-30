/** biome-ignore-all lint/suspicious/noConsole: console log err */
import type {
  FastifyPluginCallbackZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const createProjectRoute: FastifyPluginCallbackZod = (app) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/projects",
    {
      schema: {
        body: z.object({
          name: z
            .string()
            .min(1, "Name is mandatory")
            .max(100, "Max length is 100 characters"),
          description: z.string().max(600).optional().nullable(),
        }),

        response: {
          201: z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string().nullable(),
            createdAt: z.coerce.date(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      try {
        const { name, description } = req.body;
        const [project] = await db
          .insert(schema.projects)
          .values({ name, description })
          .returning();
        return reply.status(201).send({
          id: project.id,
          name: project.name,
          description: project.description,
          createdAt: project.createdAt,
        });
      } catch (error) {
        console.error("Error while creating project:", error);
        return reply.status(500).send({
          error: "Server error...",
        });
      }
    },
  );
};
