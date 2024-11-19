"use client";
import GoogleBooks from "@/components/GoogleBooks";
import { useCustomSession } from "@/components/SessionProvider";
// import { useRouter } from "next/router";
import React from "react";

export default function Home() {
  const session = useCustomSession();
  // const router = useRouter();

  return (
    <div>
      {session.data?.user && (
        <div>
          <h1>WELCOM</h1>
          <GoogleBooks />
        </div>
      )}
    </div>
  );
}
