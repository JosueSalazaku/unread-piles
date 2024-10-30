"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

interface Book {
  cover_i?: number;
  title: string;
  key: string;
  author_name?: string[];
  first_publish_year?: number;
}

export default function OpenLibraryBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get<{ docs: Book[] }>(
          'https://openlibrary.org/search.json?author=bell+hooks'
        );
        setBooks(response.data.docs);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    }

    fetchBooks();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Books by Bell Hooks</h1>
      
      <div className="flex flex-col gap-6 items-center">
        {books.map((book) => (
          <div 
            key={book.key} 
            className="flex flex-col w-full sm:w-[600px] md:w-[800px] lg:w-[900px] xl:w-[1000px] p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              {book.cover_i && (
                <Image 
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  width={48}
                  height={48}
                  className="rounded-md"
                />
              )}
              <h3 className="text-lg text-primary font-semibold">{book.title}</h3>
            </div>
            
            <Link href={`/books/${book.key}`} className="flex-1 flex flex-col cursor-pointer">
              <p className="text-gray-700">
                {book.author_name?.join(', ')} 
                {book.first_publish_year && ` - First published: ${book.first_publish_year}`}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
