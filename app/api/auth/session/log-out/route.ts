// app/api/auth/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  try {
    // Delete the cookie by setting maxAge to 0
    cookieStore.set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Immediately expires the cookie
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error clearing session" },
      { status: 500 },
    );
  }
}
