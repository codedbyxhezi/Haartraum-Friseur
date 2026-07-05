import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import styles from "./page.module.css";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <>
      <Header />

      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <p className={styles.kicker}>Admin Dashboard</p>
            <h1>Termine verwalten</h1>
          </div>

          <form action="/api/admin/logout" method="post">
            <button>Ausloggen</button>
          </form>
        </div>

        <section className={styles.grid}>
          <article className={styles.card}>
            <span>Heute</span>
            <strong>4</strong>
            <p>gebuchte Termine</p>
          </article>

          <article className={styles.card}>
            <span>Diese Woche</span>
            <strong>18</strong>
            <p>geplante Termine</p>
          </article>

          <article className={styles.card}>
            <span>Storniert</span>
            <strong>2</strong>
            <p>Stornierungen</p>
          </article>
        </section>

        <section className={styles.appointments}>
          <h2>Aktuelle Termine</h2>

          <div className={styles.table}>
            <div className={styles.row}>
              <strong>10:00</strong>
              <span>Anna Müller</span>
              <span>Damen Haarschnitt</span>
              <em>Gebucht</em>
            </div>

            <div className={styles.row}>
              <strong>11:30</strong>
              <span>Max Weber</span>
              <span>Herren Haarschnitt</span>
              <em>Gebucht</em>
            </div>

            <div className={styles.row}>
              <strong>14:00</strong>
              <span>Sofia Kaya</span>
              <span>Farbe & Schnitt</span>
              <em>Gebucht</em>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}