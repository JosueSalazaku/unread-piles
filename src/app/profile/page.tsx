"use client";

import React, { useEffect, useState } from "react";
import { fetchUserBooks } from "../services/backend/book-service";
import type { UserBooks } from "@/types";
import { useCustomSession } from "@/components/SessionProvider";
import Image from "next/image";

export default function Profile(): JSX.Element {
  const session = useCustomSession();
  const [bookData, setBookData] = useState<UserBooks | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserBookData = async () => {
      try {
        if (session.data?.user) {
          const userId = session.data.user.id;  // Getting userId from the session
          const bookId = ""
          const data = await fetchUserBooks(userId);
          setBookData(data);
        }
      } catch {
        setError("Could not fetch book data");
      }
    };

    void getUserBookData();
  }, [session]);

  if (!session.data?.user) {
    return <div>You are not logged in. Please sign in to view your information.</div>;
  }

  const { name, email, image } = session.data.user;

  if (error) return <div>{error}</div>;
  if (!bookData) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">User Information</h1>
      <div className="flex items-center space-x-4">
        {image && (
          <Image
            src={image ?? ""}
            alt={name ?? "User Image"}
            width={30}
            height={30}
            className="h-16 w-16 rounded-full"
          />
        )}
        <div>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
        </div>
      </div>
      <div>
        <h1>Book Data</h1>
        <pre>{JSON.stringify(bookData, null, 2)}</pre>
      </div>
    </div>
  );
}
