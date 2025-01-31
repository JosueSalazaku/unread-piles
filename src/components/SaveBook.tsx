import React, { useEffect, useState } from "react";
import type { Books } from "@/types";
import { saveUserBook, saveBookStatus, updateBookStatus, fetchUserBooks } from "@/services/backend/book-service";
import { useCustomSession } from "./SessionProvider";
import bookStatus from "./../services/backend/bookStatus.json";

export function SaveBook({ id }: Books) {
  const [isSaving, setIsSaving] = useState(false);
  const [savedBook, setSavedBook] = useState<Books | null>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const [savedStatus, setSavedStatus] = useState<string>("");
  const [status, setStatus] = useState<string>("To read");
  const [fetchedStatus, setFetchedStatus] = useState<string | null>(null);
  const session = useCustomSession();
  const userId = session.data?.user?.id;

  useEffect(() => {
    async function fetchUserBooksByStatus(userId: string) {
      try {
        const userBooksStatus = await fetchUserBooks(userId);
        console.log(userBooksStatus[0]?.status);
        const bookStatus = userBooksStatus[0]?.status;
        setFetchedStatus(bookStatus ?? null);
      } catch (error) {
        console.error("Failed to fetch user books status:", error);
        setFetchedStatus(null);
      }
    }

    if (userId) {
      void fetchUserBooksByStatus(userId);
    }
  }, [userId]);

  async function handleSavingBook() {
    if (!userId) {
      return <div>Log in to save books</div>;
    }
    setIsSaving(true);

    try {
      const saveBookByUser = await saveUserBook(id);
      setSavedBook(saveBookByUser);

      const saveStatusByUser = await saveBookStatus(userId, id, status);
      setSavedStatus(saveStatusByUser);

      if (saveBookByUser && saveStatusByUser) {
        setSaved(true);
      }
    } catch (error) {
      console.error("Failed to save the book:", error);
      setSaved(false);
    } finally {
      setIsSaving(false);
    }
  }

  // async function handleStatusChange(userId: string, id: string, status: string) {
  //   const changeStatus = await updateBookStatus(userId, id, status);
  // }

  if (!session.data?.user) {
    <div>Log in To save books!</div>;
  }

  return (
    <>
      {savedBook && fetchedStatus ? (
        <select className="rounded bg-main-orange px-1 py-1 text-sm text-white">
          {bookStatus.status.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      ) : (
        <button
          onClick={handleSavingBook}
          className="rounded bg-dark-brown px-4 py-1 text-sm text-white dark:text-white"
        >
          {isSaving ? "Saving..." : "Save Book"}
        </button>
      )}
    </>
  );
}
