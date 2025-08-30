ALTER TABLE "project_items" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "project_items" CASCADE;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "project_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN "price";