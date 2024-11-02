"use server";
import NextAuth, { type NextAuthOptions } from "next-auth";
import type { NextApiHandler } from "next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        })
    ],
    // Optional: Add callbacks, session management, and other options as needed
};

const handler = NextAuth(authOptions) as NextApiHandler;
export { handler as GET, handler as POST };
