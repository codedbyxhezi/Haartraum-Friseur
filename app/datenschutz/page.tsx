import Link from "next/link";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./page.module.css";

export default function DatenschutzPage() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <section className={styles.card}>
          <p className={styles.kicker}>Rechtliches</p>
          <h1>Datenschutzerklärung</h1>

          <div className={styles.notice}>
            <strong>Demo-Hinweis:</strong> Diese Datenschutzerklärung ist eine
            einfache Vorlage für dein Demo-Projekt. Bitte vor echter Nutzung
            rechtlich prüfen und mit echten Kontaktdaten ergänzen.
          </div>

          <div className={styles.content}>
            <section>
              <h2>1. Verantwortlicher</h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Webseite ist:
                <br />
                Haartraum Friseur
                <br />
                Inhaber/in: Vorname Nachname
                <br />
                Musterstraße 12
                <br />
                12345 Musterstadt
                <br />
                E-Mail: info@haartraum-friseur.de
              </p>
            </section>

            <section>
              <h2>2. Allgemeine Hinweise</h2>
              <p>
                Der Schutz personenbezogener Daten ist uns wichtig. Wir
                verarbeiten personenbezogene Daten nur, soweit dies für die
                Bereitstellung der Webseite, die Terminbuchung und die
                Verwaltung von Anfragen erforderlich ist.
              </p>
            </section>

            <section>
              <h2>3. Terminbuchung</h2>
              <p>
                Wenn du über diese Webseite einen Termin buchst, verarbeiten wir
                die von dir eingegebenen Daten: Name, E-Mail-Adresse,
                Telefonnummer, gewünschte Leistung, ausgewählter Friseur sowie
                Datum und Uhrzeit des Termins.
              </p>
              <p>
                Diese Daten werden verwendet, um den Termin zu speichern, zu
                verwalten und bei Bedarf zu stornieren. Rechtsgrundlage ist die
                Durchführung vorvertraglicher Maßnahmen bzw. die
                Vertragserfüllung.
              </p>
            </section>

            <section>
              <h2>4. Stornierung von Terminen</h2>
              <p>
                Für jeden gebuchten Termin wird ein individueller
                Stornierungslink erstellt. Über diesen Link kann der Termin
                storniert werden. Der Link sollte nicht öffentlich geteilt
                werden.
              </p>
            </section>

            <section>
              <h2>5. Admin-Bereich</h2>
              <p>
                Für den geschützten Admin-Bereich wird ein technisch
                notwendiger Login-Cookie verwendet. Dieser Cookie dient nur
                dazu, die Anmeldung im Admin-Bereich zu ermöglichen. Es werden
                keine Tracking- oder Marketing-Cookies verwendet.
              </p>
            </section>

            <section>
              <h2>6. Hosting und Datenbank</h2>
              <p>
                Die Webseite wird über einen Hosting-Anbieter bereitgestellt.
                Für die Online-Demo wird eine externe MySQL-Datenbank verwendet.
                Dabei können technische Daten wie IP-Adresse, Zeitpunkt des
                Zugriffs und Server-Logs verarbeitet werden.
              </p>
            </section>

            <section>
              <h2>7. Keine Analyse- oder Marketingtools</h2>
              <p>
                Diese Demo-Webseite verwendet keine Google Analytics, keine Meta
                Pixel und keine Werbe- oder Trackingdienste.
              </p>
            </section>

            <section>
              <h2>8. Speicherdauer</h2>
              <p>
                Termindaten werden gespeichert, solange sie für die Verwaltung
                der Buchung erforderlich sind. Im Admin-Bereich können Termine
                storniert oder gelöscht werden.
              </p>
            </section>

            <section>
              <h2>9. Deine Rechte</h2>
              <p>
                Du hast im Rahmen der gesetzlichen Voraussetzungen Rechte auf
                Auskunft, Berichtigung, Löschung, Einschränkung der
                Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die
                Verarbeitung deiner personenbezogenen Daten.
              </p>
            </section>

            <section>
              <h2>10. Kontakt</h2>
              <p>
                Bei Fragen zum Datenschutz kannst du uns kontaktieren:
                <br />
                E-Mail: info@haartraum-friseur.de
              </p>
            </section>
          </div>

          <div className={styles.actions}>
            <Link href="/" className={styles.primaryButton}>
              Zur Startseite
            </Link>

            <Link href="/impressum" className={styles.secondaryButton}>
              Impressum ansehen
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}