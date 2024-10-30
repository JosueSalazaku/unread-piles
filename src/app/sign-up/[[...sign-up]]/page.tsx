"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center mt-8">
      <SignUp path="/sign-up" />
   </div>
  );
}
