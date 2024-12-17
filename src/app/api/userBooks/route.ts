import { db } from "@/server/db";
import { userBooks } from "@/server/db/auth-schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await db.select().from(userBooks)
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json({ error: "Error fetching books" }, { status: 500 });
    }
}