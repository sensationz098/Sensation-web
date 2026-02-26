"use server";

import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  const cookieStore = await cookies();
  const { country } = await req.json();
  try {
    cookieStore.set("country", country, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to set cookie", error);
    return Response.json({ success: false });
  }
};
