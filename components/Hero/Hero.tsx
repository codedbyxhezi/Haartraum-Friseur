import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <p className={styles.kicker}>Willkommen bei Haartraum</p>

        <h1>
          Dein Stil. <br />
          Unser <span>Handwerk.</span>
        </h1>

        <p className={styles.text}>
          Individuelle Haarschnitte, Farbe und Styling — für deinen perfekten
          Look.
        </p>

        <div className={styles.actions}>
          <Link href="/booking" className={styles.primaryButton}>
            <span>▣</span>
            Jetzt Termin buchen
          </Link>

          <Link href="#leistungen" className={styles.secondaryButton}>
            <span>▷</span>
            Unser Salon entdecken
          </Link>
        </div>
      </div>
    </section>
  );
}