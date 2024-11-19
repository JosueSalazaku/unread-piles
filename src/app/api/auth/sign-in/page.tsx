"use client";
import { signIn } from "@/app/lib/auth-client";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">Login</h1>
        <p className="pb-2 text-center text-dark-brown">
          Your personal library awaits. Log in to track, <br /> explore, and
          cherish your book collection.
        </p>
        <div className="flex flex-col items-center gap-4">
          <button
            className="w-80 rounded-md border border-dark-brown bg-transparent px-4 py-2 hover:bg-accent-blue dark:hover:bg-dark-brown"
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
            className="w-80 rounded-md border border-dark-brown bg-transparent px-4 py-2 hover:bg-accent-blue dark:hover:bg-dark-brown"
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
    </div>
  );
}
