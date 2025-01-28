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
  status?: string;
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

export interface GoogleBook {
  id: string;
  volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
  title: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  imageLinks?: {
    extraLarge?: string;
    large?: string;
    medium?: string;
    small?: string;
    smallThubnail?: string;
    thumbnail?: string;
  };
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

export interface Status {
  status: string;
}