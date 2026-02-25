import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { idToken } = await req.json();

  if (!idToken) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }
  const cookieStore = await cookies();

  try {
    cookieStore.set("session", idToken, {
      httpOnly: true, // 🔐 Prevents XSS (Malicious scripts can't read this)
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Session set" });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "error setting Session ",
      error,
    });
  }
}
