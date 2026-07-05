import { Resend } from "resend";

type BookingEmailData = {
  name: string;
  email: string;
  service: string;
  startsAt: Date;
  cancelToken: string;
};

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ownerEmail = process.env.OWNER_EMAIL ?? "besitzer@example.com";
const fromEmail = process.env.FROM_EMAIL ?? "Friseur Booking <onboarding@resend.dev>";

export async function sendBookingEmails(data: BookingEmailData) {
  const cancelUrl = `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/cancel/${data.cancelToken}`;
  const date = data.startsAt.toLocaleString("de-DE");

  const customerText = `Hallo ${data.name}, dein Termin für ${data.service} am ${date} wurde bestätigt. Stornieren: ${cancelUrl}`;
  const ownerText = `Neuer Termin: ${data.name}, ${data.email}, ${data.service}, ${date}`;

  if (!resend) {
    console.log("Kunden-E-Mail:", customerText);
    console.log("Besitzer-E-Mail:", ownerText);
    return;
  }

  await Promise.all([
    resend.emails.send({ from: fromEmail, to: data.email, subject: "Deine Terminbestätigung", text: customerText }),
    resend.emails.send({ from: fromEmail, to: ownerEmail, subject: "Neuer Friseurtermin", text: ownerText }),
  ]);
}

export async function sendCancellationEmails(data: BookingEmailData) {
  const date = data.startsAt.toLocaleString("de-DE");
  const customerText = `Hallo ${data.name}, dein Termin am ${date} wurde storniert.`;
  const ownerText = `Termin storniert: ${data.name}, ${data.email}, ${data.service}, ${date}`;

  if (!resend) {
    console.log("Kunden-Storno-E-Mail:", customerText);
    console.log("Besitzer-Storno-E-Mail:", ownerText);
    return;
  }

  await Promise.all([
    resend.emails.send({ from: fromEmail, to: data.email, subject: "Dein Termin wurde storniert", text: customerText }),
    resend.emails.send({ from: fromEmail, to: ownerEmail, subject: "Termin wurde storniert", text: ownerText }),
  ]);
}
