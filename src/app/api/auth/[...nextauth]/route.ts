"use server";

import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";

// Define NextAuth configuration options
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // Optional: Add more providers if needed
  ],
  // Optional: Add callbacks, session management, and other options as needed
};

// App Router compatible handler function
async function authHandler(req: Request) {
  const nextAuthHandler = NextAuth(authOptions) as (req: Request, res: Response) => Promise<Response>;
  // Wrap the handler response to fit Next.js requirements
  const response: Response = await nextAuthHandler(req, new Response());
  return response;
}

// Exporting compatible GET and POST handlers for the App Router
export const GET = authHandler;
export const POST = authHandler;
