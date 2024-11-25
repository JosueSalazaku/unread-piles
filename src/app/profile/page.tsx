"use client";

import { useCustomSession } from "@/components/SessionProvider";
import Image from "next/image";

export default function Profile() {
  const session = useCustomSession();

  if (!session.data?.user) {
    return (
      <div>You are not logged in. Please sign in to view your information.</div>
    );
  }

  const { name, email, image } = session.data.user;

  return (
    <div className="mt-8 flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">User Information</h1>
      <div className="flex items-center space-x-4">
        {image && (
          <Image
            src={image}
            alt={name}
            width={70}
            height={70}
            className="rounded-full"
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
    </div>
  );
}
