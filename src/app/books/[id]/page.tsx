"use client";
import React, { useEffect, useState } from "react";
import type { GoogleBook } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";


export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [book, setBook] = useState<GoogleBook | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = React.use(params);

  useEffect(() => {

    if (!id) {
      setError("No books found");
      router.push("/");
      return;
    }

    async function ShowBook() {
      try {
        const response = await axios.get<GoogleBook>(
          `https://www.googleapis.com/books/v1/volumes/${id}`,
        );
        setBook(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            `Failed to fetch post: ${error.response?.status} - ${error.message}`,
          );
        } else {
          setError("Failed to fetch post: An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    }
    void ShowBook();
  }, [id, params, router]);

  if (loading) {
    return <div><FadeLoader color="#912b12" /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>No post found.</div>;
  }

  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <div key={book?.id} className="pt-20 w-screen flex flex-col justify-center items-center">
        {book?.volumeInfo && (
          <div className="flex flex-col justify-center items-center gap-4">
            <Image
              src={
                book?.volumeInfo?.imageLinks?.thumbnail ??
                "/default-thumbnail.jpg"
              }
              alt={book?.volumeInfo?.title || "Book thumbnail"}
              width={150}
              height={192}
              className="justify-center items-center"
            />

            <h1 className="text-center text-2xl font-bold ">{book.volumeInfo.title}</h1>
            <p className="text-center text-main-orange">
              {book.volumeInfo.authors?.join(", ") ??
                "Author information not available."}
            </p>
            <p className="text-center">
              {book.volumeInfo.publishedDate ??
                "Publication date not available"}
            </p>
            <p className="text-center">
              {book.volumeInfo.description ?? "Description not available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
