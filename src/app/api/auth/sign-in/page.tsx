"use client";
import { signIn } from "@/app/lib/auth-client";

export default function SignInPage() {
  return (
    <div className="mt-8 flex items-center justify-center">
      <button
        className="rounded border bg-white px-4 py-2 text-blue-800"
        onClick={async () => {
          console.log("Attempting Google Sign-In");
          await signIn.social({
            provider: "google",
            callbackURL: "/",
          });
        }}
      >
        Sign in with Google
      </button>

      <button
        className="ml-4 rounded border bg-white px-4 py-2 text-blue-800"
        onClick={async () => {
          console.log("Attempting GitHub Sign-In");
          await signIn.social({
            provider: "github",
            callbackURL: "/",
          });
        }}
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
