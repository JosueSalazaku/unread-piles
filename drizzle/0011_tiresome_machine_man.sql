ALTER TABLE "userBooks" RENAME COLUMN "currentStatus" TO "status";--> statement-breakpoint
ALTER TABLE "book" DROP COLUMN IF EXISTS "authors";--> statement-breakpoint
ALTER TABLE "book" DROP COLUMN IF EXISTS "published_date";--> statement-breakpoint
ALTER TABLE "book" DROP COLUMN IF EXISTS "description";--> statement-breakpoint
ALTER TABLE "book" DROP COLUMN IF EXISTS "page_count";--> statement-breakpoint
ALTER TABLE "book" DROP COLUMN IF EXISTS "categories";--> statement-breakpoint
ALTER TABLE "book" DROP COLUMN IF EXISTS "thumbnail";