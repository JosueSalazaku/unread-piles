"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import type { GoogleBook } from "@/types";

export default function GoogleBooks() {
  const APIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes?q=Love&key=${APIKey}`;

  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      if (!APIKey) {
        setError("Google Books API key is missing.");
        return;
      }

      try {
        const response = await axios.get<{ items: GoogleBook[] }>(url);
        console.log(response.data);
        setBooks(response.data.items || []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    }

    void fetchBooks();
  }, [APIKey, url]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">Google Books</h1>
      <ul>
        {books.map((book) => (
          <li
            key={book.id}
            className="mb-8 rounded-md border p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="flex items-start gap-6">
              {book.volumeInfo.imageLinks?.thumbnail && (
                <Image
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  width={128}
                  height={192}
                  className="rounded-md"
                />
              )}
              <div className="flex-1">
                <h2 className="mb-2 text-2xl font-semibold">
                  {book.volumeInfo.title}
                </h2>
                {book.volumeInfo.authors && (
                  <p className="mb-1 text-gray-700">
                    <strong>Authors:</strong>{" "}
                    {book.volumeInfo.authors.join(", ")}
                  </p>
                )}
                {book.volumeInfo.publishedDate && (
                  <p className="mb-4 text-gray-800">
                    <strong>Published:</strong> {book.volumeInfo.publishedDate}
                  </p>
                )}
                <p className="font-thin text-gray-500">
                  {book.volumeInfo.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
