"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import type { GoogleBook } from "@/types";
import Link from "next/link";
import FadeLoader from "react-spinners/FadeLoader";

export default function GoogleBooks() {
  const APIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      if (!APIKey) {
        setError("Google Books API key is missing.");
        return;
      }

      const url = `https://www.googleapis.com/books/v1/volumes?q=random&key=${APIKey}`;

      try {
        const response = await axios.get<{ items: GoogleBook[] }>(url);
        setBooks(response.data.items || []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    void fetchBooks();
  }, [APIKey]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
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
            className="mb-8 rounded-md border border-dark-brown p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="flex items-start gap-6">
              {book.volumeInfo.imageLinks?.thumbnail && (
                <Link href={`/books/${book.id}`}>
                  <Image
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    width={128}
                    height={192}
                    className="rounded-md"
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
                    <p className=" text-dark-brown">Pages: {book.volumeInfo.pageCount}</p>
                  </div>
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
    </div>
  );
}
