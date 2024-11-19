"use client";
import GoogleBooks from "@/components/GoogleBooks";
import { useCustomSession } from "@/components/SessionProvider";
import React from "react";

export default function Home() {
  const session = useCustomSession();

  return (
    <div className="flex px-12 min-h-screen flex-col items-center justify-center bg-background-light text-dark-brown dark:bg-background-dark dark:text-white">
      {session.data?.user ? (
        <>
          <h1 className="text-2xl font-bold">
            Welcome back, {session.data.user.name}!
          </h1>
          <p className="mt-2">
            Enjoy exploring your personalized book collection!
          </p>
          <GoogleBooks />
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl">Dive into a world of books.</h1>
          <p className="text-xl">
            Organize, explore and rediscover your favorite reads.
          </p>
          <button className="rounded-md w-36 border border-dark-brown px-4 py-2 hover:border-transparent hover:bg-main-orange hover:text-white">
            Login / Sign Up
          </button>
        </div>
      )}
    </div>
  );
}
