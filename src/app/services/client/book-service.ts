import axios from "axios";
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