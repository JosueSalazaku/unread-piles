"use client";
import { useState } from "react";
import Link from "next/link";
import SearchBooks from "@/components/SearchBooks";
import { useCustomSession } from "./SessionProvider";
import Image from "next/image";

export function Nav() {
  const session = useCustomSession();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { name, email, image } = session.data?.user ?? {};

  function checkUserSignIn() {
    if (session.data?.user) {
      return (
        <div className="flex items-center space-x-4">
          {image && <Image src={image} alt={name ?? "User"} width={40} height={40} className="rounded-full" />}
        </div>
      );
    } else {
      return (
        <Link href="/api/auth/sign-in">
          <button className="font-bold">Login / Sign Up</button>
        </Link>
      );
    }
  }

  return (
    <nav className="flex h-20 w-full items-center justify-between px-6">
      <Link href="/" className="font-didot text-2xl font-bold text-main">
        Unread Piles
      </Link>
      <button onClick={toggle} className="md:hidden">
        {isOpen ? "Close" : "Menu"}
      </button>
      <div className="hidden md:flex flex-row justify-between items-center font-semibold space-x-6">
        <SearchBooks />
        <Link href="/explore">Explore</Link>
        <Link href="/library">Library</Link>
        <Link href="/pages">Pages</Link>
        {checkUserSignIn()}
      </div>

      {/* Small screen */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 z-50 bg-zinc-400 p-5 flex flex-col text-6xl space-y-10 text-main md:hidden">
          <SearchBooks />
          <Link href="/people">Explore</Link>
          <Link href="/places">Library</Link>
          <Link href="/pages">Pages</Link>
          <Link href="/api/auth/sign-in">
            <button>Sign In</button>
          </Link>
          <Link href="/api/auth/sign-in">
            <button>Sign Up</button>
          </Link>
        </div>
      )}
    </nav>
  );
}
