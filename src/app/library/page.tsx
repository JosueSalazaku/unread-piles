"use client";
import CurrentlyReading from "@/components/CurrentlyReading";
import { useCustomSession } from "@/components/SessionProvider";
import ToReadPiles from "@/components/ToReadPiles";
// import UserBooks from "@/components/UserBooks";
import Image from "next/image";

export default function Library() {
  const session = useCustomSession();
  
  if (!session.data?.user?.id) {
    return <div>You are not logged in. Please sign in to view your information.</div>;
  }

  const {name, image} = session.data.user

  return (
    <div className="flex flex-col mx-auto max-w-4xl gap-5  p-6">
      <div className="flex gap-5 items-center">
        <Image
        src={image ?? "No image"}
        alt={name ?? "No name"}  
        width={100}
        height={100}
        className="rounded-full"
        />
        <h1 className="text-xl">{name}</h1>
      </div>
      {/* <UserBooks /> */}
      <ToReadPiles />
      <CurrentlyReading/>
    </div>
  );
}

