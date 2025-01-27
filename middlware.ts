import { type NextRequest, NextResponse } from 'next/server';


export const config = {
    matcher: ['/api/**'], // Match specific protected API routes
};

export default async function middleware(req: NextRequest) {
    try {

    } catch (error) {
        console.error('Error in middleware:', error);
        return NextResponse.redirect(new URL('/api/auth/sign-in', req.url));
    }
}
