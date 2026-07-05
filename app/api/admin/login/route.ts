import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  if (!adminEmail || !adminPassword) {
    return NextResponse.redirect(
      new URL("/admin/login?error=1", request.url),
      303
    );
  }

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.redirect(
      new URL("/admin/login?error=1", request.url),
      303
    );
  }

  const response = NextResponse.redirect(
    new URL("/admin/dashboard", request.url),
    303
  );

  response.cookies.set({
    name: "admin_session",
    value: "logged_in",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}