import React, { useState } from "react";
import type { SaveBookProps } from "@/types";
import { saveUserBook } from "@/app/services/backend/book-service";
import { useCustomSession } from "./SessionProvider";

export function SaveBook({ id, title, author, status: initialStatus }: SaveBookProps) {
    const [savedBook, setSavedBook] = useState<SaveBookProps | null>(null);
    const [saved, setSaved] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(initialStatus || "Read"); 


    const session = useCustomSession();
    const userId = session.data?.user?.id

    async function handleSavingBook() {
        if (!userId) {
            return <div>Log in to save books</div>
        }

        try {
            const saveBookByUser = await saveUserBook(id, title, author, status);
            setSavedBook(saveBookByUser)

            if (saveBookByUser) {
                setSaved(true); 
            }

        } catch (error) {
            console.error("Failed to save the book:", error);
            setSaved(false);
        }
    }

    async function handleStatusChange() {
        // handle the changes in status for the readers/ User
    }

    async function handleBookRemoval() {
        //
    }

    return (
        <>
            {savedBook ? (
                <select onChange={handleStatusChange} className="bg-main-orange rounded text-white text-sm px-1 py-1" defaultValue={"Read"}>
                    <option >Read</option>
                    <option>Currently Reading</option>
                    <option>Finished</option>
                    <option>Abandoned</option>
                    <option onClick={handleBookRemoval}>Remove Book</option>
                </select>
            ) : (
                <button onClick={handleSavingBook} className="bg-main-orange rounded text-white  text-sm px-2 py-1">Save to Library</button>
            )}
        </>
    );
}