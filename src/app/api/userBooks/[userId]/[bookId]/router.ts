import { db } from "@/server/db";
import { userBooks } from "@/server/db/auth-schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string, bookId: string } }) {
    const { userId, bookId } = params
    try {
        const data = await db.select().from(userBooks).where(and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)));
        if (data.length === 0) {
            return NextResponse.json({ error: "Book not found for this user" }, { status: 404 });
        }

        return NextResponse.json(data[0]); 
    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json({ error: "Error fetching books" }, { status: 500 });
    }
}