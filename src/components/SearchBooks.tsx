"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBooks() {
  const [search, setSearch] = useState(""); 
  const router = useRouter(); 

  function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && search.trim() !== "") {
      router.push(`/search?s=${encodeURIComponent(search)}`); // Navigate to the search page with query
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your book here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
        className="bg-transparent text-black dark:text-white h-10 w-72 rounded-md border-2 px-3 py-2 placeholder:text-dark-brown focus:active:*: border-dark-brown"
      />
    </div>
  );
}