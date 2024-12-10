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
      <Link
        href="/"
        className="text-main text-main text-xl font-bold sm:text-2xl"
      >
        UP
      </Link>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* SearchBooks component visible on all screen sizes */}
        <SearchBooks />

        {/* Large Screen Nav Items */}
        <div className="hidden items-center space-x-6 md:flex">
          {/* Conditional rendering for logged-in users */}
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
            <button
              ref={buttonRef}
              onClick={toggle}
              className="relative focus:outline-none"
            >
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
            onClick={toggle}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
            className="focus:outline-none"
          >
            {isOpen ? <MdClose size={30} /> : <GiHamburgerMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Dropdown Menu (Large Screen) */}
      {isOpen && session.data?.user && (
        <div
          ref={dropdownRef}
          className="absolute right-5 top-16 z-50 w-56 rounded-md border border-gray-200 bg-white shadow-lg"
        >
          <div className="border-b border-gray-300 p-4 text-center">
            <h1 className="text-lg font-semibold text-gray-800">
              {name ?? "User"}
            </h1>
            <p className="text-sm text-gray-500">
              {email ?? "No email available"}
            </p>
          </div>
          <div className="py-2">
            <Link
              href="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Settings
            </Link>
            <button
              onClick={async () => {
                try {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                  await signOut();
                  window.location.href = "/";
                } catch (error) {
                  console.error("Failed to sign out:", error);
                }
              }}
              className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-16 z-50 flex flex-col space-y-4 bg-zinc-400 p-4 text-lg md:hidden">
          {session.data?.user ? (
            <>
              <div className="flex items-center border-b border-gray-300 pb-4">
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
                  <p className="text-xs text-gray-500">
                    {email ?? "No email available"}
                  </p>
                </div>
              </div>
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="rounded py-2 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="rounded py-2 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={async () => {
                  try {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    await signOut();
                    window.location.href = "/";
                  } catch (error) {
                    console.error("Failed to sign out:", error);
                  }
                }}
                className="rounded py-2 text-left text-red-500 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/api/auth/sign-in"
              onClick={() => setIsOpen(false)}
              className="rounded py-2 font-bold hover:bg-gray-100"
            >
              Login / Sign Up
            </Link>
          )}
          {/* Show Explore and Library only when logged in */}
          {session.data?.user && (
            <>
              <Link
                href="/explore"
                onClick={() => setIsOpen(false)}
                className="rounded py-2 hover:bg-gray-100"
              >
                Explore
              </Link>
              <Link
                href="/library"
                onClick={() => setIsOpen(false)}
                className="rounded py-2 hover:bg-gray-100"
              >
                Library
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
