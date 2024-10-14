import { NextResponse } from 'next/server'
import { db } from '@/server/db'
// import type { User } from '@/types'
import { users } from '@/server/db/schema'

export async function GET() {
    try {
        const data = await db.select().from(users)
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
}