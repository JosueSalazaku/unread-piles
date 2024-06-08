import { InferInsert, InferSelect } from 'drizzle-orm';
import { users, posts, postRatings, books, authors, authorBooks } from './src/drizzle/schema';

interface BookSchema {
    title: string;
    author: string;
    isbn: string;
    publicationDate: Date;
    genre?: string; // Optional
    description?: string; // Optional
}
  

export type InsertUser = InferInsert<typeof users>;
export type SelectUser = InferSelect<typeof users>;

export type InsertPost = InferInsert<typeof posts>;
export type SelectPost = InferSelect<typeof posts>;

export type InsertPostRating = InferInsert<typeof postRatings>;
export type SelectPostRating = InferSelect<typeof postRatings>;

export type InsertBook = InferInsert<typeof books>;
export type SelectBook = InferSelect<typeof books>;

export type InsertAuthor = InferInsert<typeof authors>;
export type SelectAuthor = InferSelect<typeof authors>;

export type InsertAuthorBook = InferInsert<typeof authorBooks>;
export type SelectAuthorBook = InferSelect<typeof authorBooks>;
