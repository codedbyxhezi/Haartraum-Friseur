import Link from "next/link";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./page.module.css";

export default function ImpressumPage() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <section className={styles.card}>
          <p className={styles.kicker}>Rechtliches</p>
          <h1>Impressum</h1>

          <div className={styles.notice}>
            <strong>Demo-Hinweis:</strong> Bitte ersetze die Platzhalter durch
            deine echten Angaben, bevor die Webseite produktiv genutzt wird.
          </div>

          <div className={styles.content}>
            <section>
              <h2>Angaben gemäß Anbieterkennzeichnung</h2>
              <p>
                Haartraum Friseur
                <br />
                Inhaber/in: Vorname Nachname
                <br />
                Musterstraße 12
                <br />
                12345 Musterstadt
                <br />
                Deutschland
              </p>
            </section>

            <section>
              <h2>Kontakt</h2>
              <p>
                Telefon: +49 123 456789
                <br />
                E-Mail: info@haartraum-friseur.de
              </p>
            </section>

            <section>
              <h2>Vertreten durch</h2>
              <p>Vorname Nachname</p>
            </section>

            <section>
              <h2>Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a
                Umsatzsteuergesetz:
                <br />
                DE123456789
              </p>
            </section>

            <section>
              <h2>Verantwortlich für den Inhalt</h2>
              <p>
                Vorname Nachname
                <br />
                Musterstraße 12
                <br />
                12345 Musterstadt
              </p>
            </section>

            <section>
              <h2>Haftung für Inhalte</h2>
              <p>
                Die Inhalte dieser Webseite wurden mit größter Sorgfalt
                erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
                der Inhalte übernehmen wir jedoch keine Gewähr.
              </p>
            </section>

            <section>
              <h2>Haftung für Links</h2>
              <p>
                Diese Webseite kann Links zu externen Webseiten enthalten. Auf
                deren Inhalte haben wir keinen Einfluss. Für fremde Inhalte ist
                stets der jeweilige Anbieter oder Betreiber verantwortlich.
              </p>
            </section>

            <section>
              <h2>Urheberrecht</h2>
              <p>
                Die auf dieser Webseite erstellten Inhalte und Werke unterliegen
                dem deutschen Urheberrecht. Eine Vervielfältigung, Bearbeitung
                oder Verbreitung außerhalb der Grenzen des Urheberrechts
                bedarf der schriftlichen Zustimmung des jeweiligen Autors.
              </p>
            </section>
          </div>

          <div className={styles.actions}>
            <Link href="/" className={styles.primaryButton}>
              Zur Startseite
            </Link>

            <Link href="/datenschutz" className={styles.secondaryButton}>
              Datenschutz ansehen
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}