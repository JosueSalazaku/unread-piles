"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeLoader from "react-spinners/FadeLoader";
import type { GoogleBook } from "@/types";
import { fetchGeneralBook } from "@/services/client/book-service";
import { SaveBook } from "./SaveBook";

export default function GeneralBooks() {
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
            className="border-dark-gray mb-8 border-b p-6 transition-shadow duration-300"
          >
            <div className="flex items-start gap-6">
              {book.volumeInfo.imageLinks?.thumbnail && (
                <Link href={`/books/${book.id}`}>
                  <Image
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title ?? ""}
                    width={128}
                    height={192}
                    className="border-dark-gray border-1"
                  />
                </Link>
              )}
              <div className="flex-1">
                <Link href={`/books/${book.id}`}>
                  <h2 className="font-semibold md:text-xl">
                    {book.volumeInfo.title}
                  </h2>
                </Link>
                <p className="mb-1 text-main-orange">
                  {book?.volumeInfo?.authors?.join(", ") ?? "Unknown Author"}
                </p>
                <p className="">
                {book.volumeInfo.pageCount} pages
                </p>
                <div className="py-4">
                  <SaveBook id={book.id} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
