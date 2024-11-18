"use client"
import { useSession } from "@/app/lib/auth-client";
import { ReactNode } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession();

  // Always render the same structure on the server and client
  return (
    <div>
      {session.isPending ? (
        <div>Loading...</div> // Ensure this is consistent during server-side rendering
      ) : (
        children
      )}
    </div>
  );
}




