"use client"
import { useCustomSession } from "@/components/SessionProvider";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const session = useCustomSession();
  const router = useRouter();

  useEffect(() => {
    if (!session.data?.user) {
      void router.push("/sign-in"); // Redirect to the sign-in page
    }
  }, [session, router]);

  // Show nothing until authentication state is resolved
  if (!session.data?.user) {
    return null;
  }

  return <>{children}</>;
}
