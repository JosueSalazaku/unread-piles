"use client";
import { useCustomSession } from "@/components/SessionProvider";
import UserBooks from "@/components/UserBooks";

export default function Profile() {
  const session = useCustomSession();

  if (!session.data?.user) {
    return <div>You are not logged in. Please sign in to view your information.</div>;
  }

  return (
    <div>
    <UserBooks />
    </div>
  );
}
