import Link from "next/link";
import styles from "./BookingSteps.module.css";

const steps = [
  {
    number: "1",
    title: "Leistung wählen",
    text: "Wähle deine gewünschte Leistung aus.",
  },
  {
    number: "2",
    title: "Datum & Uhrzeit",
    text: "Such dir einen passenden Termin aus.",
  },
  {
    number: "3",
    title: "Daten eingeben",
    text: "Gib deine Daten ein und bestätige deine Buchung.",
  },
];

export default function BookingSteps() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.kicker}>Online buchen</p>
          <h2>Dein Termin in 3 einfachen Schritten</h2>

          <div className={styles.steps}>
            {steps.map((step) => (
              <div key={step.number} className={styles.step}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/booking" className={styles.button}>
            <span>▣</span>
            Jetzt Termin buchen
          </Link>
        </div>

        <div className={styles.imageBox}>
          <div className={styles.image} />
        </div>
      </div>
    </section>
  );
}