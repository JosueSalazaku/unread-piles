// ReadingStatus Enum definition as a TypeScript Type
export type ReadingStatus = "reading" | "completed" | "want_to_read";

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  passwordHash?: string; // Add this to the interface
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  userId: string;
}

export interface Account {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  expiresAt?: Date;
  password?: string;
}

export interface Verification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt?: Date;
}

// Book Interface
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publicationDate: Date;
  genre?: string;
  description?: string;
  totalPages: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

export interface VolumeInfo {
  title: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  imageLinks?: {
    thumbnail?: string;
  };
}

export interface GoogleBook {
  id: string;
  volumeInfo: VolumeInfo;
}

// Author Interface
export interface Author {
  id: string;
  name: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Author-Books Relationship Interface
export interface AuthorBook {
  id: number;
  authorId: string;
  bookId: string;
  contributedAt: Date;
}

// ReadingList Interface for tracking reading status
export interface ReadingList {
  id: string;
  userId: string;
  bookId: string;
  status: ReadingStatus;
  addedAt: Date;
}

// UserBooks Interface for tracking user-specific book progress
export interface UserBook {
  id: string;
  userId: string;
  bookId: string;
  pagesRead: number;
  completedAt?: Date;
}

// BookRating Interface for rating books
export interface BookRating {
  id: number;
  bookId: string;
  userId: string;
  rating: number;
  ratedAt: Date;
}

// BookComment Interface for commenting on books
export interface BookComment {
  id: number;
  bookId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

// Post Interface
export interface Post {
  id: string;
  title: string;
  userId: string;
  content: string;
  pictureUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// PostRating Interface for rating posts
export interface PostRating {
  id: number;
  postId: string;
  userId: string;
  rating: number;
  ratedAt: Date;
}

export interface PictureDropdownProps {
    session: {
      data?: {
        session?: {
          id: string;
          userId: string;
          expiresAt: Date;
          ipAddress?: string | null;
          userAgent?: string | null;
        } | null;
        user?: {
          id: string;
          name: string;
          email: string;
          image?: string | null;
        } | null;
      } | null;
    };
    toggleDropdown: () => void;
  }