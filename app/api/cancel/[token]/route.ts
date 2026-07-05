import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export async function POST(_request: Request, { params }: { params: { token: string } }) {
  const appointment = await prisma.appointment.findUnique({ where: { cancelToken: params.token } });
  if (!appointment) return NextResponse.json({ message: "Termin nicht gefunden." }, { status: 404 });

  await prisma.appointment.update({ where: { id: appointment.id }, data: { status: "cancelled" } });

  await sendEmail({
    to: appointment.email,
    subject: "Dein Termin wurde storniert",
    html: `<p>Dein Termin am ${appointment.date.toLocaleString("de-DE")} wurde storniert.</p>`,
  });

  if (process.env.OWNER_EMAIL) {
    await sendEmail({
      to: process.env.OWNER_EMAIL,
      subject: "Termin wurde storniert",
      html: `<p>${appointment.name} hat den Termin am ${appointment.date.toLocaleString("de-DE")} storniert.</p>`,
    });
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/booking?cancelled=true`);
}
