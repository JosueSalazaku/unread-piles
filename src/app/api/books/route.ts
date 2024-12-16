import { type NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db'
import { account, book, userBooks } from '@/server/db/auth-schema'
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

        // Query for the access token from the account table using the userId
        const userAccount = await db.select().from(account).where(eq(account.userId, userId)).limit(1);

        if (userAccount.length === 0) {
            console.warn('No account found for this user');
            return NextResponse.json({ error: 'No account found' }, { status: 401 });
        }

        const accessToken = userAccount[0]?.accessToken;
        console.log('Access Token:', accessToken);

        const body: Book = await req.json() as Book;
        const { id, title, authors } = body;

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
                authors,
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