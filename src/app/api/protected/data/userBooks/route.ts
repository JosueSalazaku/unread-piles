import { db } from "@/server/db";
import { userBooks } from "@/server/db/auth-schema";
import type { UserBooks } from "@/types";
import { and, eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    const data = await db
      .select()
      .from(userBooks)
      .where(eq(userBooks.userId, userId));
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Error fetching books" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, bookId, status } = (await req.json()) as UserBooks;

    if (!userId || !bookId || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const existingBook = await db
      .select()
      .from(userBooks)
      .where(and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)));

    if (existingBook.length > 0) {
      // If the status is different, update the status, otherwise return success
      if (existingBook[0] && existingBook[0].status !== status) {
        await db
          .update(userBooks)
          .set({ status })
          .where(
            and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)),
          );
        return NextResponse.json(
          { message: "Book status updated successfully" },
          { status: 200 },
        );
      } else {
        return NextResponse.json(
          { message: "This book is already saved with the selected status." },
          { status: 400 },
        );
      }
    }

    // Insert a new record if no existing book status was found
    await db.insert(userBooks).values({
      id: crypto.randomUUID(),
      userId,
      bookId,
      status,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Book added successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error inserting or updating book:", error);
    return NextResponse.json(
      { error: "Error inserting or updating book" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId, bookId, status } = (await req.json())  as { userId: string; bookId: string, status: string };;

    if (!userId || !bookId || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await db
      .update(userBooks)
      .set({ status })
      .where(and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)));
    return NextResponse.json(
      { message: "Status updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { error: "Error updating status" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId, bookId } = (await req.json()) as { userId: string; bookId: string };
    if (!userId || !bookId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await db
      .delete(userBooks)
      .where(and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)));
    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json({ error: "Error deleting book" }, { status: 500 });
  }
}
