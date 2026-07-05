import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendCancellationEmails } from "@/lib/email";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  let token = "";

  if (contentType.includes("application/json")) {
    const body = await request.json();
    token = body.token;
  } else {
    const form = await request.formData();
    token = String(form.get("token") ?? "");
  }

  if (!token) return NextResponse.json({ error: "Token fehlt" }, { status: 400 });

  const appointment = await prisma.appointment.update({
    where: { cancelToken: token },
    data: { status: "CANCELLED" },
  });

  await sendCancellationEmails({
    name: appointment.name,
    email: appointment.email,
    service: appointment.service,
    startsAt: appointment.startsAt,
    cancelToken: appointment.cancelToken,
  });

  return NextResponse.json({ ok: true });
}
