import {
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { projects } from "./projects.ts";

export const items = pgTable("items", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  projectId: uuid()
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  name: text().notNull(),
  description: text(),
  category: text().default("Sem categoria"),
  quantity: integer().notNull(),
  price: numeric({ precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
