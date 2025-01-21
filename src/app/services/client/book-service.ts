import axios from "axios";
import type { AxiosError } from "axios";
import type { GoogleBook } from "@/types";

const APIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

export const fetchGeneralBook = async (): Promise<GoogleBook[]> => {
    if (!APIKey) {
        console.error("Google Books API key is missing.");
        return [];
    }

    try {
        const response = await axios.get<{ items: GoogleBook[] }>(`https://www.googleapis.com/books/v1/volumes?q=random&key=${APIKey}`);
        return response.data.items || [];
    } catch (error) {
        console.error("Error fetching general books:", error);
        return [];
    }
};

export const fetchBookByInput = async (query: string, startIndex: number, maxResults: number): Promise<GoogleBook[]> => {
    if (!APIKey) {
        console.error("Google Books API key is missing.");
        return [];
    }

    if (!query) {
        console.error("Search Querry is required")
    }

    try {
        const response = await axios.get<{ items: GoogleBook[] }>(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${APIKey}&startIndex=${startIndex}&maxResults=${maxResults}`)
        return response.data.items || [];
    } catch (error) {
        console.error("Error fetching books by input:", error);
        return [];
    }
    
}

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000; // Initial delay in milliseconds

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchAllUserBooks = async (bookId: string): Promise<GoogleBook | null> => {
  if (!bookId) {
    return null;
  }
    
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      const response = await axios.get<{ volumeInfo: GoogleBook }>(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );
      return response.data.volumeInfo || null;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 429) {
        attempts++;
        const delay = RETRY_DELAY * Math.pow(2, attempts);
        console.warn(`Rate limit exceeded. Retrying in ${delay} ms...`);
        await sleep(delay);
      } else {
        console.error(`Error fetching book details for bookId ${bookId}:`, axiosError);
        return null;
      }
    }
  }

  console.error(`Failed to fetch book details for bookId ${bookId} after ${MAX_RETRIES} attempts.`);
  return null;
};