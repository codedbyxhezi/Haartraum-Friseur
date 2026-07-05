import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";
import { sendBookingEmails } from "@/lib/email";
import { bookingSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Daten" }, { status: 400 });
  }

  const { name, email, phone, service, date, time } = parsed.data;
  const startsAt = new Date(`${date}T${time}:00`);

  const existing = await prisma.appointment.findFirst({
    where: { startsAt, status: "BOOKED" },
  });

  if (existing) {
    return NextResponse.json({ error: "Dieser Termin ist bereits vergeben" }, { status: 409 });
  }

  const appointment = await prisma.appointment.create({
    data: {
      name,
      email,
      phone,
      service,
      startsAt,
      cancelToken: crypto.randomBytes(24).toString("hex"),
    },
  });

  await sendBookingEmails({
    name: appointment.name,
    email: appointment.email,
    service: appointment.service,
    startsAt: appointment.startsAt,
    cancelToken: appointment.cancelToken,
  });

  return NextResponse.json({ ok: true, appointmentId: appointment.id });
}
