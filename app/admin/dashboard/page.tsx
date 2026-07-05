import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { prisma } from "@/lib/prisma";
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
  if (status === "CANCELLED") {
    return "Storniert";
  }

  return "Gebucht";
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
  const todayString = today.toDateString();

  const todayAppointments = appointments.filter(
    (appointment) => appointment.startsAt.toDateString() === todayString
  );

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
        <section className={styles.hero}>
          <div>
            <p className={styles.kicker}>Admin Dashboard</p>
            <h1>Terminverwaltung</h1>
            <p>
              Hier verwaltest du alle Buchungen, Friseure, Zeiten und
              Stornierungen.
            </p>
          </div>

          <form action="/api/admin/logout" method="post">
            <button className={styles.logoutButton} type="submit">
              Logout
            </button>
          </form>
        </section>

        <section className={styles.statsGrid}>
          <article className={styles.statCard}>
            <span>Alle Termine</span>
            <strong>{appointments.length}</strong>
          </article>

          <article className={styles.statCard}>
            <span>Heute</span>
            <strong>{todayAppointments.length}</strong>
          </article>

          <article className={styles.statCard}>
            <span>Gebucht</span>
            <strong>{bookedAppointments.length}</strong>
          </article>

          <article className={styles.statCard}>
            <span>Storniert</span>
            <strong>{cancelledAppointments.length}</strong>
          </article>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.kicker}>Buchungen</p>
              <h2>Alle Termine</h2>
            </div>

            <span>{appointments.length} Einträge</span>
          </div>

          {appointments.length === 0 ? (
            <div className={styles.empty}>
              <h3>Noch keine Termine</h3>
              <p>Sobald Kunden buchen, erscheinen die Termine hier.</p>
            </div>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Datum</th>
                    <th>Zeit</th>
                    <th>Kunde</th>
                    <th>Service</th>
                    <th>Friseur</th>
                    <th>Dauer</th>
                    <th>Kontakt</th>
                    <th>Status</th>
                    <th>Aktion</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>
                        <strong>{formatDate(appointment.startsAt)}</strong>
                      </td>

                      <td>
                        <div className={styles.timeBox}>
                          <strong>
                            {formatTime(appointment.startsAt)} -{" "}
                            {formatTime(appointment.endsAt)}
                          </strong>
                          <span>Uhr</span>
                        </div>
                      </td>

                      <td>
                        <div className={styles.customer}>
                          <strong>{appointment.name}</strong>
                          <span>{appointment.phone}</span>
                        </div>
                      </td>

                      <td>{appointment.service}</td>

                      <td>
                        <span className={styles.stylist}>
                          {appointment.stylist}
                        </span>
                      </td>

                      <td>{appointment.durationMinutes} Min.</td>

                      <td>
                        <a
                          className={styles.email}
                          href={`mailto:${appointment.email}`}
                        >
                          {appointment.email}
                        </a>
                      </td>

                      <td>
                        <span
                          className={`${styles.status} ${
                            appointment.status === "CANCELLED"
                              ? styles.statusCancelled
                              : styles.statusBooked
                          }`}
                        >
                          {getStatusLabel(appointment.status)}
                        </span>
                      </td>

                      <td>
                        <div className={styles.actions}>
                          {appointment.status !== "CANCELLED" && (
                            <form
                              action="/api/admin/appointments/cancel"
                              method="post"
                            >
                              <input
                                type="hidden"
                                name="id"
                                value={appointment.id}
                              />

                              <button
                                type="submit"
                                className={styles.cancelButton}
                              >
                                Stornieren
                              </button>
                            </form>
                          )}

                          <form
                            action="/api/admin/appointments/delete"
                            method="post"
                          >
                            <input
                              type="hidden"
                              name="id"
                              value={appointment.id}
                            />

                            <button
                              type="submit"
                              className={styles.deleteButton}
                            >
                              Löschen
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}