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

const OPENING_TIME = "09:00";
const CLOSING_TIME = "18:00";
const BREAK_START = "13:00";
const BREAK_END = "14:00";

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

function isSunday(date: string) {
  const selectedDate = createDateTime(date, "12:00");
  return selectedDate.getDay() === 0;
}

function isPastTime(slotStart: Date) {
  const now = new Date();
  return slotStart <= now;
}

function overlapsBreak(date: string, slotStart: Date, slotEnd: Date) {
  const breakStart = createDateTime(date, BREAK_START);
  const breakEnd = createDateTime(date, BREAK_END);

  return overlaps(slotStart, slotEnd, breakStart, breakEnd);
}

function isBeforeOpening(date: string, slotStart: Date) {
  const openingTime = createDateTime(date, OPENING_TIME);
  return slotStart < openingTime;
}

function isAfterClosing(date: string, slotEnd: Date) {
  const closingTime = createDateTime(date, CLOSING_TIME);
  return slotEnd > closingTime;
}

function getBusinessRuleError(date: string, startsAt: Date, endsAt: Date) {
  if (isSunday(date)) {
    return "Sonntags ist der Salon geschlossen. Bitte wähle einen anderen Tag.";
  }

  if (isPastTime(startsAt)) {
    return "Diese Uhrzeit liegt bereits in der Vergangenheit. Bitte wähle eine spätere Uhrzeit.";
  }

  if (isBeforeOpening(date, startsAt)) {
    return "Der Salon öffnet erst um 09:00 Uhr.";
  }

  if (isAfterClosing(date, endsAt)) {
    return "Diese Uhrzeit ist für die ausgewählte Leistung zu spät. Bitte wähle eine frühere Uhrzeit.";
  }

  if (overlapsBreak(date, startsAt, endsAt)) {
    return "Diese Uhrzeit liegt in der Mittagspause. Bitte wähle eine andere Uhrzeit.";
  }

  return "";
}

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get("date");
    const service = request.nextUrl.searchParams.get("service") || "";
    const stylist = request.nextUrl.searchParams.get("stylist") || "Beliebig";

    if (!date) {
      return NextResponse.json({
        bookedTimes: [],
        blockedTimes: [],
        message: "",
      });
    }

    const durationMinutes = getDuration(service);

    if (isSunday(date)) {
      return NextResponse.json({
        bookedTimes: timeSlots,
        blockedTimes: timeSlots,
        message: "Sonntags ist der Salon geschlossen.",
      });
    }

    const startOfDay = createDateTime(date, "00:00");
    const endOfDay = createDateTime(date, "23:59");

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

      const blockedByBusinessRules = Boolean(
        getBusinessRuleError(date, slotStart, slotEnd)
      );

      if (blockedByBusinessRules) {
        return true;
      }

      return appointments.some((appointment) =>
        overlaps(slotStart, slotEnd, appointment.startsAt, appointment.endsAt)
      );
    });

    return NextResponse.json({
      bookedTimes: blockedTimes,
      blockedTimes,
      message: "",
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
    const stylist = String(body.stylist || "").trim();
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

    const businessRuleError = getBusinessRuleError(date, startsAt, endsAt);

    if (businessRuleError) {
      return NextResponse.json({ message: businessRuleError }, { status: 409 });
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