"use client";
import { socialSignIn } from "@/app/lib/auth-client";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center mt-8">
      <button
        className="border rounded bg-white text-blue-800 px-4 py-2"
        onClick={() => socialSignIn("google", "/")}
      >
        Sign in with Google
      </button>

      <button
        className="border rounded bg-white text-blue-800 px-4 py-2 ml-4"
        onClick={() => socialSignIn("github", "/")}
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
