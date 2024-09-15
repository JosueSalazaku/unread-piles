"use client"
import { useState } from 'react';
import { SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { signOut } = useAuth();

  return (
    <nav className="flex h-20 w-full items-center justify-between bg-primary px-14">
      <Link href="/" className="font-didot text-2xl font-bold text-main">
        Keanino
      </Link>
      <button onClick={toggle} className="md:hidden">
        {isOpen ? 'Close' : 'Menu'}
      </button>
      <div className="hidden md:flex flex-row items-center text-white space-x-6">
        <SignedIn>
          <Link href="/people">People</Link>
          <Link href="/places">Places</Link>
          <Link href="/pages">Pages</Link>
          <UserButton />
          <button onClick={() => signOut()}>Sign Out</button>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in"><button>Sign In</button></Link>
          <Link href="/sign-up"><button>Sign Up</button></Link>
        </SignedOut>
      </div>

      {/* Small screen */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 z-50 bg-orange-400 p-5 flex flex-col text-6xl space-y-10 text-main md:hidden">
          <SignedIn>
            <Link href="/people">People</Link>
            <Link href="/places">Places</Link>
            <Link href="/pages">Pages</Link>
            <UserButton />
            <button onClick={() => signOut()}>Sign Out</button>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in"><button>Sign In</button></Link>
            <Link href="/sign-up"><button>Sign Up</button></Link>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}