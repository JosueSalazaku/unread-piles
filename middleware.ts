import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  console.log("Middleware executed for:", request.nextUrl.pathname);

  const unprotectedPaths = ["/sign-in", "/about"]; // Add other unprotected paths here
  const isUnprotected = unprotectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isUnprotected) {
    console.log("Unprotected path accessed:", request.nextUrl.pathname);
    return NextResponse.next();
  }

  try {
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") ?? "",
        },
      }
    );

    console.log("Session fetched:", session);

    if (!session) {
      console.log("No session found, redirecting to sign-in.");
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/profile/:path*",
    "/settings/:path*",
    "/library/:path*",
    "/explore/:path*",
  ],
};
