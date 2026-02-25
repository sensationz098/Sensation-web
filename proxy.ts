import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/welcome")) {
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/welcome/:path*", "/"],
};
