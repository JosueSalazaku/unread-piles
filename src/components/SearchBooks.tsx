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
        className="bg-transparent text-black dark:text-white h-10 w-72 rounded-md border-2 px-3 py-2 placeholder:text-dark-brown focus:active:*: border-dark-brown pr-10"
      />
      <button 
        onClick={() => router.push(`/search?s=${encodeURIComponent(search)}`)}
        className="absolute right-0 top-0 h-full px-4 text-black dark:text-dark-brown dark:bg-light-brown rounded-r-md text-lg"
      >
       <LuSearch size={24} />
      </button>
    </div>
  );
}
