import React, { useState } from "react";
import type { SaveBookProps, Book  } from "@/types";

export function SaveBook({ bookId, status }: SaveBookProps) {
    const [saved, setSaved] = useState<boolean>(false);


    function handleSavingBook() {
        //
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