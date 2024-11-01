import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) await auth();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  publicRoute: ['/sign-in', '/sign-up', '/forgot-password', '/reset-password'],
  runtime: 'nodejs',
};