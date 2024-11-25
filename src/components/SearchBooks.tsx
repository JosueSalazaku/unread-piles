"use client";
import { useState } from "react";
import axios from "axios";

export default function SearchBooks() {
  const APIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  const [search, setSearch] = useState("");
  const url = `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${APIKey}`;

  async function searchBook(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(url);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your book here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={searchBook}
        className="bg-transparent text-black dark:text-white h-10 w-72 rounded-md border-2 px-3 py-2 placeholder:text-dark-brown focus:active:*: border-dark-brown"
      />
    </div>
  );
}
