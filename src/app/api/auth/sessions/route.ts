import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: req.headers })
        const user = session?.user;
        console.log(session);

        if (!user) {
            return NextResponse.json({ error: 'Not Authenticated' }, { status: 401 });
        } else {
            return NextResponse.json({ user: session.user }, { status: 200 });

        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
    
}