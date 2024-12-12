"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import type { GoogleBook } from '@/types';
import Link from 'next/link';

export default function GoogleBooks() {
    const APIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=Love&key=${APIKey}`
    
    const [books, setBooks] = useState<GoogleBook[]>([]);
    const [error, setError] = useState<string | null>(null);
    
  useEffect(() => {
    async function fetchBooks() {
      if (!APIKey) {
        setError("Google Books API key is missing.");
        return;
      };

      try {
        const response = await axios.get<{ items: GoogleBook[] }>(url); 
        setBooks(response.data.items || []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    }

    void fetchBooks();
  }, [APIKey, url]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ul>
      
        {books.map((book) => (
          <li key={book.id} className="border border-dark-brown rounded-md mb-8 shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
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
                  <h2 className="text-2xl font-semibold mb-2">{book.volumeInfo.title}</h2>
              </Link>
                {book.volumeInfo.authors && (
                  <p className="text-main-orange mb-1">
                    <strong>Authors:</strong> {book.volumeInfo.authors.join(', ')}
                  </p>
                )}
                {book.volumeInfo.publishedDate && (
                  <p className="text-dark-brown mb-4">
                    <strong>Published:</strong> {book.volumeInfo.publishedDate}
                  </p>
                )}
                <p className="font-thin text-sm">{book.volumeInfo.description}</p>
              </div>
              </div>
          </li>
        ))}

      </ul>
    </div>
  );
  
}