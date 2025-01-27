// import { auth } from "@/app/lib/auth";
// import { type NextRequest, NextResponse } from "next/server";

// export const config = {
//     matcher: ['/api/*'], 
// };
  
// export default async function middleware(req: NextRequest) {
//     console.log("Middleware for api RUNNING");
    
//     const session = await auth.api.getSession({ headers: req.headers });
//     const user = session?.user;

//     if (!user) {
//         return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!);
//     }

//     return NextResponse.next();
// }
