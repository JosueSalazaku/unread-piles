import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Define allowed origins
  const allowedOrigins = ["http://localhost:3000", "https://your-production-domain.com"];
  const origin = req.headers.get("origin");

  // Check if the origin is allowed
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse("CORS Error: Origin not allowed", { status: 403 });
  }

  // Add CORS headers
  const response = new NextResponse(JSON.stringify({ message: "CORS enabled for GET" }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": origin ?? "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });

  return response;
}

// Handle OPTIONS request for preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
