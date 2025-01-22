"use client";
import { useCustomSession } from "@/components/SessionProvider";
import UserBooks from "@/components/UserBooks";
import Image from "next/image";

export default function Profile() {
  const session = useCustomSession();

  if (!session.data?.user) {
    return <div>You are not logged in. Please sign in to view your information.</div>;
  }

  const {name, email, image} = session.data.user

  return (
    <div className="flex flex-col mx-auto max-w-4xl p-6">
      <div>
        <Image
        src={image ?? "No image"}
        alt={name ?? "No name"}  
        width={150}
        height={150}
        className="rounded-full"
        />
      </div>
    <UserBooks />
    </div>
  );
}
