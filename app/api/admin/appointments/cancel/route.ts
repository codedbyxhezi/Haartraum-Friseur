import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendCancellationEmails } from "@/lib/email";

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

  const appointment = await prisma.appointment.findUnique({
    where: {
      id,
    },
  });

  if (!appointment) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url), 303);
  }

  if (appointment.status !== "CANCELLED") {
    const cancelledAppointment = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        status: "CANCELLED",
      },
    });

    await sendCancellationEmails(cancelledAppointment);
  }

  return NextResponse.redirect(new URL("/admin/dashboard", request.url), 303);
}