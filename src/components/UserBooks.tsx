"use client";
import React, { useEffect, useState } from "react";
import { fetchUserBooks } from "@/app/services/backend/book-service"; 
import { fetchAllUserBooks } from "@/app/services/client/book-service";
import type { GoogleBook } from "@/types";
import { useCustomSession } from "@/components/SessionProvider";
import Image from "next/image";
import FadeLoader from "react-spinners/FadeLoader";

export default function UserBooks() {

      const session = useCustomSession();
      const [bookData, setBookData] = useState<GoogleBook[]>([]);
      const [error, setError] = useState<string | null>(null);
      const [loading, setLoading] = useState(false)

      useEffect(() => {
        const getUserBookData = async () => {
          try {
            if (session.data?.user) {
              const userId = session.data.user.id;
              const userBooks = await fetchUserBooks(userId);
              setLoading(true);
              
              const books = await Promise.all(
                userBooks.map(async (userBook) => {
                  const book = await fetchAllUserBooks(userBook.bookId);
                  return book as GoogleBook | null;
                })
              );
                
              setLoading(false);
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
    
      if (loading) {
        return (
          <div className="flex justify-center items-center h-screen w-screen">
            <FadeLoader color="#912b12" />
          </div>
        );
      }
    
 return (
    <div className="w-screen  flex ">
     <ul>
      {bookData.map((book, index) => (
        <li key={book.id ?? index} className="flex flex-col items-center mb-4">
        <Image
          src={book.volumeInfo.imageLinks?.thumbnail ?? "/default-thumbnail.jpg"}
          alt={book.volumeInfo.title ?? "No alt"}
          width={128}
          height={192}
          className="drop-shadow-md border-1 border-dark-brown rounded-lg"
        />
        <h2 className="mt-2 text-lg font-semibold">{book.volumeInfo.title}</h2>
        <p className="text-sm text-gray-600">{book.volumeInfo.authors?.join(", ")}</p>
        </li>
      ))}
    </ul>
    </div>
  );
}

