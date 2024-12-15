import { getSession,  } from "@/app/lib/auth-client";
import type { SaveBookProps } from "@/types";
import axios from "axios";

export const SaveBook = async (bookId: string, title: string, author: string, status: string): Promise<SaveBookProps> => {
    const userSession = await getSession();

    if (!userSession?.data?.user) {
        throw new Error("User must be logged in to save a book.");
    }

    const { user } = userSession.data;

    const data: SaveBookProps = {
        bookId,
        title,
        author,
        status,
     }

    try {
        const response = await axios.post("/api/books", data)
        console.log(response.data)
        if (response.data) {
            console.log("Book was Succsessfully saved", response);
        } else {
            console.error("Failed to save the book, no data returned from the API.");
        }
        
    } catch (error) {
        console.error("Error saving the book:", error);
        throw new Error("Could not save the book. Please try again.");
    }

    return {
        bookId,
        title,
        author,
        status
    };
}