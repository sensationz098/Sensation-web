import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("session")?.value;

  const isProtectedRoute =
    pathname.startsWith("/welcome") || pathname.startsWith("/onboarding");
  const isPublicOnlyRoute = pathname === "/" || pathname.startsWith("/auth");

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isPublicOnlyRoute && session) {
    return NextResponse.redirect(new URL("/welcome", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
