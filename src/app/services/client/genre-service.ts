import type { GoogleBook } from "@/types";
import axios from "axios";

const APIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

export const fetchBooksByGenre = async (genre: string, startIndex = 0): Promise<GoogleBook[]> => {
    if (!APIKey) {
        console.error("Google Books API key is missing.");
        return [];
    }
    try {
        const response = await axios.get<{ items: GoogleBook[] }>(
            `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&startIndex=${startIndex}&maxResults=20&key=${APIKey}`
        );
        return response.data.items || [];
    } catch (error) {
        console.error(`Error fetching ${genre} books:`, error);
        return [];
    }
};
