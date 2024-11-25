"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import type { GoogleBook } from "@/types";
import Image from "next/image";

export default function SearchPage() {
  const APIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  const searchParams = useSearchParams();
  const query = searchParams.get("s");

  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0); // Start position in the API
  const maxResults = 10; // Maximum number of results per request

  useEffect(() => {
    async function fetchBooks() {
      if (!query) return;
      setLoading(true);
      setError(null);

      const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${APIKey}&startIndex=${startIndex}&maxResults=${maxResults}`;

      try {
        const response = await axios.get<{ items: GoogleBook[] }>(url);
        setBooks(response.data.items || []);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    void fetchBooks();
  }, [query, startIndex, APIKey]);

  const handleNextPage = () => {
    setStartIndex((prevIndex) => prevIndex + maxResults);
  };

  const handlePreviousPage = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - maxResults, 0));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Search Results for &quot;{query}&quot;</h1>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <ul>
        {books.map((book) => (
          <li
            key={book.id}
            className="border rounded-md mb-8 shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start gap-6">
              {book.volumeInfo.imageLinks?.thumbnail && (
                <Image
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  height={75}
                  width={50}
                  className="w-32 h-auto object-cover"
                />
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">{book.volumeInfo.title}</h2>
                {book.volumeInfo.authors && (
                  <p className="text-gray-700 mb-1">
                    <strong>Authors:</strong> {book.volumeInfo.authors.join(", ")}
                  </p>
                )}
                {book.volumeInfo.publishedDate && (
                  <p className="text-gray-800 mb-4">
                    <strong>Published:</strong> {book.volumeInfo.publishedDate}
                  </p>
                )}
                <p className="text-gray-500 font-thin">{book.volumeInfo.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={startIndex === 0}
          className="rounded-md bg-dark-brown text-white px-4 py-2 hover:bg-brown disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="rounded-md bg-dark-brown text-white px-4 py-2 hover:bg-brown"
        >
          Next
        </button>
      </div>
    </div>
  );
}
