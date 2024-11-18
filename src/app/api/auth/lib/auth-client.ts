import { createAuthClient } from "better-auth/react";

export const { signIn, signOut, signUp, useSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
});

export const socialSignIn = async (provider: string, callbackURL: string) => {
  const redirectUrl = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/sign-in/social/${provider}?callbackURL=${encodeURIComponent(callbackURL)}`;
  console.log(`Redirecting to: ${redirectUrl}`);
  
  try {
    if (!redirectUrl.includes(provider)) {
      throw new Error(`Provider "${provider}" is not configured properly.`);
    }
    window.location.href = redirectUrl;
  } catch (error) {
    console.error("Error during social sign-in:", error);
    alert("An error occurred during sign-in. Check the console for details.");
  }
};
