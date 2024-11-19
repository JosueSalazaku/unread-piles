"use client";
import { signIn } from "@/app/lib/auth-client";

export default function SignInPage() {
  return (
    <div className="mt-8 flex pt-40 flex-col items-center justify-center gap-4">
      Sign In
      <div className="flex flex-col items-center gap-2">
        <button
          className="bg-white text-blue-800 w-56 rounded-md border px-4 py-2"
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
          className="bg-white text-blue-800 w-56 rounded-md border px-4 py-2"
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
    </div>
  );
}
