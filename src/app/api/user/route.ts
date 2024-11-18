import { NextResponse } from 'next/server'
import { db } from '@/server/db'
import { user } from '@/server/db/auth-schema'

export async function GET() {
    try {
        const data = await db.select().from(user)
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
}

// POST: Create a new user
export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const user: User = await request.json() as User;

    // Validate incoming data before inserting into the database
    if (!user.name || !user.email || !user.image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert user into the database
    const result = await db.insert(user).values({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Return the inserted user or success response
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error adding new user:", error);
    return NextResponse.json({ error: "Error adding new user" }, { status: 500 });
  }
}