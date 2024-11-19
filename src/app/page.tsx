"use client";
import GoogleBooks from "@/components/GoogleBooks";
import { useCustomSession } from "@/components/SessionProvider";
import React from "react";

export default function Home() {
  const session = useCustomSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-light text-dark-brown dark:bg-background-dark dark:text-white">
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
        <div className="text-center">
          <h1 className="text-4xl">Welcome to Unread Piles</h1>
          <h1 className="pb-2 text-xl">
            <strong>Dive into a world of books</strong>
          </h1>
          <p>Organize, explore, and rediscover your favorite reads.</p>
        </div>
      )}
    </div>
  );
}
