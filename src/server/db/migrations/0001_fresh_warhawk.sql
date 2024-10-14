ALTER TABLE "users" RENAME COLUMN "clerkId" TO "clerk_id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "picture" TO "picture_url";--> statement-breakpoint
ALTER TABLE "reading_lists" ALTER COLUMN "status" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE varchar(50);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "clerk_id_unique" ON "users" USING btree ("clerk_id");--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "updated_at";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id");