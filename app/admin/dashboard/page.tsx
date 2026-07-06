import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

type AdminDashboardPageProps = {
  searchParams?: Promise<{
    q?: string;
    stylist?: string;
    status?: string;
    date?: string;
  }>;
};

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

function getDateRange(date?: string) {
  if (!date) {
    return undefined;
  }

  const start = new Date(`${date}T00:00:00`);
  const end = new Date(`${date}T23:59:59.999`);

  return {
    gte: start,
    lte: end,
  };
}

export default async function AdminDashboardPage({
  searchParams,
}: AdminDashboardPageProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    redirect("/admin/login");
  }

  const params = await searchParams;

  const q = params?.q?.trim() || "";
  const stylist = params?.stylist || "";
  const status = params?.status || "";
  const date = params?.date || "";

  const appointments = await prisma.appointment.findMany({
    where: {
      ...(stylist
        ? {
            stylist,
          }
        : {}),
      ...(status
        ? {
            status: status as "BOOKED" | "CANCELLED",
          }
        : {}),
      ...(date
        ? {
            startsAt: getDateRange(date),
          }
        : {}),
      ...(q
        ? {
            OR: [
              {
                name: {
                  contains: q,
                },
              },
              {
                email: {
                  contains: q,
                },
              },
              {
                phone: {
                  contains: q,
                },
              },
              {
                service: {
                  contains: q,
                },
              },
              {
                stylist: {
                  contains: q,
                },
              },
            ],
          }
        : {}),
    },
    orderBy: {
      startsAt: "asc",
    },
  });

  const allAppointments = await prisma.appointment.findMany({
    orderBy: {
      startsAt: "asc",
    },
  });

  const today = new Date();
  const todayString = today.toDateString();

  const todayAppointments = allAppointments.filter(
    (appointment) => appointment.startsAt.toDateString() === todayString
  );

  const bookedAppointments = allAppointments.filter(
    (appointment) => appointment.status === "BOOKED"
  );

  const cancelledAppointments = allAppointments.filter(
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
              Verwalte Buchungen, Friseure, Zeiten, Stornierungen und finde
              Termine schnell über Filter und Suche.
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
            <strong>{allAppointments.length}</strong>
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

          <form className={styles.filters}>
            <label>
              Suche
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Name, E-Mail, Telefon, Service..."
              />
            </label>

            <label>
              Friseur
              <select name="stylist" defaultValue={stylist}>
                <option value="">Alle</option>
                <option value="Laura">Laura</option>
                <option value="Milan">Milan</option>
                <option value="Sofia">Sofia</option>
              </select>
            </label>

            <label>
              Status
              <select name="status" defaultValue={status}>
                <option value="">Alle</option>
                <option value="BOOKED">Gebucht</option>
                <option value="CANCELLED">Storniert</option>
              </select>
            </label>

            <label>
              Datum
              <input type="date" name="date" defaultValue={date} />
            </label>

            <div className={styles.filterActions}>
              <button type="submit" className={styles.filterButton}>
                Filtern
              </button>

              <a href="/admin/dashboard" className={styles.resetButton}>
                Zurücksetzen
              </a>
            </div>
          </form>

          {appointments.length === 0 ? (
            <div className={styles.empty}>
              <h3>Keine Termine gefunden</h3>
              <p>Ändere deine Filter oder setze die Suche zurück.</p>
            </div>
          ) : (
            <>
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

              <div className={styles.mobileList}>
                {appointments.map((appointment) => (
                  <article key={appointment.id} className={styles.mobileCard}>
                    <div className={styles.mobileCardTop}>
                      <div>
                        <span className={styles.mobileDate}>
                          {formatDate(appointment.startsAt)}
                        </span>

                        <h3>{appointment.name}</h3>
                      </div>

                      <span
                        className={`${styles.status} ${
                          appointment.status === "CANCELLED"
                            ? styles.statusCancelled
                            : styles.statusBooked
                        }`}
                      >
                        {getStatusLabel(appointment.status)}
                      </span>
                    </div>

                    <div className={styles.mobileTime}>
                      {formatTime(appointment.startsAt)} -{" "}
                      {formatTime(appointment.endsAt)} Uhr
                    </div>

                    <div className={styles.mobileDetails}>
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
                        <strong>{appointment.durationMinutes} Min.</strong>
                      </div>

                      <div>
                        <span>Telefon</span>
                        <strong>{appointment.phone}</strong>
                      </div>

                      <div className={styles.mobileWide}>
                        <span>E-Mail</span>
                        <a href={`mailto:${appointment.email}`}>
                          {appointment.email}
                        </a>
                      </div>
                    </div>

                    <div className={styles.mobileActions}>
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

                        <button type="submit" className={styles.deleteButton}>
                          Löschen
                        </button>
                      </form>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}