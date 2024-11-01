import GoogleBooks from "@/components/GoogleBooks";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React from "react";

export default function Home() {
  return (
    <div>
      <SignedOut>
        <h1>HEYY</h1>
      </SignedOut>
      <SignedIn>
        <GoogleBooks />
      </SignedIn>
    </div>
  );
}
