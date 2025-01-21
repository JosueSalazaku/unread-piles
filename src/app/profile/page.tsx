"use client";
import React, { useEffect, useState } from "react";
import { fetchUserBooks } from "../services/backend/book-service";
import { fetchAllUserBooks } from "../services/client/book-service";
import type { GoogleBook } from "@/types";
import { useCustomSession } from "@/components/SessionProvider";
import Image from "next/image";

export default function Profile() {
  const session = useCustomSession();
  const [bookData, setBookData] = useState<GoogleBook[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserBookData = async () => {
      try {
        if (session.data?.user) {
          const userId = session.data.user.id;
          const userBooks = await fetchUserBooks(userId);

          const books = await Promise.all(
            userBooks.map(async (userBook) => {
              const book = await fetchAllUserBooks(userBook.bookId);
              return book;
            })
          );

          const filteredBooks = books.filter(
            (book): book is GoogleBook => book !== null && book !== undefined
          );

          setBookData(filteredBooks);
        }
      } catch (error) {
        console.error(error);
        setError("Could not fetch book data");
      }
    };

    void getUserBookData();
  }, [session]);

  if (!session.data?.user) {
    return <div>You are not logged in. Please sign in to view your information.</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {bookData.map((book, index) => (
        <div key={book.id ?? index}> 
          <h2>{book.title ?? "No title available"}</h2>
          <Image
            src={book.imageLinks?.thumbnail ?? "/default-thumbnail.jpg"}  
            alt={book.title ?? "No alt"}  
            width={128}
            height={192}
          />
        </div>
      ))}
    </div>
  );
}