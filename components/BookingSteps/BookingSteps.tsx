import Link from "next/link";
import styles from "./BookingSteps.module.css";

const steps = [
  {
    number: "01",
    title: "Leistung wählen",
    text: "Wähle deinen gewünschten Service aus — Haarschnitt, Farbe, Balayage oder Styling.",
  },
  {
    number: "02",
    title: "Termin auswählen",
    text: "Such dir ein freies Datum und eine passende Uhrzeit aus. Belegte Zeiten werden automatisch blockiert.",
  },
  {
    number: "03",
    title: "Daten eingeben",
    text: "Gib deine Kontaktdaten ein und bestätige deine Buchung direkt online.",
  },
];

function BookingSteps() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.kicker}>Online buchen</p>

          <h2>Dein Termin in wenigen Klicks</h2>

          <p className={styles.text}>
            Keine Anrufe, kein Warten. Buche deinen Friseurtermin einfach online
            und erhalte später automatisch deine Bestätigung.
          </p>

          <div className={styles.steps}>
            {steps.map((step) => (
              <article key={step.number} className={styles.step}>
                <span className={styles.number}>{step.number}</span>

                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.actions}>
            <Link href="/booking" className={styles.primaryButton}>
              Jetzt Termin buchen
            </Link>

            <Link href="#preise" className={styles.secondaryButton}>
              Preise ansehen
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.image} />

          <div className={styles.floatingCard}>
            <span>Heute verfügbar</span>
            <strong>09:00 - 17:00 Uhr</strong>
            <p>Online-Termine werden direkt im System gespeichert.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { BookingSteps };
export default BookingSteps;