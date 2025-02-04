"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuSearch } from "react-icons/lu";

export default function SearchBooks() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && search.trim() !== "") {
      router.push(`/search?s=${encodeURIComponent(search)}`); // Navigate to the search page with query
    }
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Enter your book here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
        className="placeholder:text-dark-gray focus:active:*: border-dark-gray h-10 w-64 rounded-md border-2 bg-transparent px-2 py-2 pr-10 text-black dark:text-white md:w-72 lg:w-72"
      />
      <button
        onClick={() => router.push(`/search?s=${encodeURIComponent(search)}`)}
        className="dark:text-dark-gray dark:bg-light-brown absolute right-0 top-0 h-full rounded-r-md px-4 text-lg text-black"
      >
        <LuSearch size={24} />
      </button>
    </div>
  );
}
