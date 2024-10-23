"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { GoogleBook } from '@/types';

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
        console.log(response.data);
        setBooks(response.data.items || []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    }

    fetchBooks();
  }, [APIKey, url]);

  if (error) {
    return <div>Error: {error}</div>;
  }

 return (
  <div className='p-4'>
    <h1>Google Books</h1>
    <ul>
      {books.map((book) => (
        <li key={book.id} className="border rounded-md gap-3 mb-4 p-6">
          <div className="flex items-start">
            {book.volumeInfo.imageLinks?.thumbnail && (
              <Image
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                width={110}
                height={110}
              />
            )}
            <div>
              <h2 className="text-xl font-semibold">{book.volumeInfo.title}</h2>
              {book.volumeInfo.authors && (
                <p>Authors: {book.volumeInfo.authors.join(', ')}</p>
              )}
              {book.volumeInfo.publishedDate && (
                <p>Published: {book.volumeInfo.publishedDate}</p>
              )}
               <p>{book.volumeInfo.description}</p>
            </div>
           </div>
         </li>
       ))}
      </ul>
   </div>
  );
}
