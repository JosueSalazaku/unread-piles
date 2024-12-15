import React, { useState } from "react";
import type { SaveBookProps } from "@/types";
import { saveUserBook } from "@/app/services/backend/book-service";

export function SaveBook({ bookId, title, author, status }: SaveBookProps) {
    const [saved, setSaved] = useState<boolean>(false);


    async function handleSavingBook() {
        try {
            const saveBookByUser = await saveUserBook(bookId, title, author, status);

        } catch (error) {
            
        }

    }

    function handleStatusChange() {
        // handle the changes in status for the readers/ User
    }

    return (
        <>
            {saved ? (
                <select onChange={handleStatusChange} className="bg-main-orange rounded text-white text-sm px-1 py-1" defaultValue={"Read"}>
                    <option>Currently Reading</option>
                    <option>Finished</option>
                    <option>Abandoned</option>
                    <option>Remove Book</option>
                </select>
            ) : (
                <button onClick={handleSavingBook} className="bg-main-orange rounded text-white  text-sm px-2 py-1">Save to Library</button>
            )}
        </>
    );
}