import { and, eq, inArray } from "drizzle-orm";
import type {
  FastifyPluginCallbackZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const deleteSelectedItemsRoute: FastifyPluginCallbackZod = (app) => {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/projects/:projectId/items",
    {
      schema: {
        params: z.object({
          projectId: z.uuid(),
        }),

        body: z.object({
          itemsId: z.array(z.string().uuid()),
        }),

        response: {
          200: z.object({
            message: z.string("Items deleted successfuly!"),
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
        const { itemsId } = req.body;

        if (itemsId.length === 0) {
          return reply.status(404).send({
            error: "No items selected!",
          });
        }

        const result = await db
          .delete(schema.items)
          .where(
            and(
              eq(schema.items.projectId, projectId),
              inArray(schema.items.id, itemsId),
            ),
          )
          .returning({ deletedId: schema.items.id });

        return reply.status(200).send({
          message: `${result.length} item(s) deleted successfuly!`,
        });
      } catch (error) {
        return reply.status(500).send({ error: "Server error..." });
      }
    },
  );
};
