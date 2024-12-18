"use client";
import React, { useState, } from "react";
import { fetchBooksByGenre } from "@/app/services/client/genre-service"; // assuming this is correct
import { Book, GoogleBook } from "@/types";

const genres = [
  "fiction", "romance", "science-fiction", "mystery", "thriller",
  "history", "horror", "biography", "young-adult", "education"
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
        <div className="flex gap-4">
          {genres.map((genre) => (
            <button
              key={genre}
              className="border gap-3 rounded px-4 "
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {genreBooks.length > 0 ? (
        <div>
          <h2 className="mt-4 text-xl">Books in {selectedGenre} Genre:</h2>
          <ul>
            {genreBooks.map((book: GoogleBook, index: number) => (
              <li key={index}>{book.volumeInfo.title}</li> // Assuming 'volumeInfo.title' exists
            ))}
          </ul>
        </div>
      ) : (
        selectedGenre && <p>No books found for {selectedGenre} genre.</p>
      )}
    </div>
  );
}
