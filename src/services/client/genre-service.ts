import type { GoogleBooksApiResponse } from "@/types";
import axios from "axios";

const APIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

export const fetchBooksByGenre = async (genre: string, startIndex = 0): Promise<GoogleBooksApiResponse> => {
    if (!APIKey) {
        console.error("Google Books API key is missing.");
        return { items: [], totalItems: 0 }; 
    }
    try {
        const response = await axios.get<GoogleBooksApiResponse>(
            `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&startIndex=${startIndex}&maxResults=20&key=${APIKey}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${genre} books:`, error);
        return { items: [], totalItems: 0 }; 
    }
};