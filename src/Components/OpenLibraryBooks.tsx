/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image'; // Assuming you're using Next.js

export default function OpenLibraryBooks() {
    const URL = 'https://openlibrary.org/search.json?author=bell+hooks';
    
    const [books, setBooks] = useState<{
        cover_i?: number;
        title: string;
        key: string;
        description?: string | { value: string };
    }[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    async function fetchBooks() {
        try {
            const response = await axios.get(URL);
            const data = response.data;
            setBooks(data.docs);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching books:", error);
            setError(error);
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Books by Bell Hooks</h1>
            {loading ? (
                <p>Loading books...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <ul>
                    {books.map((book) => (
                        <li key={book.key}>
                            <h2>{book.title}</h2>
                            {book.cover_i && (
                                <Image
                                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                    alt={book.title}
                                    width={128}
                                    height={200}
                                />
                            )}
                            {/* Handle description as string or object */}
                            {book.description && (
                                <p>{typeof book.description === 'string' ? book.description : book.description?.value}</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
