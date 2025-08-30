import { relations } from "drizzle-orm/relations";
import { projects, items } from "./schema";

export const itemsRelations = relations(items, ({ one }) => ({
  project: one(projects, {
    fields: [items.projectId],
    references: [projects.id],
  }),
}));

export const projectsRelations = relations(projects, ({ many }) => ({
  items: many(items),
}));
