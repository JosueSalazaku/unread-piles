import { integer, pgTable, serial, text, timestamp, varchar, uniqueIndex, uuid } from 'drizzle-orm/pg-core';



// Users table definition
export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    firstName: varchar('firstName', { length: 255 }).notNull(),
    username: varchar('username', { length: 255 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    clerkId: text('clerk_id').notNull().unique(), // Ensure clerkId is unique
    pictureUrl: text('picture_url').notNull(),
    role: varchar('role', { length: 50 }).default('user').notNull(),
  }, (table) => ({
    emailIndex: uniqueIndex('emailIndex').on(table.email),
    clerkIdUniqueIndex: uniqueIndex('clerk_id_unique').on(table.clerkId), 
  }));

// Books table definition
export const books = pgTable('books', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    isbn: text('isbn').notNull().unique(),
    publicationDate: timestamp('publication_date').notNull(),
    genre: varchar('genre', { length: 255 }),
    description: text('description').default(''),
    totalPages: integer('total_pages').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Authors table definition
export const authors = pgTable('authors', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    bio: text('bio').default(''),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Author-Books relationship table
export const authorBooks = pgTable('author_books', {
    id: serial('id').primaryKey(),
    authorId: uuid('author_id').notNull().references(() => authors.id, { onDelete: 'cascade' }),
    bookId: uuid('book_id').notNull().references(() => books.id, { onDelete: 'cascade' }),
    contributedAt: timestamp('contributed_at').notNull().defaultNow(),
});

// User Reading List table to track book status (reading, completed, want_to_read)
export const readingLists = pgTable('reading_lists', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    bookId: uuid('book_id').notNull().references(() => books.id, { onDelete: 'cascade' }),
    status: varchar('status', { length: 50 }).notNull(),
    addedAt: timestamp('added_at', { withTimezone: true }).defaultNow().notNull(),
});

// Table to track user-specific book progress (e.g., pages read)
export const userBooks = pgTable('user_books', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    bookId: uuid('book_id').notNull().references(() => books.id, { onDelete: 'cascade' }),
    pagesRead: integer('pages_read').default(0),
    completedAt: timestamp('completed_at', { withTimezone: true }),
});

// Book Ratings table
export const bookRatings = pgTable('book_ratings', {
    id: serial('id').primaryKey(),
    bookId: uuid('book_id').notNull().references(() => books.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    rating: integer('rating').notNull(),
    ratedAt: timestamp('rated_at').defaultNow().notNull(),
});

// Book Comments table
export const bookComments = pgTable('book_comments', {
    id: serial('id').primaryKey(),
    bookId: uuid('book_id').notNull().references(() => books.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});