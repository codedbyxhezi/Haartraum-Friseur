import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import styles from "./page.module.css";

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;
  const hasError = params?.error === "1";

  return (
    <>
      <Header />

      <main className={styles.main}>
        <section className={styles.card}>
          <p className={styles.kicker}>Admin Bereich</p>

          <h1>Einloggen</h1>

          <p className={styles.text}>
            Melde dich an, um Termine, Buchungen und Stornierungen zu verwalten.
          </p>

          <form action="/api/admin/login" method="POST" className={styles.form}>
            <label>
              E-Mail
              <input
                type="email"
                name="email"
                defaultValue="admin@haartraum.de"
                placeholder="admin@haartraum.de"
                autoComplete="email"
                required
              />
            </label>

            <label>
              Passwort
              <input
                type="password"
                name="password"
                defaultValue="123456"
                placeholder="Passwort"
                autoComplete="current-password"
                required
              />
            </label>

            {hasError && (
              <p className={styles.error}>E-Mail oder Passwort ist falsch.</p>
            )}

            <button type="submit">Einloggen</button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}