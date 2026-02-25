import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/cart/:path*", "/profile/:path*"],
};
