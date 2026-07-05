import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendBookingEmails } from "@/lib/email";

function formatTime(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get("date");

    if (!date) {
      return NextResponse.json({ bookedTimes: [] });
    }

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59.999`);

    const appointments = await prisma.appointment.findMany({
      where: {
        status: "BOOKED",
        startsAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        startsAt: true,
      },
    });

    const bookedTimes = appointments.map((appointment) =>
      formatTime(appointment.startsAt)
    );

    return NextResponse.json({ bookedTimes });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Belegte Uhrzeiten konnten nicht geladen werden." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const service = String(body.service || "").trim();
    const date = String(body.date || "").trim();
    const time = String(body.time || "").trim();

    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { message: "Bitte alle Felder ausfüllen." },
        { status: 400 }
      );
    }

    const startsAt = new Date(`${date}T${time}:00`);

    if (Number.isNaN(startsAt.getTime())) {
      return NextResponse.json(
        { message: "Ungültiges Datum oder ungültige Uhrzeit." },
        { status: 400 }
      );
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        startsAt,
        status: "BOOKED",
      },
    });

    if (existingAppointment) {
      return NextResponse.json(
        { message: "Dieser Termin ist leider schon vergeben." },
        { status: 409 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        service,
        startsAt,
        cancelToken: randomUUID(),
      },
    });

    await sendBookingEmails({
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      service: appointment.service,
      startsAt: appointment.startsAt,
      cancelToken: appointment.cancelToken,
    });

    return NextResponse.json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Termin konnte nicht gebucht werden." },
      { status: 500 }
    );
  }
}