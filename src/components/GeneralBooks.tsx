"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeLoader from "react-spinners/FadeLoader";
import type { GoogleBook, SaveBookProps } from "@/types";
import { fetchGeneralBook } from "@/services/client/book-service";
import { SaveBook } from "./SaveBook";

export default function GeneralBooks({ status, id }: SaveBookProps) {
  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      try {
        const fetchedBooks = await fetchGeneralBook();
        setBooks(fetchedBooks);
      } catch {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    }

    void loadBooks();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <FadeLoader color="#912b12" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <ul>
        {books.map((book) => (
          <li
            key={book.id}
            className="border-dark-gray mb-8 rounded-md border p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="flex items-start gap-6">
              {book.volumeInfo.imageLinks?.thumbnail && (
                <Link href={`/books/${book.id}`}>
                  <Image
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title ?? ""}
                    width={128}
                    height={192}
                    className="border-dark-gray rounded-md border-1 drop-shadow-lg"
                  />
                </Link>
              )}
              <div className="flex-1">
                <Link href={`/books/${book.id}`}>
                  <h2 className="mb-2 text-xl font-semibold">
                    {book.volumeInfo.title}
                  </h2>
                </Link>
                {book.volumeInfo.authors && (
                  <div>
                    <p className="mb-1 text-main-orange">
                      <strong>Authors:</strong>{" "}
                      {book.volumeInfo.authors.join(", ")}
                    </p>
                    <p className="text-dark-gray py-4">
                      Pages: {book.volumeInfo.pageCount}
                    </p>
                  </div>
                )}
                <SaveBook
                  id={book.id}
                  // status=""
                  // title={book.volumeInfo.title}
                  // author={book.volumeInfo.authors?.join(", ") ?? "Unknown Author"}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
