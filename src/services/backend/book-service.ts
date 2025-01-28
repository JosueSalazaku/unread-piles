import type { UserBooks, Books } from "@/types";
import axios from "axios";

const fetchAccessToken = async () => {
    try {
        const response = await axios.get<{ accessToken: string }>(`${process.env.NEXT_PUBLIC_API_ROUTE}/account/tokens`);
        return response.data.accessToken;
    } catch (error) {
        console.error("Error fetching access token:", error);
        throw new Error("Could not fetch access token. Please try again.");
    }
};

export const saveUserBook = async (id: string): Promise<Books> => {
    try {
        const accessToken = await fetchAccessToken();
        if (!accessToken) {
            throw new Error("Access token not found.");
        }

        const data: Books = { id };

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/books`, data, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.status === 201) {
            return response.data as Books;
        } else {
            throw new Error("Failed to save the book, unexpected API response.");
        }
    } catch (error) {
        console.error("Error saving the book:", error);
        throw new Error("Could not save the book. Please try again.");
    }
};

export const fetchUserBooks = async (userId: string): Promise<UserBooks[]> => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ROUTE}/userBooks`, {
            params: { userId },
        });
        
        if (response.status === 200) {
            return response.data as UserBooks[];
        } else {
            throw new Error("Failed to fetch user books, unexpected API response.");
        }
    } catch (error) {
        console.error("Error fetching user books:", error);
        throw new Error("Could not fetch user books. Please try again.");
    }
};


export const fetchUserBooksByStatus = async (status: string): Promise<UserBooks[]> => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ROUTE}/userBooks`, {
            params: { status },
        });

        if (response.status === 200) {
            return response.data as UserBooks[];
        } else {
            throw new Error("Failed to fetch books by status, unexpected API response.");
        }
    } catch (error) {
        console.error("Error fetching books by status:", error);
        throw new Error("Could not fetch books by status. Please try again.");
    }
};

export const saveBookStatus = async (userId: string, bookId: string, status: string) => {
    try {
        const accessToken = await fetchAccessToken();
        if (!accessToken) {
            throw new Error("Access token not found.");
        }    
        
        const data = {userId, bookId, status}

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/userBooks`, data, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })

        if (response.status === 201 || response.status === 200) {
            return response.data as string;
        } else {
            throw new Error("Failed to save the book status, unexpected API response.");
        }
            
    } catch (error) {
        console.error("Error saving the book status:", error);
        throw new Error("Could not save the book status. Please try again.");
    }
} 

export const updateBookStatus = async (userId: string, bookId: string, status: string) => {
    try {
        const data = { userId, bookId, status };
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_ROUTE}/userBooks`, data);

        if (response.status !== 200) {
            throw new Error("Failed to update book status, unexpected API response.");
        }
    } catch (error) {
        console.error("Error updating the book status:", error);
        throw new Error("Could not update the book status. Please try again.");
    }
};