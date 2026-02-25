import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("session")?.value;

  // 1. Define Route Groups
  const isProtectedRoute =
    pathname.startsWith("/welcome") || pathname.startsWith("/onboarding");
  const isPublicOnlyRoute = pathname === "/" || pathname.startsWith("/auth");

  // 2. SHIELD: If NOT logged in and trying to access the app
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 3. REVERSE SHIELD: If IS logged in and trying to access landing/auth pages
  if (isPublicOnlyRoute && session) {
    return NextResponse.redirect(new URL("/welcome", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // We match everything EXCEPT static files and internal Next.js paths
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
