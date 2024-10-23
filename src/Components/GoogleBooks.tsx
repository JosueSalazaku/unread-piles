"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { GoogleBook } from '@/types';

export default function GoogleBooks() {
  const APIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      if (!APIKey) {
        setError("Google Books API key is missing.");
        return;
      }

      const url = `https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=${APIKey}`;

      try {
        const response = await axios.get<{ items: GoogleBook[] }>(url); // Define the response type
        console.log(response.data); // Log the API data
        setBooks(response.data.items || []); // Update state with books
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    }

    fetchBooks();
  }, [APIKey]);

  if (error) {
    return <div>Error: {error}</div>;
  }

return (
    <div>
        <h1>Google Books</h1>
        <ul>
            {books.map((book) => (
                <li key={book.id}>
                    <h2>{book.volumeInfo.title}</h2>
                    {book.volumeInfo.authors && (
                        <p>Authors: {book.volumeInfo.authors.join(', ')}</p>
                    )}
                    {book.volumeInfo.publishedDate && (
                        <p>Published: {book.volumeInfo.publishedDate}</p>
                    )}
                    {book.volumeInfo.imageLinks?.thumbnail && (
                        <Image src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} width={128} height={192} />
                    )}
                </li>
            ))}
        </ul>
    </div>
);
}
