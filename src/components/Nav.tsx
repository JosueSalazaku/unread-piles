"use client";
import { useState } from "react";
import Link from "next/link";
import SearchBooks from "@/components/SearchBooks";
import { useCustomSession } from "./SessionProvider";
import Image from "next/image";
import { signOut } from "@/app/lib/auth-client";

export function Nav() {
  const session = useCustomSession();
  const handleSignOut = () => signOut();
  
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { name, email, image } = session.data?.user ?? {};

  return (
    <nav className="flex h-20 w-full items-center justify-between px-6">
      <Link href="/" className="font-didot text-main text-2xl font-bold">
        Unread Piles
      </Link>
      <button onClick={toggle} className="md:hidden">
        {isOpen ? "Close" : "Menu"}
      </button>
      <div className="hidden flex-row items-center justify-between space-x-6 font-semibold md:flex">
        <SearchBooks />
        <Link href="/explore">Explore</Link>
        <Link href="/library">Library</Link>
        <Link href="/pages">Pages</Link>
        {session.data?.user ? (
          <div className="flex items-center space-x-4">
            {image && (
              <button onClick={toggle}>
                <Image
                  src={image}
                  alt={name ?? "User"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </button>
            )}
          </div>
        ) : (
          <Link href="/api/auth/sign-in">
            <button className="font-bold">Login / Sign Up</button>
          </Link>
        )}
        {isOpen && (
          <div className="absolute right-5 top-16 z-50 flex w-52 flex-col space-y-10 rounded-lg bg-zinc-400">
            <h1>{name}</h1>
            <Link href="/profile">Profile</Link>
            <Link href="/settings">Settings</Link>
            <button onClick={handleSignOut}>Sign Out</button>

          </div>
        )}
      </div>

      {/* Small screen */}
      {isOpen && (
        <div className="text-main absolute left-0 right-0 top-20 z-50 flex flex-col space-y-10 bg-zinc-400 p-5 text-6xl md:hidden">
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
