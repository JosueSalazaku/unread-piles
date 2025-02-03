import React, { useEffect, useState } from "react";
import type { Books } from "@/types";
import { saveUserBook, saveBookStatus, updateBookStatus, fetchUserBooks } from "@/services/backend/book-service";
import { useCustomSession } from "./SessionProvider";
import bookStatus from "./../services/backend/bookStatus.json";

export function SaveBook({ id }: Books) {
  const [isSaving, setIsSaving] = useState(false);
  const [savedBook, setSavedBook] = useState<Books | null>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("To read");

  const session = useCustomSession();
  const userId = session.data?.user?.id;

  useEffect(() => {
    if (!userId || !id) return;
  
    const fetchUserBooksByStatus = async () => {
      try {
        const userBooksStatus = await fetchUserBooks(userId);
        const bookStatus = userBooksStatus.find((book) => book.bookId === id);
        if (bookStatus) {
          setSavedBook(bookStatus);
          setStatus(bookStatus.status ?? "To read");
          setSaved(true);
        }
      } catch (error) {
        console.error("Failed to fetch user books status:", error);
      }
    };
  
    void fetchUserBooksByStatus();
  }, [userId, id]);
  

  async function handleSavingBook() {
    if (!userId) {
      return <div>Log in to save books</div>;
    }
    setIsSaving(true);

    try {
      const saveBookByUser = await saveUserBook(id);
      setSavedBook(saveBookByUser);

      const saveStatusByUser = await saveBookStatus(userId, id, status);
      setStatus(saveStatusByUser);

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

  async function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = event.target.value;
    if (userId && id) {
      await updateBookStatus(userId, id, newStatus);
      setStatus(newStatus);
      setSaved(true)
    }
  }

  // async function removeBook(userId: string, id: string, status: string) {

  // }

  if (!session.data?.user) {
    <div>Log in To save books!</div>;
  }

  return (
    <>
      {savedBook && saved ? (
        <select className="rounded bg-main-orange px-1 py-1 text-sm text-white"
        onChange={handleStatusChange}
        >
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
