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
          <div className="flex flex-col justify-center gap-4 px-8 lg:px-40">
            {/* Book Info Section */}
            <div className="flex gap-4 lg:items-start lg:gap-8">
              {/* Responsive Book Image */}
              <Image
                src={booksCover ?? "/default-thumbnail.jpg"}
                alt={book?.volumeInfo?.title || "Book thumbnail"}
                width={170}
                height={192}
                className="border-dark-gray h-[192px] w-[130px] items-center justify-center border-1 drop-shadow-md xs:h-[250] xs:w-[170] sm:h-[255px] sm:w-[180px] md:h-[295px] md:w-[200px] lg:h-[310px] lg:w-[210px] xl:h-[440px] xl:w-[300px] 2xl:h-[450px] 2xl:w-[350px]"
              />
              <div className="flex flex-col gap-1 lg:gap-2">
                <h1 className="text-2xl font-bold lg:text-3xl xl:text-4xl">
                  {bookTitle}
                </h1>
                <p className="text-l font-bold text-main-orange lg:text-xl xl:text-2xl">
                  {bookAuthor?.join(", ") ??
                    "Author information not available."}
                </p>

                <p className="text-l font-medium lg:text-lg xl:text-xl">
                  {pageCount} pages
                </p>
                <p className="lg:text-lg xl:text-xl">
                  Published: {publishedDate ?? "Publication date not available"}
                </p>
                <div className="py-4 lg:py-6">
                  <SaveBook id={book.id} />
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div className="border-dark-gray flex flex-wrap gap-2 border-t-1 py-3 lg:py-5">
              {categories?.map((category) => (
                <span
                  key={category}
                  className="border border-main-orange px-2 py-1 text-sm lg:px-4 lg:py-2 lg:text-lg xl:px-5 xl:py-3 xl:text-xl"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Description Section */}
            <div className="border-dark-gray border-t-1 py-4 lg:py-6">
              <p className="text-sm lg:text-lg xl:text-xl">
                {bookDescription ?? "Description not available"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
