import {
  pgTable,
  foreignKey,
  uuid,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const items = pgTable(
  "items",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    name: text().notNull(),
    description: text(),
    category: text().default("Sem categoria"),
    quantity: integer().notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    projectId: uuid("project_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.projectId],
      foreignColumns: [projects.id],
      name: "items_project_id_projects_id_fk",
    }).onDelete("cascade"),
  ],
);

export const projects = pgTable("projects", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: text().notNull(),
  description: text(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
});
