import React, { useState } from "react";
import type { Books } from "@/types";
import { saveUserBook } from "@/services/backend/book-service";
import { useCustomSession } from "./SessionProvider";
import { updateBookStatus } from "@/services/backend/book-service";

export function SaveBook({ id }: Books) {
  const [savedBook, setSavedBook] = useState<Books | null>(null);
  const [saved, setSaved] = useState<boolean>(false);

  const session = useCustomSession();
  const userId = session.data?.user?.id;
  const status = "";

  async function handleSavingBook() {
    if (!userId) {
      return <div>Log in to save books</div>;
    }

    try {
      const saveBookByUser = await saveUserBook(id);
      setSavedBook(saveBookByUser);

      if (saveBookByUser) {
        setSaved(true);
      }
    } catch (error) {
      console.error("Failed to save the book:", error);
      setSaved(false);
    }
  }

  async function handleStatusChange() {
    // const changeBookStatus = await updateBookStatus(userId, status)
  }

  async function handleBookRemoval() {
    //
  }

  if (!session.data?.user) {
    <div>Log in To save books!</div>;
  }

  return (
    <>
      {savedBook ? (
        <select
          onChange={handleStatusChange}
          className="rounded bg-main-orange px-1 py-1 text-sm text-white"
          defaultValue={"Read"}
        >
          <option>Read</option>
          <option>Currently Reading</option>
          <option>Finished</option>
          <option>Abandoned</option>
          <option onClick={handleBookRemoval}>Remove Book</option>
        </select>
      ) : (
        <button
          onClick={handleSavingBook}
          className="rounded bg-main-orange px-2 py-1 text-sm text-white"
        >
          Save to Library
        </button>
      )}
    </>
  );
}
