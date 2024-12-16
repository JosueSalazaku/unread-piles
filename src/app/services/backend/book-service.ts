import { getSession,  } from "@/app/lib/auth-client";
import type { SaveBookProps } from "@/types";
import axios from "axios";

const fetchAccessToken = async () => {
    try {
        const response = await axios.get<{ accessToken: string }>("/api/auth/tokens/access-token");
        return response.data.accessToken;
    } catch (error) {
        console.error("Error fetching access token:", error);
        throw new Error("Could not fetch access token. Please try again.");
    }
};

export const saveUserBook = async (bookId: string, title: string, author: string, status: string): Promise<SaveBookProps> => {
    const userSession = await getSession();
    const userId = userSession.data?.session.userId;

    if (!userId) {
        throw new Error("User must be logged in to save a book.");
    }

    const accessToken = await fetchAccessToken();

    if (!accessToken) {
        throw new Error("Access token not found.");
    }

    const data: SaveBookProps = { bookId, title, author, status };

    try {
        const response = await axios.post("/api/books", data, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        console.log(response.data);
        if (response.data) {
            console.log("Book was successfully saved", response);
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
};