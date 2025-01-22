import type { UserBooks, Books } from "@/types";
import axios from "axios";

const fetchAccessToken = async () => {
    try {
        const response = await axios.get<{ accessToken: string }>("/api/account/tokens");
        return response.data.accessToken;
    } catch (error) {
        console.error("Error fetching access token:", error);
        throw new Error("Could not fetch access token. Please try again.");
    }
};

export const saveUserBook = async(id: string ): Promise<Books> => {
    try {
        const accessToken = await fetchAccessToken();
        if (!accessToken) {
            throw new Error("Access token not found.");
        }

        const data: Books = { id };

        const response = await axios.post("/api/books", data, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.status === 201 || response.data) {
            return response.data as Books;
        } else {
            console.error("Failed to save the book, no data returned from the API.");
        }

        return data;
    } catch (error) {
        console.error("Error saving the book:", error);
        throw new Error("Could not save the book. Please try again.");
    }
};

export const fetchUserBooks = async (userId: string): Promise<UserBooks[]> => {
    try {

        if (!userId) {
            throw new Error('User ID is missing');
        }

        const response = await axios.get(`/api/userBooks/${userId}`)

        
        if (response.status !== 200) { 
            throw new Error("Failed to fetch book data");
        }
        return response.data as UserBooks[];
    } catch (error) {
        console.error("Error fetching book data:", error);
        throw new Error("Could not fetch book data. Please try again.");
    }
}

export const updateUserBookStatus = async (userId: string, bookId: string, status: string): Promise<UserBooks>  => {
    try {
        const response = await axios.patch(`/api/userBooks`, { userId, bookId, status });

        if (response.status !== 200) {
            throw new Error("Failed to update book status");
        }

        return response.data as UserBooks;
    } catch (error) {
        console.error("Error updating book status:", error);
        throw new Error("Could not update book status. Please try again.");
    }
}