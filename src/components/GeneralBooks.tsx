"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeLoader from "react-spinners/FadeLoader";
import type { GoogleBook } from "@/types";
import { fetchGeneralBook } from "@/app/services/book-service";

export default function GeneralBooks() {
    const [books, setBooks] = useState<GoogleBook[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBooks() {
            setLoading(true); 
            try {
                const fetchedBooks = await fetchGeneralBook();
                setBooks(fetchedBooks);
            } catch {
                setError("Failed to fetch books.");
            } finally {
                setLoading(false); 
            }
        }

       void loadBooks();
    }, []);

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
                                        <p className="text-dark-brown">
                                            Pages: {book.volumeInfo.pageCount}
                                        </p>
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
