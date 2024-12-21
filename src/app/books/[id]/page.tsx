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

  const booksCover = book?.volumeInfo.imageLinks?.thumbnail;
  const bookTitle = book?.volumeInfo.title;
  const bookAuthor = book?.volumeInfo.authors;
  const publishedDate = book?.volumeInfo.publishedDate;
  const pageCount = book?.volumeInfo.pageCount
  const bookDescription = book?.volumeInfo.description;
  
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
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <FadeLoader color="#912b12" />
      </div>
    );
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
          <div className="flex flex-col justify-center px-14 lg:px-28 gap-4">
            <div className="gap-4 flex">
            <Image
              src={
                booksCover ??
                "/default-thumbnail.jpg"
              }
              alt={book?.volumeInfo?.title || "Book thumbnail"}
              width={250}
              height={192}
              className="justify-center items-center shadow-2xl rounded-lg"
              />
              <div>
              <h1 className="text-3xl font-bold ">{bookTitle}</h1>
              <p className=" text-xl font-bold text-main-orange">
              {bookAuthor?.join(", ") ??
                "Author information not available."}
            </p>
              </div>

            </div>
            <div className="py-6">
              <p className="font-medium text-xl">Pages: {pageCount}</p>
            <p className=" font-medium text-xl">
             Published: {publishedDate ??
                "Publication date not available"}
            </p>
            </div>
            <div className=" py-4 border-t-1 border-main-orange">
            <p className="">
              {bookDescription?? "Description not available"}
            </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
