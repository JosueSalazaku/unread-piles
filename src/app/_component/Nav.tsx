"use client"
import { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
// import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import SearchBooks from '@/Components/SearchBooks';

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // const { signOut } = useAuth();

  return (
    <nav className="flex h-20 w-full items-center justify-between  px-14">
      <Link href="/home" className="font-didot text-2xl font-bold text-main">
        Unread Piles
      </Link>
      <button onClick={toggle} className="md:hidden">
        {isOpen ? 'Close' : 'Menu'}
      </button>
      <div className="hidden md:flex flex-row justify-between items-center text-black space-x-6">
        <SignedIn>
          <SearchBooks />
          {/* <Input className='w-[425px]'/> */}
          <Link href="/people">Explore</Link>
          <Link href="/places">Library</Link>
          <Link href="/pages">Pages</Link>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in"><Button className='font-bold'>Sign In</Button></Link>
          <Link href="/sign-up"><Button className='font-bold'>Sign Up</Button></Link>
        </SignedOut>
      </div>

      {/* Small screen */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 z-50 bg-orange-400 p-5 flex flex-col text-6xl space-y-10 text-main md:hidden">
          <SignedIn>
          <SearchBooks />
            <Link href="/people">Explore</Link>
            <Link href="/places">Library</Link>
            <Link href="/pages">Pages</Link>
            <UserButton />
            {/* <button onClick={() => signOut()}>Sign Out</button> */}
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