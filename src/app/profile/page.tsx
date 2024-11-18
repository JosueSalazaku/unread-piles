"use client";

import { useCustomSession } from "@/components/SessionProvider";
import Image from "next/image";

export default function UserInfoPage() {
  const session = useCustomSession();

  if (session.isPending) {
    return <div>Loading...</div>; // Show a loading state while session is being fetched
  }

  if (!session.data?.user) {
    return <div>You are not logged in. Please sign in to view your information.</div>;
  }

  const { name, email, image } = session.data.user;

  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      <h1 className="text-2xl font-bold">User Information</h1>
      <div className="flex items-center space-x-4">
        {image && <Image src={image} alt={name} width={30} height={30} className="w-16 h-16 rounded-full" />}
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
