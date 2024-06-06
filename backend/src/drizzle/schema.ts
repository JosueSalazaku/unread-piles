import { integer, pgTable, serial, text, timestamp, numeric, varchar, pgEnum, index, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

export const UserRole = pgEnum('userRole', ['user', 'Admin']);

// Users table definition
export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    surname: varchar('surname', { length: 255 }).notNull(),
    username: varchar('username', { length: 255 }).notNull().unique(),
    age: integer('age').notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    role: UserRole('userRole').default('user').notNull(),
}, (table) => { // Fixed syntax error by adding parentheses around "table"
    return {
        emailIndex: uniqueIndex("emailIndex").on(table.email)
    }
});

// Posts table definition
export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),  // Changed to uuid
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),  
    rating: integer('rating').notNull().default(0),
    averageRating: numeric('average_rating').default('0'),
    ratingCount: integer('rating_count').default(0),
});

// Post Ratings table definition
export const postRatings = pgTable('post_ratings', {
    id: serial('id').primaryKey(),
    postId: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),  // Changed to uuid
    rating: integer('rating').notNull(),
    ratedAt: timestamp('rated_at').notNull().defaultNow(),
});

// Books table definition
export const books = pgTable('books', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    isbn: text('isbn').notNull().unique(),
    publicationDate: timestamp('publication_date').notNull(),
    genre: varchar('genre', { length: 255 }),  // No need for nullable/optional, it is already optional by default
    description: varchar('description', { length: 255 }).default(''),
});

// Authors table definition
export const authors = pgTable('authors_table', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    bio: varchar('bio', { length: 255 }).default(''),  // No need for nullable/optional, it is already optional by default
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Author Books table definition
export const authorBooks = pgTable('author_books_table', {
    id: serial('id').primaryKey(),
    authorId: integer('author_id').notNull().references(() => authors.id, { onDelete: 'cascade' }),
    bookId: integer('book_id').notNull().references(() => books.id, { onDelete: 'cascade' }),
    contributedAt: timestamp('contributed_at').notNull().defaultNow(),
});
