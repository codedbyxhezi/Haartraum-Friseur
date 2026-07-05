import Link from "next/link";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer id="kontakt" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>✂</span>
            <span>
              <strong>HAARTRAUM</strong>
              <small>FRISEUR</small>
            </span>
          </Link>

          <p>
            Moderne Haarschnitte, Farbe und Styling in entspannter Atmosphäre.
            Buche deinen Termin einfach online.
          </p>

          <Link href="/booking" className={styles.bookingButton}>
            Termin buchen
          </Link>
        </div>

        <div className={styles.column}>
          <h3>Navigation</h3>
          <Link href="/">Home</Link>
          <Link href="#leistungen">Leistungen</Link>
          <Link href="#preise">Preise</Link>
          <Link href="#ueber-uns">Über uns</Link>
          <Link href="#kontakt">Kontakt</Link>
        </div>

        <div className={styles.column}>
          <h3>Leistungen</h3>
          <Link href="/booking">Damen Haarschnitt</Link>
          <Link href="/booking">Herren Haarschnitt</Link>
          <Link href="/booking">Farbe & Strähnen</Link>
          <Link href="/booking">Balayage</Link>
          <Link href="/booking">Styling</Link>
        </div>

        <div className={styles.column}>
          <h3>Kontakt</h3>

          <div className={styles.infoItem}>
            <span>⌖</span>
            <p>
              Hauptstraße 123
              <br />
              12345 Musterstadt
            </p>
          </div>

          <div className={styles.infoItem}>
            <span>☎</span>
            <p>01234 567890</p>
          </div>

          <div className={styles.infoItem}>
            <span>✉</span>
            <p>info@haartraum.de</p>
          </div>
        </div>

        <div className={styles.column}>
          <h3>Öffnungszeiten</h3>

          <div className={styles.hours}>
            <div>
              <span>Mo</span>
              <p>Geschlossen</p>
            </div>
            <div>
              <span>Di - Fr</span>
              <p>09:00 - 18:00</p>
            </div>
            <div>
              <span>Sa</span>
              <p>09:00 - 14:00</p>
            </div>
            <div>
              <span>So</span>
              <p>Geschlossen</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Haartraum Friseur. Alle Rechte vorbehalten.</p>

        <div>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/admin/login">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
export default Footer;