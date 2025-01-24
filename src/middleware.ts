import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";
interface Session {
  user: {
    id: string;
    name: string;
  };
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};

const protectedRoutes = ['/explore', '/books', '/profile', '/library', '/search', '/settings'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Check if the requested route is in the protected list
  if (protectedRoutes.some(route => path.startsWith(route))) {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/session`, {
        headers: Object.fromEntries(req.headers.entries()),
      });

      if (response.status !== 200) {
        console.error("Failed to fetch session: ", response.statusText);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-in`);
      }

      const session: Session = response.data as Session;

      if (!session.user) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-in`);
      }

      console.log("Session:", session);

    } catch (error) {
      console.error("Error fetching session:", error);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-in`);
    }
  }

  return NextResponse.next();
}