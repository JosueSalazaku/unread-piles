"use client";
import GoogleBooks from "@/components/GoogleBooks";
import { useCustomSession } from "@/components/SessionProvider";
import React from "react";

export default function Home() {
  const session = useCustomSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-dark-brown dark:text-white">
      {session.data?.user ? (
        <>
          <h1 className="text-2xl font-bold">Welcome back, {session.data.user.name}!</h1>
          <p className="mt-2">Enjoy exploring your personalized book collection!</p>
          <GoogleBooks />
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl">Welcome to Unread Piles</h1>
          <p className="mt-2 text-lg">
            Discover, organize, and track your favorite books.
          </p>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
            Log in to access your library and personalized recommendations.
          </p>
        </div>
      )}
    </div>
  );
}
