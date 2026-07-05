"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import styles from "./page.module.css";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("admin@haartraum.de");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("E-Mail oder Passwort ist falsch.");
      return;
    }

    router.push("/admin/dashboard");
  }

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

          <form onSubmit={handleSubmit} className={styles.form}>
            <label>
              E-Mail
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@haartraum.de"
                required
              />
            </label>

            <label>
              Passwort
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Passwort"
                required
              />
            </label>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Einloggen..." : "Einloggen"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}