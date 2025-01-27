import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./app/lib/auth";
import { headers } from "next/headers";

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};

const protectedRoutes = [ '/explore', '/books', '/profile', '/library', '/search', '/settings'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
 
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;
  console.log("Middleware RUNNING!");
  console.log(user);

  if (protectedRoutes.some(route => path.startsWith(route))) {
    try {
      if (!user) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-in`);
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-in`);
    } 
  }
  return NextResponse.next();
}