import type { UserBooks, Books } from "@/types";
import axios from "axios";

const fetchAccessToken = async () => {
    try {
        const response = await axios.get<{ accessToken: string }>("/api/protected/data/account/tokens");
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

        const response = await axios.post("/api/protected/data/books", data, {
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

export const fetchUserBooks = async (): Promise<UserBooks[]> => {
    try {
        const response = await axios.get('/api/protected/data/userBooks');
        console.log(response.data);

        if (response.status !== 200) {
            throw new Error("Failed to fetch book data");
        }
        return response.data as UserBooks[];
    } catch (error) {
        console.error("Error fetching book data:", error);
        throw new Error("Could not fetch book data. Please try again.");
    }
};

export const fetchUserBooksByUser = async (userId: string): Promise<UserBooks[]> => {
    try {
        const response = await axios.get(`/api/protected/data/userBooks?userId=${userId}`);

        if (response.status !== 200) {
            throw new Error("Failed to fetch books by user");
        }

        return response.data as UserBooks[];
    } catch (error) {
        console.error("Error fetching books by user:", error);
        throw new Error("Could not fetch books by user. Please try again.");
    }
};

export const fetchUserBooksByStatus = async (status: string): Promise<UserBooks[]> => {
    try {
        const response = await axios.get(`/api/protected/data/userBooks?status=${status}`);

        if (response.status !== 200) {
            throw new Error("Failed to fetch books by status");
        }

        return response.data as UserBooks[];
    } catch (error) {
        console.error("Error fetching books by status:", error);
        throw new Error("Could not fetch books by status. Please try again.");
    }
};

export const updateBookStatus = async (userId: string, bookId: string, status: string) => {
    try {
        const data = { userId, bookId, status };
        const response = await axios.patch('api/userBooks', data)
        console.log(response.data);
        
    } catch (error) {
        console.error("Error Updating the book status", error)
    }
}