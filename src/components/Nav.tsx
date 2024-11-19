"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SearchBooks from "@/components/SearchBooks";
import { useCustomSession } from "./SessionProvider";
import Image from "next/image";
import { signOut } from "@/app/lib/auth-client";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import ModdeToggle from "./ModdeToggle";

export function Nav() {
  const session = useCustomSession();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const { name, email, image } = session.data?.user ?? {};

  return (
    <nav className="flex h-16 w-full items-center justify-between border-b-2 border-dark-brown px-4 sm:px-6">
      {/* Logo */}
      <Link href="/" className="text-main text-xl sm:text-2xl">
        UNREAD PILES
      </Link>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Large screen: ModdeToggle and Nav Items */}
        <div className="hidden items-center space-x-6 md:flex">
          {/* <SearchBooks /> */}
          <Link href="/explore">Explore</Link>
          <Link href="/library">Library</Link>
          <ModdeToggle />
          {session.data?.user ? (
            <button ref={buttonRef} onClick={toggle} className="relative">
              {image && (
                <Image
                  src={image}
                  alt={name ?? "User"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
            </button>
          ) : (
            <Link href="/api/auth/sign-in">
              <button className="font-bold border-2 rounded-lg p-2 border-dark-brown">Login / Sign Up</button>
            </Link>
          )}
        </div>

        {/* Small screen: Hamburger menu */}
        <div className="flex items-center space-x-4 md:hidden">
          <ModdeToggle />
          <button
            onClick={toggle}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <MdClose size={30} /> : <GiHamburgerMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && session.data?.user && (
        <div
          ref={dropdownRef}
          className="border-gray-200 bg-white absolute right-5 top-16 z-50 w-56 rounded-lg border shadow-lg"
        >
          <div className="border-gray-300 border-b p-4 text-center">
            <h1 className="text-gray-800 text-lg font-semibold">
              {name ?? "User"}
            </h1>
            <p className="text-gray-500 text-sm">
              {email ?? "No email available"}
            </p>
          </div>
          <div className="flex flex-col py-2">
            <Link
              href="/profile"
              className="text-gray-700 hover:bg-gray-100 block px-4 py-2"
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="text-gray-700 hover:bg-gray-100 block px-4 py-2"
            >
              Settings
            </Link>
            <button
              onClick={async () => {
                try {
                  await signOut();
                  window.location.href = "/"; // Redirect
                } catch (error) {
                  console.error("Failed to sign out:", error);
                }
              }}
              className="text-red-500 hover:bg-gray-100 block w-full px-4 py-2 text-left font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Small screen: Dropdown Menu */}
      {isOpen && (
        <div
          className="bg-zinc-400 absolute left-0 right-0 top-16 z-50 flex flex-col space-y-4 p-4 text-lg md:hidden"
        >
          {session.data?.user ? (
            <>
              <div className="border-gray-300 flex items-center border-b pb-4">
                {image && (
                  <Image
                    src={image}
                    alt={name ?? "User"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div className="ml-2">
                  <h1 className="text-sm font-semibold">{name ?? "User"}</h1>
                  <p className="text-gray-500 text-xs">
                    {email ?? "No email available"}
                  </p>
                </div>
              </div>
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="hover:bg-gray-100 rounded py-2"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="hover:bg-gray-100 rounded py-2"
              >
                Settings
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
                className="text-red-500 hover:bg-gray-100 rounded py-2 font-semibold"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/api/auth/sign-in"
              onClick={() => setIsOpen(false)}
              className="hover:bg-gray-100 rounded py-2 font-bold"
            >
              Login / Sign Up
            </Link>
          )}
          <Link
            href="/explore"
            onClick={() => setIsOpen(false)}
            className="hover:bg-gray-100 rounded py-2"
          >
            Explore
          </Link>
          <Link
            href="/library"
            onClick={() => setIsOpen(false)}
            className="hover:bg-gray-100 rounded py-2"
          >
            Library
          </Link>
          <Link
            href="/pages"
            onClick={() => setIsOpen(false)}
            className="hover:bg-gray-100 rounded py-2"
          >
            Pages
          </Link>
        </div>
      )}
    </nav>
  );
}
