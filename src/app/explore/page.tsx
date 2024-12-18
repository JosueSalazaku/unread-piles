"use client";
import React, { useState } from "react";
import { fetchBooksByGenre } from "@/app/services/client/genre-service";
import { type GoogleBook } from "@/types";
import Image from "next/image";

const genres = [
  { name: "Fiction", string: "fiction" }, { name: "Romance", string: "romance" },
  { name: "Science Fiction", string: "science-fiction" }, { name: "Mystery", string: "mystery" },
  { name: "Thriller", string: "thriller" }, { name: "History", string: "history" },
  { name: "Horror", string: "horror" }, { name: "Biography", string: "biography" },
  { name: "Young Adult", string: "young+adults" }, { name: "Education", string: "education" }
];

export default function ExplorePage() {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [genreBooks, setGenreBooks] = useState<GoogleBook[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleGenreClick = async (genre: string) => {
    setSelectedGenre(genre);
    setLoading(true);
    setError("");

    try {
      const books = await fetchBooksByGenre(genre);
      setGenreBooks(books);
    } catch (error) {
      setError(`Error fetching books for ${genre}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-start gap-4 items-center">
      <h1 className="pt-20 text-2xl font-bold">Explore Books</h1>
      
      <div>
        <h1>Book Genres</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {genres.map((genre) => (
            <button
              key={genre.name}
              className="border gap-3 rounded px-4 py-2"
              onClick={() => handleGenreClick(genre.string)} 
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {genreBooks.length > 0 ? (
        <div className="gap-4 mt-4">
          <h2 className="text-xl">Books in {selectedGenre} Genre:</h2>
          <ul className="space-y-4"> 
            {genreBooks.map((book: GoogleBook, index: number) => (
              <li key={index} className="p-4 "> 
                <div className="flex gap-3">
                  <Image
                    src={book?.volumeInfo?.imageLinks?.thumbnail ?? "/path/to/fallback-image.jpg"}
                    alt={book.volumeInfo.title}
                    width={100}
                    height={150}
                  />
                  <div>
                  <h1 className="font-bold text-xl">{book.volumeInfo.title}</h1>
                  <p className="text-lg text-main-orange">{book.volumeInfo.authors}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        selectedGenre && <p>No books found for {selectedGenre} genre.</p>
      )}
    </div>
  );
}
