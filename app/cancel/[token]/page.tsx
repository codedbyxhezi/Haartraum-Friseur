import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

type CancelPageProps = {
  params: Promise<{
    token: string;
  }>;
  searchParams?: Promise<{
    success?: string;
    error?: string;
  }>;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function CancelAppointmentPage({
  params,
  searchParams,
}: CancelPageProps) {
  const { token } = await params;
  const query = await searchParams;

  const appointment = await prisma.appointment.findUnique({
    where: {
      cancelToken: token,
    },
  });

  return (
    <>
      <Header />

      <main className={styles.main}>
        <section className={styles.card}>
          <p className={styles.kicker}>Termin stornieren</p>

          {!appointment ? (
            <>
              <h1>Termin nicht gefunden</h1>
              <p className={styles.text}>
                Dieser Stornierungslink ist ungültig oder der Termin wurde
                bereits gelöscht.
              </p>
            </>
          ) : query?.success === "1" ? (
            <>
              <h1>Termin wurde storniert</h1>
              <p className={styles.text}>
                Dein Termin wurde erfolgreich storniert.
              </p>

              <div className={styles.summary}>
                <div>
                  <span>Leistung</span>
                  <strong>{appointment.service}</strong>
                </div>

                <div>
                  <span>Friseur</span>
                  <strong>{appointment.stylist}</strong>
                </div>

                <div>
                  <span>Datum</span>
                  <strong>{formatDate(appointment.startsAt)}</strong>
                </div>

                <div>
                  <span>Uhrzeit</span>
                  <strong>
                    {formatTime(appointment.startsAt)} -{" "}
                    {formatTime(appointment.endsAt)} Uhr
                  </strong>
                </div>
              </div>
            </>
          ) : appointment.status === "CANCELLED" ? (
            <>
              <h1>Termin ist bereits storniert</h1>
              <p className={styles.text}>
                Dieser Termin wurde schon vorher storniert.
              </p>

              <div className={styles.summary}>
                <div>
                  <span>Leistung</span>
                  <strong>{appointment.service}</strong>
                </div>

                <div>
                  <span>Friseur</span>
                  <strong>{appointment.stylist}</strong>
                </div>

                <div>
                  <span>Datum</span>
                  <strong>{formatDate(appointment.startsAt)}</strong>
                </div>

                <div>
                  <span>Uhrzeit</span>
                  <strong>
                    {formatTime(appointment.startsAt)} -{" "}
                    {formatTime(appointment.endsAt)} Uhr
                  </strong>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1>Möchtest du deinen Termin stornieren?</h1>

              <p className={styles.text}>
                Bitte prüfe deine Termindaten. Wenn du den Termin stornierst,
                wird er im System als storniert markiert.
              </p>

              <div className={styles.summary}>
                <div>
                  <span>Name</span>
                  <strong>{appointment.name}</strong>
                </div>

                <div>
                  <span>Leistung</span>
                  <strong>{appointment.service}</strong>
                </div>

                <div>
                  <span>Friseur</span>
                  <strong>{appointment.stylist}</strong>
                </div>

                <div>
                  <span>Dauer</span>
                  <strong>{appointment.durationMinutes} Minuten</strong>
                </div>

                <div>
                  <span>Datum</span>
                  <strong>{formatDate(appointment.startsAt)}</strong>
                </div>

                <div>
                  <span>Uhrzeit</span>
                  <strong>
                    {formatTime(appointment.startsAt)} -{" "}
                    {formatTime(appointment.endsAt)} Uhr
                  </strong>
                </div>
              </div>

              {query?.error === "already-cancelled" && (
                <p className={styles.error}>
                  Dieser Termin wurde bereits storniert.
                </p>
              )}

              <form action="/api/cancel" method="post" className={styles.form}>
                <input type="hidden" name="token" value={token} />

                <button type="submit" className={styles.cancelButton}>
                  Termin jetzt stornieren
                </button>
              </form>
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}