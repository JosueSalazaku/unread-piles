"use client";
import Image from "next/image";
import Link from "next/link";
import FadeLoader from "react-spinners/FadeLoader";
import { SaveBook } from "./SaveBook";
import { useFetchGeneralBooks } from "@/app/util/hooks/useFetchGeneralBooks";

export default function GeneralBooks() {
  const { data: books, error, isLoading } = useFetchGeneralBooks();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <FadeLoader color="#912b12" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <ul>
        {(books ?? []).map((book) => (
          <li
            key={book.id}
            className="mb-8 border-b border-dark-gray p-6 transition-shadow duration-300"
          >
            <div className="flex items-start gap-6">
              {book.volumeInfo.imageLinks?.thumbnail && (
                <Link href={`/books/${book.id}`}>
                  <Image
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title ?? ""}
                    width={128}
                    height={192}
                    className="border-1 border-dark-gray"
                  />
                </Link>
              )}
              <div className="flex-1">
                <Link href={`/books/${book.id}`}>
                  <h2 className="font-semibold md:text-xl">
                    {book.volumeInfo.title}
                  </h2>
                </Link>
                <p className="mb-1 text-main-orange">
                  {book?.volumeInfo?.authors?.join(", ") ?? "Unknown Author"}
                </p>
                <p className="">{book.volumeInfo.pageCount} pages</p>
                <div className="py-4">
                  <SaveBook id={book.id} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
