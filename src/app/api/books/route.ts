import { type NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db'
import { user, book, userBooks } from '@/server/db/auth-schema'
import type { Book, UserBooks } from '@/types';


export async function GET() {
    try {
        const data = await db.select().from(book)
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
}

