"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import type { GoogleBook } from "@/types";
import Image from "next/image";

export default function SearchPage() {
  const APIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      if (!search) return;

      try {
        const response = await axios.get<{ items: GoogleBook[] }>(
          `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${APIKey}`
        );
        setBooks(response.data.items ?? []);
      } catch {
        setError("Failed to fetch books.");
      }
    }

    void fetchBooks();
  }, [search, APIKey]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Search Results for &quot;{search}&quot;</h1>
      {books.length === 0 && <p>No results found for &quot;{search}&quot;.</p>}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {books.map((book) => (
          <li key={book.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{book.volumeInfo.title}</h2>
            {book.volumeInfo.authors && (
              <p className="text-sm">Authors: {book.volumeInfo.authors.join(", ")}</p>
            )}
            {book.volumeInfo.imageLinks?.thumbnail && (
              <Image
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                height={74}
                width={50}
                className="mt-2"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
