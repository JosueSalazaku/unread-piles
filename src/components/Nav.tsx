"use client"
import { useState } from 'react';
import Link from 'next/link';
import SearchBooks from '@/components/SearchBooks';
import { useCustomSession } from './SessionProvider';
export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <nav className="flex h-20 w-full items-center justify-between  px-6">
      <Link href="/" className="font-didot text-2xl font-bold text-main">
        Unread Piles
      </Link>
      <button onClick={toggle} className="md:hidden">
        {isOpen ? 'Close' : 'Menu'}
      </button>
      <div className="hidden md:flex flex-row justify-between items-center font-semibold space-x-6">
          <SearchBooks />
          <Link href="/explore">Explore</Link>
          <Link href="/library">Library</Link>
          <Link href="/pages">Pages</Link>
          <Link href="/api/auth/sign-in"><button className='font-bold'>Sign In</button></Link>
          <Link href="/api/auth/sign-in"><button className='font-bold'>Sign Up</button></Link>
      </div>

      {/* Small screen */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 z-50 bg-zinc-400 p-5 flex flex-col text-6xl space-y-10 text-main md:hidden">
          <SearchBooks />
            <Link href="/people">Explore</Link>
            <Link href="/places">Library</Link>
            <Link href="/pages">Pages</Link>

            <Link href="/api/auth/sign-in"><button>Sign In</button></Link>
            <Link href="/api/auth/sign-in"><button>Sign Up</button></Link>
        </div>
      )}
    </nav>
  );
}