"use client";
import { socialSignIn } from "@/app/api/auth/lib/auth-client";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center mt-8">
      <button
        className="border rounded bg-white text-blue-800 px-4 py-2"
        onClick={() => {
          console.log("Attempting Google Sign-In");
          void socialSignIn("google", "/");
        }}
      >
        Sign in with Google
      </button>

      <button
        className="border rounded bg-white text-blue-800 px-4 py-2 ml-4"
        onClick={() => {
          console.log("Attempting GitHub Sign-In");
          void socialSignIn("github", "/");
        }}
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
