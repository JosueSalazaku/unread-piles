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
  const handleSignOut = () => signOut();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); // Separate ref for the button

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
      document.addEventListener("mousedown", handleOutsideClick);
    };
  });

  const { name, email, image } = session.data?.user ?? {};

  return (
    <nav className="flex h-14 w-full items-center justify-between border-b-4 border-dark-brown px-6">
      <Link href="/" className="text-main text-2xl">
        UNREAD PILES
      </Link>
      <div className="flex h-5 items-center gap-2">
        <div className="lg:hidden">
          <ModdeToggle />
        </div>
        <button onClick={toggle} className="md:hidden">
          {isOpen ? <MdClose size={30} /> : <GiHamburgerMenu size={24} />}
        </button>
      </div>
      <div className="hidden flex-row items-center justify-between space-x-6 font-semibold md:flex">
        <SearchBooks />
        <Link
          href="/explore"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Explore
        </Link>
        <Link
          href="/library"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Library
        </Link>
        <Link
          href="/pages"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Pages
        </Link>
        {session.data?.user ? (
          <div className="flex items-center space-x-4">
            {image && (
              <button ref={buttonRef} onClick={toggle}>
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
          <div
            ref={dropdownRef}
            className="border-gray-200 bg-white absolute right-5 top-16 z-50 w-56 rounded-lg border shadow-lg"
          >
            <div className="border-gray-300 flex flex-col items-center border-b p-4">
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
                onClick={() => {
                  setIsOpen(false);
                }}
                className="text-gray-700 hover:bg-gray-100 block px-4 py-2"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="text-gray-700 hover:bg-gray-100 block px-4 py-2"
              >
                Settings
              </Link>
              <button
                onClick={async () => {
                  await handleSignOut();
                  setIsOpen(false);
                }}
                className="text-red-500 hover:bg-gray-100 block w-full px-4 py-2 text-left font-semibold"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Small screen */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="text-main bg-zinc-400 absolute left-0 right-0 top-20 z-50 flex flex-col p-5 text-lg md:hidden"
        >
          {session.data?.user ? (
            <>
              <div className="border-gray-300 flex flex-row items-center gap-2 border-b py-4">
                {image && (
                  <Image
                    src={image}
                    alt={name ?? "User"}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                )}
                <h1 className="mt-2 text-lg font-semibold">{name ?? "User"}</h1>
              </div>
              <Link
                href="/profile"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="text-gray-700 hover:bg-gray-100 rounded py-2"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="text-gray-700 hover:bg-gray-100 rounded py-2"
              >
                Settings
              </Link>
              <button
                onClick={async () => {
                  await handleSignOut();
                  setIsOpen(false);
                }}
                className="text-red-500 hover:bg-gray-100 rounded py-2 font-semibold"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/api/auth/sign-in"
              onClick={() => {
                setIsOpen(false);
              }}
              className="text-gray-700 hover:bg-gray-100 rounded py-2 font-bold"
            >
              Login / Sign Up
            </Link>
          )}
          <Link
            href="/explore"
            onClick={() => {
              setIsOpen(false);
            }}
            className="hover:bg-gray-100 rounded py-2"
          >
            Explore
          </Link>
          <Link
            href="/library"
            onClick={() => {
              setIsOpen(false);
            }}
            className="hover:bg-gray-100 rounded py-2"
          >
            Library
          </Link>
          <Link
            href="/pages"
            onClick={() => {
              setIsOpen(false);
            }}
            className="hover:bg-gray-100 rounded py-2"
          >
            Pages
          </Link>
        </div>
      )}
    </nav>
  );
}
