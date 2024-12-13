CREATE TABLE IF NOT EXISTS "book" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"authors" text,
	"published_date" text,
	"description" text,
	"page_count" text,
	"categories" text,
	"thumbnail" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userBooks" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"bookId" text NOT NULL,
	"createdAt" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userBooks" ADD CONSTRAINT "userBooks_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userBooks" ADD CONSTRAINT "userBooks_bookId_book_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."book"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
