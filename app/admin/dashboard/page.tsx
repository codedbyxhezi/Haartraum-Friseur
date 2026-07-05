import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { prisma } from "../../../lib/prisma";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "short",
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

function getStatusLabel(status: string) {
  if (status === "BOOKED") return "Gebucht";
  if (status === "CANCELLED") return "Storniert";
  return status;
}

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    redirect("/admin/login");
  }

  const appointments = await prisma.appointment.findMany({
    orderBy: {
      startsAt: "asc",
    },
  });

  const today = new Date();

  const todayAppointments = appointments.filter((appointment) => {
    const date = new Date(appointment.startsAt);

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  });

  const bookedAppointments = appointments.filter(
    (appointment) => appointment.status === "BOOKED"
  );

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "CANCELLED"
  );

  return (
    <>
      <Header />

      <main className={styles.main}>
        <div className={styles.top}>
          <div>
            <p className={styles.kicker}>Admin Dashboard</p>
            <h1>Termine verwalten</h1>
            <p className={styles.subtitle}>
              Hier siehst du alle gebuchten und stornierten Termine aus deiner
              MySQL-Datenbank.
            </p>
          </div>

          <form action="/api/admin/logout" method="post">
            <button className={styles.logoutButton}>Ausloggen</button>
          </form>
        </div>

        <section className={styles.statsGrid}>
          <article className={styles.statCard}>
            <span>Heute</span>
            <strong>{todayAppointments.length}</strong>
            <p>Termine heute</p>
          </article>

          <article className={styles.statCard}>
            <span>Gebucht</span>
            <strong>{bookedAppointments.length}</strong>
            <p>aktive Termine</p>
          </article>

          <article className={styles.statCard}>
            <span>Storniert</span>
            <strong>{cancelledAppointments.length}</strong>
            <p>abgesagte Termine</p>
          </article>
        </section>

        <section className={styles.appointments}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.kicker}>Alle Termine</p>
              <h2>Terminübersicht</h2>
            </div>

            <span>{appointments.length} Termine insgesamt</span>
          </div>

          {appointments.length === 0 ? (
            <div className={styles.empty}>
              <h3>Noch keine Termine</h3>
              <p>
                Sobald ein Kunde einen Termin bucht, erscheint er hier im
                Dashboard.
              </p>
            </div>
          ) : (
            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Datum</span>
                <span>Uhrzeit</span>
                <span>Kunde</span>
                <span>Service</span>
                <span>Kontakt</span>
                <span>Status</span>
                <span>Aktion</span>
              </div>

              {appointments.map((appointment) => (
                <div key={appointment.id} className={styles.row}>
                  <span>{formatDate(appointment.startsAt)}</span>
                  <strong>{formatTime(appointment.startsAt)}</strong>

                  <div>
                    <b>{appointment.name}</b>
                    <small>{appointment.email}</small>
                  </div>

                  <span>{appointment.service}</span>

                  <span>{appointment.phone}</span>

                  <em
                    className={
                      appointment.status === "CANCELLED"
                        ? styles.cancelled
                        : styles.booked
                    }
                  >
                    {getStatusLabel(appointment.status)}
                  </em>

                  <div className={styles.actions}>
                    {appointment.status !== "CANCELLED" && (
                      <form
                        action="/api/admin/appointments/cancel"
                        method="post"
                      >
                        <input type="hidden" name="id" value={appointment.id} />
                        <button className={styles.cancelButton}>
                          Stornieren
                        </button>
                      </form>
                    )}

                    <form action="/api/admin/appointments/delete" method="post">
                      <input type="hidden" name="id" value={appointment.id} />
                      <button className={styles.deleteButton}>Löschen</button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}