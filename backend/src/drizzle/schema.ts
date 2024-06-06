import { integer, pgTable, serial, text, timestamp, numeric, varchar } from 'drizzle-orm/pg-core';

// Users table definition
export const users = pgTable('users', {
   id: serial('id').primaryKey(),
   name: varchar('name').notNull(),
   surname: varchar('surname').notNull(),
   age: integer('age').notNull(),
   email: text('email').notNull().unique(),
});

// Posts table definition
export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
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
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    rating: integer('rating').notNull(),
    ratedAt: timestamp('rated_at').notNull().defaultNow(),
});

// Books table definition
export const books = pgTable('books', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    author: text('author').notNull(),
    isbn: text('isbn').notNull().unique(),
    publicationDate: timestamp('publication_date').notNull(),
    genre: text('genre'),  // No need for nullable/optional, it is already optional by default
    description: text('description').default(''),
});

// Authors table definition
export const authors = pgTable('authors_table', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    bio: text('bio').default(''),  // No need for nullable/optional, it is already optional by default
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
