import React, { useEffect, useState } from "react";
import { type GoogleBook } from "@/types";
import { useCustomSession } from "./SessionProvider";
import { fetchUserBooks } from "@/services/backend/book-service";
import { fetchGoogleBookById } from "@/services/client/book-service";
import FadeLoader from "react-spinners/FadeLoader";
import Image from "next/image";
import Link from "next/link";

export default function CurrentlyReading() {
  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const session = useCustomSession();
  const userId = session.data?.user?.id;

  useEffect(() => {
    const getUserBookData = async () => {
      try {
        if (userId) {
          const userBooks = await fetchUserBooks(userId);
          setLoading(true);

          const books = await Promise.all(
            userBooks.map(async (userBook) => {
              if (userBook.status === "Currently Reading") {
                const book = await fetchGoogleBookById(userBook.bookId);
                console.log(book, "All books from Currently Reading Piles");
                return book as GoogleBook | null;
              }
              return null;
            }),
          );
          setLoading(false);
          setBooks(books.filter((book): book is GoogleBook => book != null));
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching book data:", error.message);
        } else {
          console.error("Unknown error:", error);
        }
        setError("Could not fetch book data");
      }
    };
    void getUserBookData();
  }, [userId]);

  if (!userId) {
    return (
      <div>You are not logged in. Please sign in to view your information.</div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <FadeLoader color="#912b12" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <h1 className="py-4 text-center">Currently Reading</h1>
        {books ? (
          <ul className="flex flex-row justify-center gap-5">
            {books.map((book) => (
              <li key={book.id}>
                <Link href={`/books/${book.id}`}>
                  <Image
                    src={
                      book.volumeInfo.imageLinks?.thumbnail ??
                      "/default-image.jpg"
                    }
                    alt={book.volumeInfo.imageLinks?.medium ?? ""}
                    width={140}
                    height={50}
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div>No books yet</div>
        )}
      </div>
    </div>
  );
}
