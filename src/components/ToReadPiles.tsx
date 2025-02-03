import React, { useEffect, useState } from "react";
import { type GoogleBook } from "@/types";
import { useCustomSession } from "./SessionProvider";
import { fetchUserBooks } from "@/services/backend/book-service";
import { fetchGoogleBookById } from "@/services/client/book-service";

export default function ToReadPiles() {
  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const session = useCustomSession();
  const userId = session.data?.user?.id;

  useEffect(() => {
      const getUserBookData = async () => {
          try {
              if (userId) {
                  const userBooks = await fetchUserBooks(userId);
                  setLoading(true)

                  const books = await Promise.all(
                      userBooks.map(async (userBook) => {
                          if (userBook.status === "To read") {
                              const book = await fetchGoogleBookById(userBook.bookId)
                              console.log(book, "All books from To read Piles");
                              return book as GoogleBook | null
                          }
                          return null
                      })
                  );
                  setLoading(false);
                  setBooks(books.filter((book): book is GoogleBook => book != null))
              }
          } catch (error) {
            
          }
      };
      void getUserBookData()
  },[userId]);

  return <div>ToReadPiles</div>;
}
