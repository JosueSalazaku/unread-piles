"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import type { GoogleBook } from "@/types";
import { fetchBookByInput } from "@/services/client/book-service";
import Image from "next/image";
import Link from "next/link";
import { SaveBook } from "./SaveBook";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("s");

  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 10;

  useEffect(() => {
    async function loadBooks() {
      if (!query) return;
      setLoading(true);
      setError(null);

      try {
        const fetchedBooks = await fetchBookByInput(
          query,
          startIndex,
          maxResults,
        );
        setBooks(fetchedBooks);
      } catch {
        setError("Failed to fetch books. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    void loadBooks();
  }, [query, startIndex]);

  const handleNextPage = () => {
    setStartIndex((prevIndex) => prevIndex + maxResults);
  };

  const handlePreviousPage = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - maxResults, 0));
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <FadeLoader color="#912b12" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-3xl font-bold">
        Search Results for &quot;{query}&quot;
      </h1>

      {error && <div className="text-red-500">{error}</div>}

      <ul>
        {books.map((book) => (
          <li
            key={book.id}
            className="border-dark-gray mb-8  border-b p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="flex items-start gap-6">
              {book.volumeInfo.imageLinks?.thumbnail && (
                <Link href={`/books/${book.id}`}>
                  <Image
                    src={book.volumeInfo.imageLinks.thumbnail ?? "No image"}
                    alt={book.volumeInfo.title}
                    height={108}
                    width={122}
                    className="border-dark-gray"
                  />
                </Link>
              )}
              <div>
                <Link href={`/books/${book.id}`}>
                  <h2 className="text-xl font-semibold">
                    {book.volumeInfo.title}
                  </h2>
                </Link>
                {book.volumeInfo.authors && (
                  <p className="text-main-orange">
                    {book.volumeInfo.authors.join(", ")}
                  </p>
                )}
                {book.volumeInfo.pageCount && (
                  <p className="text-dark-gray">
                    {book.volumeInfo.pageCount} pages
                  </p>
                )}

                <div className="py-4">
                  <SaveBook id={book.id} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={startIndex === 0}
          className="hover:bg-brown bg-dark-gray rounded-md px-4 py-2 text-white disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="hover:bg-brown bg-dark-gray rounded-md px-4 py-2 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
