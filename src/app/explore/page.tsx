"use client";
import React, { useState, useEffect } from "react";
import { fetchBooksByGenre } from "@/app/services/client/genre-service";
import { type GoogleBook } from "@/types";
import Image from "next/image";
import FadeLoader from "react-spinners/FadeLoader";
import Link from "next/link";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { SaveBook } from "@/components/SaveBook";

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
  const [selectedGenre, setSelectedGenre] = useState<string>("fiction");
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
        const { items, totalItems } = await fetchBooksByGenre(selectedGenre, startIndex);
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
  const pageButtons = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div className="w-screen h-screen flex flex-col justify-start gap-4 items-center">
      <h1 className="pt-20 text-2xl font-bold">Explore Books</h1>

      <div>
        <div className="flex flex-wrap gap-4 justify-center">
          {genres.map((genre) => (
            <button
              key={genre.name}
              className={`border gap-3 rounded px-4 py-2 ${
                selectedGenre === genre.string ? "bg-dark-brown border-main text-white" : ""
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
        <div className="gap-4 mt-8">
          <h2 className="text-xl px-4 py-4 text-center">Books in {selectedGenre} Genre:</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {genreBooks.map((book, index) => (
              <li key={index} className="p-4">
                <div className="flex flex-col items-center gap-5 px-4">
                  <Link href={`/books/${book.id}`}>
                    <Image
                      src={book.volumeInfo.imageLinks?.thumbnail ?? "/path/to/default-image.jpg"}
                      alt={book.volumeInfo.title ?? ""}
                      width={150} 
                      height={225} 
                      className="rounded-md object-cover"
                    />
                  </Link>
                  <div className="text-center">
                    <Link href={`/books/${book.id}`}>
                      <h1 className="font-bold text-lg mb-3 sm:text-xl">{book.volumeInfo.title}</h1>
                    </Link>
                    {/* <p className="text-main-orange text-sm sm:text-base">{book.volumeInfo.authors}</p>
                    <p className="text-dark-brown font-medium text-sm sm:text-base mb-4">Pages: {book.volumeInfo.pageCount}</p> */}
                    <SaveBook 
                      id={book.id} 
                      // status={""} 
                    />
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
          className="px-4 py-2 border rounded"
        >
          <GrPrevious />
        </button>

        {pageButtons.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 border rounded ${page === currentPage ? "bg-dark-brown text-white" : ""}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded"
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
}
