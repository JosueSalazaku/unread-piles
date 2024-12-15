import axios from "axios";
import type { GoogleBook } from "@/types";

const APIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
const url = `https://www.googleapis.com/books/v1/volumes?q=random&key=${APIKey}`;

/**
 * Fetches a predefined set of books (e.g., random or general list) from Google Books API.
 * @returns An array of books or an empty array in case of an error.
 */
export const fetchGeneralBook = async (): Promise<GoogleBook[]> => {
    if (!APIKey) {
        console.error("Google Books API key is missing.");
        return [];
    }

    try {
        const response = await axios.get<{ items: GoogleBook[] }>(url);

        return response.data.items || [];
    } catch (error) {
        console.error("Error fetching general books:", error);
        return [];
    }
};
