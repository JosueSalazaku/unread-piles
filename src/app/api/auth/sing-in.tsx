"use client";
import { socialSignIn } from "@/app/api/auth/lib/auth-client";
import { useState } from "react";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  const handleSocialSignIn = async (provider: string) => {
    setLoading(true);
    try {
      console.log(`Attempting ${provider} Sign-In`);
      await socialSignIn(provider, "/");
    } catch (error) {
      console.error(`Error during ${provider} Sign-In:`, error);
      alert("Sign-In failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 space-y-4">
      <button
        className="border rounded bg-white text-blue-800 px-4 py-2"
        onClick={() => handleSocialSignIn("google")}
        disabled={loading}
      >
        {loading ? "Signing in with Google..." : "Sign in with Google"}
      </button>
      <button
        className="border rounded bg-white text-blue-800 px-4 py-2"
        onClick={() => handleSocialSignIn("github")}
        disabled={loading}
      >
        {loading ? "Signing in with GitHub..." : "Sign in with GitHub"}
      </button>
    </div>
  );
}
