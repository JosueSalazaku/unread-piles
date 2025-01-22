"use client";
import React, { useEffect, useState } from "react";
import { fetchUserBooks } from "@/app/services/backend/book-service"; 
import { fetchAllUserBooks } from "@/app/services/client/book-service";
import type { GoogleBook } from "@/types";
import { useCustomSession } from "@/components/SessionProvider";
import Image from "next/image";

export default function UserBooks() {

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
                  return book as GoogleBook | null;
                })
              );
    
              setBookData(books.filter((book): book is GoogleBook => book !== null))
            }
          } catch (error) {
            if (error instanceof Error) {
              console.error("Error fetching book data:", error.message);
            } else {
              console.error("Unknown error:", error);
            }
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
          <h2>{book.volumeInfo.title}</h2>
          <p>{book.volumeInfo.authors?.join(", ")}</p>
          <p>{book.volumeInfo.description}</p>

          <Image
            src={book.volumeInfo.imageLinks?.thumbnail ?? "/default-thumbnail.jpg"}
            alt={book.volumeInfo.title ?? "No alt"}
            width={128}
            height={192}
          />
        </div>
      ))}
    </div>
  );
}

