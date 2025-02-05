import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl.pathname;

    // 🔥 Bypass Next.js for _next/ requests
    if (url.startsWith("/_next")) {
        return NextResponse.next(); // Let Next.js serve the static files directly
    }

    return NextResponse.rewrite(new URL(req.url));
}

// Apply middleware to ALL routes
export const config = {
    matcher: "/:path*",
};
