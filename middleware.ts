import { NextResponse } from "next/server";

export function middleware(request: Request) {
  // Middleware logic
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*", // Matches all routes under `/api/`
    "/protected/:path*", // Example protected routes
  ],
};