"use client";
import React, { useState, useEffect } from "react";
import { fetchBooksByGenre } from "@/services/client/genre-service";
import { type GoogleBook } from "@/types";
import Image from "next/image";
import FadeLoader from "react-spinners/FadeLoader";
import Link from "next/link";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

const genres = [
  { name: "Fiction", string: "fiction" },
  { name: "Romance", string: "romance" },
  { name: "Science Fiction", string: "science-fiction" },
  { name: "Mystery", string: "mystery" },
  { name: "Thriller", string: "thriller" },
  { name: "History", string: "history" },
  { name: "Horror", string: "horror" },
  { name: "Biography", string: "biography" },
  { name: "Fantasy", string: "fantasy" },
  { name: "Education", string: "education" },
];

export default function ExplorePage() {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [genreBooks, setGenreBooks] = useState<GoogleBook[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const maxResults = 20;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const startIndex = (currentPage - 1) * maxResults;
        const { items, totalItems } = await fetchBooksByGenre(
          selectedGenre,
          startIndex,
        );
        setGenreBooks(items);
        setTotalItems(totalItems);
      } catch {
        setError("Error fetching books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void fetchBooks();
  }, [selectedGenre, currentPage]);

  const handleGenreClick = async (genre: string) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    setLoading(true);
    setError("");

    try {
      const { items, totalItems } = await fetchBooksByGenre(genre, 0);
      setGenreBooks(items);
      setTotalItems(totalItems);
    } catch {
      setError(`Error fetching books for ${genre}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalItems / maxResults);
  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(currentPage + 2, totalPages);
  const pageButtons = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start gap-4">
      <h1 className="pt-10 text-2xl font-bold">Explore Books</h1>
      <div>
        <div className="flex flex-wrap justify-center gap-4">
          {genres.map((genre) => (
            <button
              key={genre.name}
              className={`hover:bg-dark-gray gap-3 rounded border px-4 py-2 ${
                selectedGenre === genre.string
                  ? "border-main bg-main-orange text-white"
                  : ""
              }`}
              onClick={() => handleGenreClick(genre.string)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {loading && <FadeLoader color="#912b12" />}
      {error && <p className="text-red-500">{error}</p>}

      {genreBooks.length > 0 ? (
        <div className="mt-8 gap-4">
          <h2 className="px-4 py-4 text-center text-xl">
            Books in {selectedGenre} Genre:
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {genreBooks.map((book, index) => (
              <li key={index} className="p-4">
                <div className="flex flex-col items-center gap-5 px-4">
                  <Link href={`/books/${book.id}`}>
                    <Image
                      src={
                        book.volumeInfo.imageLinks?.thumbnail ??
                        "/path/to/default-image.jpg"
                      }
                      alt={book.volumeInfo.title ?? ""}
                      width={120}
                      height={225}
                      className="object-cover"
                    />
                  </Link>
                  <div className="text-center">
                    <Link href={`/books/${book.id}`}>
                      <h1 className="mb-2 font-bold ">
                        {book.volumeInfo.title}
                      </h1>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        selectedGenre && <p>No books found for {selectedGenre} genre.</p>
      )}

      <div className="flex justify-center gap-2 pb-10">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded border px-4 py-2"
        >
          <GrPrevious />
        </button>

        {pageButtons.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`rounded border px-4 py-2 ${page === currentPage ? "bg-dark-gray text-white" : ""}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded border px-4 py-2"
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
}
