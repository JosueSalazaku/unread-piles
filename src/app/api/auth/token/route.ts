import { getSession } from "@/app/lib/auth-client";
import { db } from "@/server/db";
import { account } from "@/server/db/auth-schema";
import { eq } from "drizzle-orm";
import { NextResponse } from 'next/server'

export default async function getAccessTokens() {
    try {
        const session = await getSession();
        const userId = session.data?.user.id
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized: No user ID found" }, { status: 401 });
        }

        const userAccount = await db.select().from(account).where(eq(account.userId, userId)).limit(1);
        
        // If no account is found for the user
        if (userAccount.length === 0) {
            console.warn('No account found for this user');
            return NextResponse.json({ error: 'No account found' }, { status: 401 });
        }

        const accessToken = userAccount[0]?.accessToken;
        if (!accessToken) {
            return NextResponse.json({ error: "Access token not found" }, { status: 404 });
        }

        // Return the access token in the response
        return NextResponse.json({ accessToken }, { status: 200 });

    } catch (error) {
        console.error("Error fetching access token:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}