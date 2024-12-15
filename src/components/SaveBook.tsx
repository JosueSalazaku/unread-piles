import React from "react";

export function SaveBook() {

    function handleStatusChange() {
        // handle the changes in stasus for the readers/ User
    }

    return (
        <select onChange={handleStatusChange} className="bg-main-orange rounded text-sm px-1 py-1" defaultValue={"Read"}>
            <option>Read</option>
            <option>Currently Reading</option>
            <option>Finished</option>
            <option>Abandoned</option>
            <option>Remove Book</option>
        </select>
    );
}
