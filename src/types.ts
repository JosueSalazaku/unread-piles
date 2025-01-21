export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  passwordHash?: string;
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

export interface UserBooks {
  id: string;
  userId: string;
  bookId: string;
  status: string;
  createdAt: Date;
}

export interface Verification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt?: Date;
}

export interface Books {
  id: string;
}

export interface VolumeInfo {
  title?: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  imageLinks?: {
    thumbnail?: string;
  };
}

// Define your GoogleBook interface to match the structure
export interface GoogleBook {
  id: string;
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: {
    type: string;
    identifier: string;
  }[];
  readingModes?: {
    text: boolean;
    image: boolean;
  };
  pageCount?: number;
  printType?: string;
  categories?: string[];
  maturityRating?: string;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
  };
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
}


export interface BookRating {
  id: number;
  bookId: string;
  userId: string;
  rating: number;
  ratedAt: Date;
}

export interface BookComment {
  id: number;
  bookId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  title: string;
  userId: string;
  content: string;
  pictureUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface SaveBookProps {
  id: string;
  status: string;
  title: string;
  author: string;
}

export interface Status {
  saved: string;
  currentlyReading: string;
  abandoned: string;
  didNotFinish: string;
  finished: string;
  remove: string;
}

export interface GoogleBooksApiResponse {
  items: GoogleBook[];
  totalItems: number;
}
