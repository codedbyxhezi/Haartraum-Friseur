type SendEmailInput = {
  to: string;
  subject: string;
  html?: string;
  text?: string;
};

type AppointmentEmailData = {
  id?: string;
  name?: string;
  customerName?: string;
  email?: string;
  customerEmail?: string;
  phone?: string;
  service?: string;
  date?: Date | string;
  startsAt?: Date | string;
  time?: string;
  cancelToken?: string;
};

function getCustomerName(appointment: AppointmentEmailData) {
  return appointment.name || appointment.customerName || "Kunde";
}

function getCustomerEmail(appointment: AppointmentEmailData) {
  return appointment.email || appointment.customerEmail || "";
}

function getAppointmentDate(appointment: AppointmentEmailData) {
  return appointment.date || appointment.startsAt;
}

function formatDate(date?: Date | string) {
  if (!date) return "kein Datum angegeben";

  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (Number.isNaN(parsedDate.getTime())) {
    return String(date);
  }

  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
}

export async function sendEmail(
  toOrOptions: string | SendEmailInput,
  subject?: string,
  html?: string,
  text?: string
) {
  const email: SendEmailInput =
    typeof toOrOptions === "string"
      ? {
          to: toOrOptions,
          subject: subject ?? "",
          html,
          text,
        }
      : toOrOptions;

  console.log("E-Mail würde gesendet werden:");
  console.log("An:", email.to);
  console.log("Betreff:", email.subject);
  console.log("HTML:", email.html);
  console.log("Text:", email.text);

  return {
    success: true,
  };
}

export async function sendBookingEmails(appointment: AppointmentEmailData) {
  const customerName = getCustomerName(appointment);
  const customerEmail = getCustomerEmail(appointment);
  const ownerEmail = process.env.OWNER_EMAIL || process.env.ADMIN_EMAIL;

  const service = appointment.service || "Termin";
  const date = formatDate(getAppointmentDate(appointment));
  const phone = appointment.phone || "Keine Telefonnummer angegeben";

  const cancelUrl = appointment.cancelToken
    ? `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/cancel/${
        appointment.cancelToken
      }`
    : "";

  if (customerEmail) {
    await sendEmail({
      to: customerEmail,
      subject: "Deine Terminbestätigung bei Haartraum",
      html: `
        <h1>Termin bestätigt</h1>
        <p>Hallo ${customerName},</p>
        <p>dein Termin wurde erfolgreich gebucht.</p>

        <h2>Termindetails</h2>
        <p><strong>Leistung:</strong> ${service}</p>
        <p><strong>Datum:</strong> ${date}</p>

        ${
          cancelUrl
            ? `<p>Falls du den Termin stornieren möchtest, kannst du diesen Link verwenden:</p>
               <p><a href="${cancelUrl}">Termin stornieren</a></p>`
            : ""
        }

        <p>Viele Grüße<br />Haartraum Friseur</p>
      `,
      text: `Hallo ${customerName},

dein Termin wurde erfolgreich gebucht.

Leistung: ${service}
Datum: ${date}

${cancelUrl ? `Stornieren: ${cancelUrl}` : ""}

Viele Grüße
Haartraum Friseur`,
    });
  }

  if (ownerEmail) {
    await sendEmail({
      to: ownerEmail,
      subject: "Neue Terminbuchung",
      html: `
        <h1>Neue Terminbuchung</h1>

        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>E-Mail:</strong> ${customerEmail}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Leistung:</strong> ${service}</p>
        <p><strong>Datum:</strong> ${date}</p>
      `,
      text: `Neue Terminbuchung

Name: ${customerName}
E-Mail: ${customerEmail}
Telefon: ${phone}
Leistung: ${service}
Datum: ${date}`,
    });
  }

  return {
    success: true,
  };
}

export async function sendCancellationEmails(appointment: AppointmentEmailData) {
  const customerName = getCustomerName(appointment);
  const customerEmail = getCustomerEmail(appointment);
  const ownerEmail = process.env.OWNER_EMAIL || process.env.ADMIN_EMAIL;

  const service = appointment.service || "Termin";
  const date = formatDate(getAppointmentDate(appointment));

  if (customerEmail) {
    await sendEmail({
      to: customerEmail,
      subject: "Dein Termin wurde storniert",
      html: `
        <h1>Termin storniert</h1>
        <p>Hallo ${customerName},</p>
        <p>dein Termin wurde erfolgreich storniert.</p>

        <h2>Stornierter Termin</h2>
        <p><strong>Leistung:</strong> ${service}</p>
        <p><strong>Datum:</strong> ${date}</p>

        <p>Viele Grüße<br />Haartraum Friseur</p>
      `,
      text: `Hallo ${customerName},

dein Termin wurde erfolgreich storniert.

Leistung: ${service}
Datum: ${date}

Viele Grüße
Haartraum Friseur`,
    });
  }

  if (ownerEmail) {
    await sendEmail({
      to: ownerEmail,
      subject: "Termin wurde storniert",
      html: `
        <h1>Termin wurde storniert</h1>

        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>E-Mail:</strong> ${customerEmail}</p>
        <p><strong>Leistung:</strong> ${service}</p>
        <p><strong>Datum:</strong> ${date}</p>
      `,
      text: `Termin wurde storniert

Name: ${customerName}
E-Mail: ${customerEmail}
Leistung: ${service}
Datum: ${date}`,
    });
  }

  return {
    success: true,
  };
}