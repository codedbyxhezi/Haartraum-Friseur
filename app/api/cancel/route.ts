import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendCancellationEmails } from "@/lib/email";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const token = String(formData.get("token") || "");

  if (!token) {
    return NextResponse.redirect(
      new URL("/cancel/error?message=missing-token", request.url)
    );
  }

  const appointment = await prisma.appointment.findUnique({
    where: {
      cancelToken: token,
    },
  });

  if (!appointment) {
    return NextResponse.redirect(
      new URL(`/cancel/${token}?error=not-found`, request.url)
    );
  }

  if (appointment.status === "CANCELLED") {
    return NextResponse.redirect(
      new URL(`/cancel/${token}?error=already-cancelled`, request.url)
    );
  }

  const cancelledAppointment = await prisma.appointment.update({
    where: {
      cancelToken: token,
    },
    data: {
      status: "CANCELLED",
    },
  });

  await sendCancellationEmails(cancelledAppointment);

  return NextResponse.redirect(
    new URL(`/cancel/${token}?success=1`, request.url),
    {
      status: 303,
    }
  );
}