"use client";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import SearchBooks from "@/components/SearchBooks";
import { useCustomSession } from "./SessionProvider";
import ModdeToggle from "./ModdeToggle";
import { PictureDropDown } from "./PictureDropDown";
import { signOut } from "@/app/lib/auth-client";

export function Nav() {
  const session = useCustomSession();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <nav className="flex h-16 w-full items-center justify-between border-b-2 border-dark-brown px-4 sm:px-6">
      {/* Logo */}
      <Link
        href="/"
        className="text-main text-main text-xl font-bold sm:text-2xl"
      >
        <p className="text-sm font-bold">UNREAD <br /> PILES</p>
      </Link>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* SearchBooks component visible on all screen sizes */}
        <SearchBooks />

        {/* Large Screen Nav Items */}
        <div className="hidden items-center space-x-6 md:flex">
          {session.data?.user && (
            <>
              <Link href="/explore" className="hover:underline">
                Explore
              </Link>
              <Link href="/library" className="hover:underline">
                Library
              </Link>
            </>
          )}
          <ModdeToggle />
          {session.data?.user ? (
            <PictureDropDown session={session} toggleDropdown={toggleDropdown} />
          ) : (
            <Link href="/api/auth/sign-in">
              <button className="rounded-md border border-dark-brown px-4 py-2 hover:border-transparent hover:bg-main-orange hover:text-white">
                Login / Sign Up
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="flex items-center space-x-4 md:hidden">
          <ModdeToggle />
          <button
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
            className="focus:outline-none"
          >
            {isOpen ? <MdClose size={24} /> : <GiHamburgerMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 top-16 z-50 flex flex-col space-y-4 bg-main-orange p-4 text-lg shadow-md md:hidden"
        >
          {session.data?.user ? (
            <>
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="rounded py-2 p-4 hover:bg-light-orange dark:hover:bg-orange-950"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="rounded py-2 p-4 hover:bg-light-orange dark:hover:bg-orange-950"
              >
                Settings
              </Link>
              <Link
                href="/explore"
                onClick={() => setIsOpen(false)}
                className="rounded py-2 p-4 hover:bg-light-orange dark:hover:bg-orange-950"
              >
                Explore
              </Link>
              <Link
                href="/library"
                onClick={() => setIsOpen(false)}
                className="rounded py-2 p-4 hover:bg-light-orange dark:hover:bg-orange-950"
              >
                Library
              </Link>
              <button
                onClick={async () => {
                  try {
                    await signOut();
                    window.location.href = "/";
                  } catch (error) {
                    console.error("Failed to sign out:", error);
                  }
                }}
                className="mt-auto rounded py-2 p-4 text-left text-red-500 hover:bg-light-orange dark:hover:bg-orange-950"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/api/auth/sign-in"
              onClick={() => setIsOpen(false)}
              className="rounded py-2 p-4 font-bold hover:bg-background-dark"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
