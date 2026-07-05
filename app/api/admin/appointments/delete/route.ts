import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const formData = await request.formData();
  const id = String(formData.get("id") || "");

  if (!id) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url), 303);
  }

  await prisma.appointment.delete({
    where: {
      id,
    },
  });

  return NextResponse.redirect(new URL("/admin/dashboard", request.url), 303);
}