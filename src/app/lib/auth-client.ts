import { createAuthClient } from "better-auth/react";

export const { signIn, signOut, signUp, useSession } = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL!,
});

// Helper function for social sign-in
export const socialSignIn = async (provider: string, callbackURL: string) => {
    const redirectUrl = `${process.env.BETTER_AUTH_URL}/auth/sign-in/social/${provider}?callbackURL=${encodeURIComponent(callbackURL)}`;
    console.log("Redirecting to:", redirectUrl); // Add this for debugging
    window.location.href = redirectUrl;
  };
  
