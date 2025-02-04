"use client";
import React, { useEffect, useState } from "react";
import type { GoogleBook } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import { SaveBook } from "@/components/SaveBook";

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
  const bookCategory = book?.volumeInfo.categories;
  const pageCount = book?.volumeInfo.pageCount;
  const bookDescription = book?.volumeInfo.description;

  const categories: string[] =
    bookCategory?.flatMap((cat: string) =>
      cat.split("/").map((c) => c.trim()),
    ) ?? [];
  console.log(categories);

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
        console.log(response.data);

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
      <div className="flex h-screen w-screen items-center justify-center">
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
    <div className="flex w-screen flex-col items-center justify-center">
      <div
        key={book?.id}
        className="flex w-screen flex-col items-center justify-center pt-10"
      >
        {book?.volumeInfo && (
          <div className="flex flex-col justify-center gap-4 px-8 lg:px-28">
            <div className="flex gap-4">
              <Image
                src={booksCover ?? "/default-thumbnail.jpg"}
                alt={book?.volumeInfo?.title || "Book thumbnail"}
                width={170}
                height={192}
                className="border-dark-gray items-center justify-center border-1 drop-shadow-md"
              />
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">{bookTitle}</h1>
                <p className="text-l font-bold text-main-orange">
                  {bookAuthor?.join(", ") ??
                    "Author information not available."}
                </p>

                <p className="text-l font-medium">{pageCount} pages </p>
                <p>
                  published: {publishedDate ?? "Publication date not available"}
                </p>

                <SaveBook id={book.id} />
              </div>
            </div>
            <div className="flex gap-2 border-t-1 border-dark-gray py-3">
              {categories?.map((category) => (
                <span
                  key={category}
                  className="border border-main-orange px-2 py-1 text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
            <div className="border-t-1 border-dark-gray py-4">
              <p className="">
                {bookDescription ?? "Description not available"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
