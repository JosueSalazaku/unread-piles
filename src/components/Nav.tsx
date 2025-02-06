"use client";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import SearchBooks from "@/components/SearchBooks";
import { useCustomSession } from "./SessionProvider";
import ModdeToggle from "./ModdeToggle";
import { PictureDropDown } from "./PictureDropDown";
import { signOut } from "@/app/lib/auth-client";
import Image from "next/image";
import { Telescope, Settings, LibraryBig, LogOut } from "lucide-react";

export function Nav() {
  const session = useCustomSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <nav className="flex h-16 w-full items-center justify-between px-6 py-4 pt-10 sm:px-6">
      <Link
        href="/"
        className="text-main flex items-center text-xl font-bold sm:text-2xl"
      >
        <Image
          src="/piles.svg"
          alt="Unread Piles Logo"
          width={42}
          height={40}
          className="pr-2 px-2 dark:invert dark:filter sm:hidden"
        />

        <Image
          src="/unreadpiles.svg"
          alt="Unread Piles Logo"
          width={120}
          height={70}
          className="hidden px-1 dark:invert dark:filter sm:block"
        />
      </Link>

      <div className="space-x- flex items-center">
        {isClient && session.data?.user && <SearchBooks />}

        <div className="hidden items-center space-x-6 pl-3 md:flex">
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
            <PictureDropDown
              session={session}
              toggleDropdown={toggleDropdown}
            />
          ) : (
            <Link href="/api/auth/sign-in">
              <button className="rounded-md border border-dark-gray px-4 py-2 hover:border-transparent hover:bg-main-orange hover:text-white">
                Login / Sign Up
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="flex items-center px-2 md:hidden">
          <ModdeToggle />
          <button
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
            className="px-1 focus:outline-none"
          >
            {isOpen ? <MdClose size={22} /> : <GiHamburgerMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-20 z-50 flex flex-col space-y-3 bg-main-orange p-4 text-lg shadow-md md:hidden">
          {session.data?.user ? (
            <>
              <div className="flex gap-3 pl-4 py-2 items-center">
                <Image
                  src={session.data.user.image ?? ""}
                  alt={name ?? ""}
                  width={50}
                  height={40}
                  className="rounded-full"
                />
                <h1>{session.data.user.email}</h1>
              </div>
              <Link
                href="/library"
                onClick={() => setIsOpen(false)}
                className="flex gap-2 rounded p-4 py-2 hover:bg-light-orange dark:hover:bg-orange-950"
              >
                <LibraryBig strokeWidth={1} /> Library
              </Link>
              <Link
                href="/explore"
                onClick={() => setIsOpen(false)}
                className="flex gap-2 rounded p-4 py-2 hover:bg-light-orange dark:hover:bg-orange-950"
              >
                <Telescope strokeWidth={1} /> Explore
              </Link>

              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex gap-2 rounded p-4 py-2 hover:bg-light-orange dark:hover:bg-orange-950"
              >
                <Settings strokeWidth={1} />
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
                className="mt-auto flex gap-2 rounded p-4 py-2 text-left hover:bg-light-orange dark:hover:bg-orange-950"
              >
                <LogOut strokeWidth={1} />
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/api/auth/sign-in"
              onClick={() => setIsOpen(false)}
              className="rounded p-4 py-2 font-bold hover:bg-background-dark"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
