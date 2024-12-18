import type { GoogleBook } from "@/types";
import axios from "axios";

const APIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

export const fetchBooksByGenre = async (genre: string): Promise<GoogleBook[]> => {
    if (!APIKey) {
        console.error("Google Books API key is missing.");
        return [];
    }
    try {
        const response = await axios.get<{ items: GoogleBook[] }>(
            `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=20&key=${APIKey}`
        );
        return response.data.items || [];
    } catch (error) {
        console.error(`Error fetching ${genre} books:`, error);
        return [];
    }
};

export const fetchFictionBooks = () => fetchBooksByGenre("fiction");
export const fetchRomanceBooks = () => fetchBooksByGenre("romance");
export const fetchFantasyBooks = () => fetchBooksByGenre("fantasy");
export const fetchScienceFictionBooks = () => fetchBooksByGenre("science-fiction");
export const fetchMysteryBooks = () => fetchBooksByGenre("mystery");
export const fetchThrillerBooks = () => fetchBooksByGenre("thriller");
export const fetchHistoryBooks = () => fetchBooksByGenre("history");
export const fetchHorrorBooks = () => fetchBooksByGenre("horror");
export const fetchPoetryBooks = () => fetchBooksByGenre("poetry");
export const fetchBiographyBooks = () => fetchBooksByGenre("biography");
export const fetchYoungAdultBooks = () => fetchBooksByGenre("young+adult");
export const fetchEducationBooks = () => fetchBooksByGenre("education");