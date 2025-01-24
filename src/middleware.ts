import { NextRequest, NextResponse } from "next/server";
import { createAuthClient } from "better-auth/react";
import { auth } from "./app/lib/auth";

interface Session {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",

  ],
};

export default async function middleware(req: NextRequest) {
    console.log("Middleware RUNNING!");
  
    if (req.nextUrl.pathname.startsWith('/explore')) {
      // Make sure you're calling the right endpoint for authentication
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/session`);
  
      // Check if the response is ok and contains a valid JSON body
      if (!response.ok) {
        console.error('Failed to fetch session:', response.statusText);
        return NextResponse.redirect('/api/auth/sign-in');
      }
  
      try {
        const session: Session = await response.json() as Session; 
        console.log("Session:", session);
  
        // Perform authentication checks here
        if (!session.user) {
          return NextResponse.redirect('/api/auth/sign-in');
        }
      } catch (error) {
        console.error("Failed to parse session JSON:", error);
        return NextResponse.redirect('/api/auth/sign-in');
      }
    }
  
    return NextResponse.next();
  }