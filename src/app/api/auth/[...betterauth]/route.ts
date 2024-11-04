import { auth } from "@/app/api/auth/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
 
export const { GET, POST } = toNextJsHandler(auth.handler);