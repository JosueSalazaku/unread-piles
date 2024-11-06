import { createAuthClient } from "better-auth/react";

export const { signIn, signOut, signUp, useSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
});

export const socialSignIn = async (provider: string, callbackURL: string) => {
  const redirectUrl = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/sign-in/social/${provider}?callbackURL=${encodeURIComponent(callbackURL)}`;
  console.log("Redirecting to:", redirectUrl); // Debugging output
  window.location.href = redirectUrl;
};
