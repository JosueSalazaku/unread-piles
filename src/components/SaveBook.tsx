import React, { useState } from "react";
import type { Books, } from "@/types";
import { saveUserBook, saveBookStatus } from "@/services/backend/book-service";
import { useCustomSession } from "./SessionProvider";
import bookStatus from "./../services/backend/bookStatus.json";

export function SaveBook({ id }: Books) {
  const [savedBook, setSavedBook] = useState<Books | null>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const [savedStatus, setsavedStatus] = useState<string>("");
  const [status, setStatus] = useState<string>("To read")

  const session = useCustomSession();
  const userId = session.data?.user?.id;  

  async function handleSavingBook() {
    if (!userId) {
      return <div>Log in to save books</div>;
    }

    try {
      const saveBookByUser = await saveUserBook(id);      
      setSavedBook(saveBookByUser);
      
      if ( saveBookByUser) {
        setSaved(true) 
      }

    } catch (error) {
      console.error("Failed to save the book:", error);
      setSaved(false);
    }
  }

  if (!session.data?.user) {
    <div>Log in To save books!</div>;
  }

  return (
    <>
      {savedBook ? (
        <select
          className="rounded bg-main-orange px-1 py-1 text-sm text-white">
          {bookStatus.status.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}

        </select>
      ) : (
        <button
          onClick={handleSavingBook}
          className="rounded  bg-dark-brown px-4 py-1 text-sm text-white dark:text-white"
        >
          To Read
        </button>
      )}
    </>
  );
}
