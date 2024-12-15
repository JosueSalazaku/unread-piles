import { type NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db'
import { book, userBooks } from '@/server/db/auth-schema'
import type { Book } from '@/types';
import { eq, and } from "drizzle-orm";
import { getSession } from '@/app/lib/auth-client';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    try {
        const data = await db.select().from(book)
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json({ error: "Error fetching books" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        const userId = session?.data?.user.id;

        if (!userId) {
            console.warn('Unauthorized access attempt, no user ID found in session');
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body: Book = await req.json() as Book;
        const { id, title, description } = body;

        if (!id || !title) {
            console.warn('Invalid request: Missing required fields', { id, title });
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existingBook = await db.query.book.findFirst({
            where: eq(book.id, id),
        });

        if (!existingBook) {
            await db.insert(book).values({
                id,
                title,
                description,
            });
        }

        const existingUserBook = await db.query.userBooks.findFirst({
            where: and(eq(userBooks.userId, userId), eq(userBooks.bookId, id)),
        });

        if (existingUserBook) {
            return NextResponse.json({ message: 'This book is already linked to the user' }, { status: 400 });
        }

        await db.insert(userBooks).values({
            id: uuidv4(),
            userId,
            bookId: id,
            status: '', 
            createdAt: new Date(),
        });
        console.log(`Book ${id} successfully linked to user ${userId}`);
        return NextResponse.json({ message: 'Book saved and linked to user successfully' }, { status: 201 });
    } catch (error) {
        console.error("Error saving book:", error);
        return NextResponse.json({ error: "Error saving book" }, { status: 500 });
    }
}