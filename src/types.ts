// UserRole Enum definition as a TypeScript Type
export type UserRole = 'user' | 'Admin' | 'Moderator' | 'Publisher';

// ReadingStatus Enum definition as a TypeScript Type
export type ReadingStatus = 'reading' | 'completed' | 'want_to_read';

// User Interface
export interface User {
    id: string;
    name: string;
    firstName: string;
    username: string;
    email: string;
    clerkId: string;
    pictureUrl: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

export interface ClerkUserEventData {
    id: string;
    email_addresses: { email_address: string }[];
    first_name: string | null;
    last_name: string | null;
    username: string | null;
    image_url: string | null;
  }

  export interface ClerkWebhookEvent {
    type: string;
    data: ClerkUserEventData;
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

export interface VolumeInfo {
    title: string;
    authors?: string[]; // Optional, as it may be missing
    publishedDate?: string; // Optional, as it may be missing
    description?: string; // Optional
    imageLinks?: {
      thumbnail?: string; // Optional thumbnail URL
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
