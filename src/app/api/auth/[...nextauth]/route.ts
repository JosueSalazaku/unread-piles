"use server";
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GIHUB_CLIENT_SECRET!
        })

    ]
};

export default NextAuth(handler);
export { handler as GET, handler as POST };
