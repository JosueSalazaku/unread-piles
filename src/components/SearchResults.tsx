"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import type { GoogleBook } from "@/types";
import { fetchBookByInput } from "@/app/services/client/book-service";
import Image from "next/image";
import Link from "next/link";

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
            className="mb-8 rounded-md border border-dark-brown p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="flex items-start gap-6">
              {book.volumeInfo.imageLinks?.thumbnail && (
                <Link href={`/books/${book.id}`}>
                  <Image
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    height={75}
                    width={50}
                    className="h-auto w-32 object-cover"
                  />
                </Link>
              )}
              <div className="flex-1">
                <Link href={`/books/${book.id}`}>
                  <h2 className="mb-2 text-2xl font-semibold">
                    {book.volumeInfo.title}
                  </h2>
                </Link>
                {book.volumeInfo.authors && (
                  <p className="mb-1 text-main-orange">
                    <strong>Authors:</strong>{" "}
                    {book.volumeInfo.authors.join(", ")}
                  </p>
                )}
                {book.volumeInfo.pageCount && (
                  <p className="text-dark-brown">
                    Pages: {book.volumeInfo.pageCount}
                  </p>
                )}
                {book.volumeInfo.publishedDate && (
                  <p className="mb-4 text-dark-brown">
                    <strong>Published:</strong> {book.volumeInfo.publishedDate}
                  </p>
                )}
                <p className="text-sm font-thin">
                  {book.volumeInfo.description}
                </p>
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
          className="hover:bg-brown rounded-md bg-dark-brown px-4 py-2 text-white disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="hover:bg-brown rounded-md bg-dark-brown px-4 py-2 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
