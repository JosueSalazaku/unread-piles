import GoogleBooks from "@/components/GoogleBooks";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React from "react";
import SignInPage from "./api/auth/sing-in";

export default function Home() {
  return (
    <div>
      {/* <SignedOut> */}
      <h1>HEYY</h1>
      <SignInPage />
      {/* </SignedOut> */}
      {/* <SignedIn> */}
        <GoogleBooks />
      {/* </SignedIn> */}
    </div>
  );
}
