"use client"
import { useSession } from "@/app/lib/auth-client";
import type { ReactNode } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession();

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




