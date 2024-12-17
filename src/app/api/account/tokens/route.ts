import { auth } from "@/app/lib/auth";
import { db } from "@/server/db";
import { account } from "@/server/db/auth-schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Retrieve headers from the incoming request
        const requestHeaders = await headers();

        // Fetch the session using the headers
        const session = await auth.api.getSession({
            headers: requestHeaders
        });

        console.log("Session:", session);

        const userId = session?.user.id

        console.log("User ID:", userId);

        if (!userId) {
            console.warn("Unauthorized: No user ID found");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Query user account in the database
        const userAccount = await db
            .select()
            .from(account)
            .where(eq(account.userId, userId))
            .limit(1);

        if (userAccount.length === 0) {
            console.warn("No account found for this user");
            return NextResponse.json({ error: "No account found" }, { status: 404 });
        }

        const accessToken = userAccount[0]?.accessToken;

        if (!accessToken) {
            console.warn("Access token not found");
            return NextResponse.json({ error: "Access token not found" }, { status: 404 });
        }

        return NextResponse.json({ accessToken }, { status: 200 });
    } catch (error) {
        console.error("Error fetching access token:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}