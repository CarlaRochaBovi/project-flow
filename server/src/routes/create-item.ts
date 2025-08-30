/** biome-ignore-all lint/suspicious/noConsole: check if is working */
import type {
  FastifyPluginCallbackZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const createItemRoute: FastifyPluginCallbackZod = (app) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/projects/:projectId/items",
    {
      schema: {
        params: z.object({
          projectId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().min(1).max(50),
          description: z.string().max(200).optional().nullable(),
          category: z.string().optional().nullable(),
          quantity: z.coerce.number().int(),
          price: z.coerce.number(),
        }),

        response: {
          201: z.object({
            id: z.string().uuid(),
            projectId: z.string().uuid(),
            name: z.string(),
            description: z.string().optional().nullable(),
            category: z.string().optional().nullable(),
            quantity: z.number().int(),
            price: z.string(),
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
        const { projectId } = req.params;
        const { name, quantity, price, description, category } = req.body;

        const [item] = await db
          .insert(schema.items)
          .values({
            projectId,
            name,
            description,
            category,
            quantity,
            price: price.toFixed(2),
          })
          .returning();

        return reply.status(201).send({
          ...item,
          price: Number(item.price).toFixed(2),
        });
      } catch (error) {
        return reply.status(500).send({
          error: "Server error...",
        });
      }
    },
  );
};
