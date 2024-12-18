import { db } from "@/server/db";
import { userBooks } from "@/server/db/auth-schema";
import type { UserBooks } from "@/types";
import { and, eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await db.select().from(userBooks)
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json({ error: "Error fetching books" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    const { userId, bookId, status } = await req.json() as UserBooks;
    try {
        await db.update(userBooks)
            .set({ status })
            .where(and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)));
        return NextResponse.json({ message: "Status updated successfully" });
    } catch (error) {
        console.error("Error updating status:", error);
        return NextResponse.json({ error: "Error updating status" }, { status: 500 });
    }
}