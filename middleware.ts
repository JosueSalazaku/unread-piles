import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  try {
    // Fetch session data from the API route
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: request.nextUrl.origin,
        headers: {
          // Pass the cookies from the request for authentication
          cookie: request.headers.get("cookie") ?? "",
        },
      }
    );

    // If session doesn't exist, redirect to sign-in
    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Allow the request to proceed if session exists
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);

    // Redirect to an error page or sign-in page on failure
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

// Define the routes where this middleware will be applied
export const config = {
  matcher: [
    "/profile/:path*", // Protect `/profile` and its subroutes
    "/settings/:path*", // Protect `/settings` and its subroutes
    "/library/:path*", // Protect `/library` and its subroutes
    "/explore/:path*", // Protect `/explore` and its subroutes
  ],
};
