import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendBookingEmails } from "@/lib/email";

const serviceDurations: Record<string, number> = {
  "Damen Haarschnitt": 60,
  "Herren Haarschnitt": 30,
  "Kinder Haarschnitt": 30,
  "Farbe & Schnitt": 120,
  Balayage: 180,
  Glossing: 45,
  "Föhnen & Styling": 45,
  "Event Styling": 60,
  "Braut Styling": 120,
};

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

function getDuration(service: string) {
  return serviceDurations[service] || 30;
}

function createDateTime(date: string, time: string) {
  return new Date(`${date}T${time}:00`);
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function overlaps(
  newStart: Date,
  newEnd: Date,
  existingStart: Date,
  existingEnd: Date
) {
  return existingStart < newEnd && existingEnd > newStart;
}

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get("date");
    const service = request.nextUrl.searchParams.get("service") || "";
    const stylist = request.nextUrl.searchParams.get("stylist") || "Beliebig";

    if (!date) {
      return NextResponse.json({ bookedTimes: [], blockedTimes: [] });
    }

    const durationMinutes = getDuration(service);

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59.999`);

    const appointments = await prisma.appointment.findMany({
      where: {
        status: "BOOKED",
        stylist,
        startsAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        startsAt: true,
        endsAt: true,
      },
    });

    const blockedTimes = timeSlots.filter((slot) => {
      const slotStart = createDateTime(date, slot);
      const slotEnd = addMinutes(slotStart, durationMinutes);

      const closingTime = createDateTime(date, "18:00");

      if (slotEnd > closingTime) {
        return true;
      }

      return appointments.some((appointment) =>
        overlaps(slotStart, slotEnd, appointment.startsAt, appointment.endsAt)
      );
    });

    return NextResponse.json({
      bookedTimes: blockedTimes,
      blockedTimes,
    });
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
    const stylist = String(body.stylist || "Beliebig").trim();
    const date = String(body.date || "").trim();
    const time = String(body.time || "").trim();

    if (!name || !email || !phone || !service || !stylist || !date || !time) {
      return NextResponse.json(
        { message: "Bitte alle Felder ausfüllen." },
        { status: 400 }
      );
    }

    const durationMinutes = getDuration(service);
    const startsAt = createDateTime(date, time);
    const endsAt = addMinutes(startsAt, durationMinutes);

    if (Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime())) {
      return NextResponse.json(
        { message: "Ungültiges Datum oder ungültige Uhrzeit." },
        { status: 400 }
      );
    }

    const closingTime = createDateTime(date, "18:00");

    if (endsAt > closingTime) {
      return NextResponse.json(
        {
          message:
            "Diese Uhrzeit ist für die ausgewählte Leistung zu spät. Bitte wähle eine frühere Uhrzeit.",
        },
        { status: 409 }
      );
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        status: "BOOKED",
        stylist,
        startsAt: {
          lt: endsAt,
        },
        endsAt: {
          gt: startsAt,
        },
      },
    });

    if (existingAppointment) {
      return NextResponse.json(
        {
          message:
            "Dieser Zeitraum ist bei diesem Friseur leider schon vergeben.",
        },
        { status: 409 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        service,
        stylist,
        durationMinutes,
        startsAt,
        endsAt,
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