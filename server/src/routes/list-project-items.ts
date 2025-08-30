import { eq } from "drizzle-orm";
import type {
  FastifyPluginCallbackZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const listProjectsItemsRoute: FastifyPluginCallbackZod = (app) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/projects/:projectId/items",
    {
      schema: {
        params: z.object({
          projectId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            items: z.array(
              z.object({
                id: z.string().uuid(),
                projectId: z.string().uuid(),
                name: z.string(),
                description: z.string().nullable().optional(),
                category: z.string().nullable().optional(),
                quantity: z.number().int(),
                price: z.number(),
                createdAt: z.date(),
              }),
            ),
            message: z.string(),
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
        const items = await db
          .select()
          .from(schema.items)
          .where(eq(schema.items.projectId, projectId))
          .orderBy(schema.items.createdAt);

        const itemsWithNumberPrice = items.map((item) => ({
          ...item,
          price: Number(item.price),
        }));

        return reply.status(200).send({
          items: itemsWithNumberPrice,
          message: `${items.length} item(s) found!`,
        });
      } catch (error) {
        console.error("Error fetching items:", error);
        return reply.status(500).send({
          error: "Server error...",
        });
      }
    },
  );
};
