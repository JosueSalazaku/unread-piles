"use server"
import { db } from "@/server/db";
import { userBooks } from "@/server/db/auth-schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;

    try {
        const data = await db.select({ bookId: userBooks.bookId }).from(userBooks).where(eq(userBooks.userId, userId));
        if (data.length === 0) {
            return NextResponse.json({ error: "Book not found for this user" }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json({ error: "Error fetching books" }, { status: 500 });
    }
}