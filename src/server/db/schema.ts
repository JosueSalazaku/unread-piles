import { pgTable, integer, serial, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull().unique(),
    image: text('image'),
    passwordHash: text('password_hash'), 
    providerId: text('provider_id').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Add the verification table definition
export const verification = pgTable('verification', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    token: text('token').notNull(),
    type: text('type').notNull(), // e.g., "email_verification", "password_reset"
    createdAt: timestamp('created_at').defaultNow().notNull(),
    expiresAt: timestamp('expires_at').notNull(), // Expiration time for the token
});

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

// Author-Books relationship table for many-to-many association
export const authorBooks = pgTable('author_books', {
    id: serial('id').primaryKey(),
    authorId: uuid('author_id').notNull().references(() => authors.id, { onDelete: 'cascade' }),
    bookId: uuid('book_id').notNull().references(() => books.id, { onDelete: 'cascade' }),
    contributedAt: timestamp('contributed_at').notNull().defaultNow(),
});

// Reading Lists table to track user's reading list with status
export const readingLists = pgTable('reading_lists', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    bookId: uuid('book_id').notNull().references(() => books.id, { onDelete: 'cascade' }),
    status: varchar('status', { length: 50 }).notNull(), // reading, completed, want_to_read
    addedAt: timestamp('added_at', { withTimezone: true }).defaultNow().notNull(),
});

// User Books table to track user-specific book progress
export const userBooks = pgTable('user_books', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    bookId: uuid('book_id').notNull().references(() => books.id, { onDelete: 'cascade' }),
    pagesRead: integer('pages_read').default(0),
    completedAt: timestamp('completed_at', { withTimezone: true }),
});

// Book Ratings table for users to rate books
export const bookRatings = pgTable('book_ratings', {
    id: serial('id').primaryKey(),
    bookId: uuid('book_id').notNull().references(() => books.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    rating: integer('rating').notNull(),
    ratedAt: timestamp('rated_at').defaultNow().notNull(),
});

// Book Comments table for user comments on books
export const bookComments = pgTable('book_comments', {
    id: serial('id').primaryKey(),
    bookId: uuid('book_id').notNull().references(() => books.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
