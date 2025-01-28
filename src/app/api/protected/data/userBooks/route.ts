import { db } from "@/server/db";
import { userBooks } from "@/server/db/auth-schema";
import type { UserBooks } from "@/types";
import { and, eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
        return NextResponse.json(
            { error: "User ID is required" },
            { status: 400 }
        );
    }
    try {
        const data = await db.select().from(userBooks).where(eq(userBooks.userId, userId))
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json({ error: "Error fetching books" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { id, userId, bookId, status } = await req.json() as UserBooks;

        if (!userId || !bookId || !status) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const existingBook = await db.select().from(userBooks).where(and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId), eq(userBooks.status, status)));

        console.log(existingBook);
        

        if (existingBook.length > 0) {
            return NextResponse.json({ error: "This book is already saved with the selected status." }, { status: 400 });
        }

        await db.insert(userBooks).values({
            id,
            userId,
            bookId,
            status
        });

        return NextResponse.json({ message: "Book added successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error inserting book:", error);
        return NextResponse.json({ error: "Error inserting book" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { userId, bookId, status } = await req.json() as UserBooks;

        if (!userId || !bookId || !status) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await db.update(userBooks)
            .set({ status })
            .where(and(eq(userBooks.userId, userId), eq(userBooks.status, status)));
        return NextResponse.json({ message: "Status updated successfully" } , { status: 200 });
    } catch (error) {
        console.error("Error updating status:", error);
        return NextResponse.json({ error: "Error updating status" }, { status: 500 });
    }
}