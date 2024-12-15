"use client";
import GeneralBooks from "@/components/GeneralBooks";
import { useCustomSession } from "@/components/SessionProvider";
import Link from "next/link";
import React from "react";

export default function Home() {
  const session = useCustomSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-light px-12 text-dark-brown dark:bg-background-dark dark:text-white">
      {session.data?.user ? (
        <>
          <h1 className="pt-5 text-2xl font-bold">
            Welcome back, {session.data.user.name}!
          </h1>
          <p className="mt-2">
            Enjoy exploring your personalized book collection!
          </p>
          <GeneralBooks />
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl">Dive into a world of books.</h1>
          <p className="text-xl">
            Organize, explore and rediscover your favorite reads.
          </p>

          <Link
            href="/api/auth/sign-in"
            className="w-36 text-center rounded-md border border-dark-brown px-4 py-2 hover:border-transparent hover:bg-main-orange hover:text-white"
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
}
