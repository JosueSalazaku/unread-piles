import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/db";
import { hashPassword, verifyPassword } from "@/utils/auth"; 
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm/expressions"; // Import `eq` for query comparisons
import type { User } from "@/types";


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
        github: {
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
    },


    customProvider: {
        email: async (email: string, password: string): Promise<User> => {
            const user = await db
                .select()
                .from(users)
                .where(eq(users.email, email))
                .limit(1)
                .then(result => result[0] ?? null);
    
            if (!user?.passwordHash || !await verifyPassword(password, user.passwordHash)) {
                throw new Error("Invalid email or password");
            }
    
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                image: user.image ?? null,
                providerId: user.providerId,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        },
    }
    
});
