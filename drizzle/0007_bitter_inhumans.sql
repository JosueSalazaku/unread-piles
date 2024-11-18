CREATE TABLE IF NOT EXISTS "books" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"isbn" text NOT NULL,
	"publication_date" timestamp NOT NULL,
	"genre" varchar(255),
	"description" text DEFAULT '',
	"total_pages" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "books_isbn_unique" UNIQUE("isbn")
);
