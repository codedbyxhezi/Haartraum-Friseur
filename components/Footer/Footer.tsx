import Link from "next/link";
import styles from "./Footer.module.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="kontakt">
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              HAARTRAUM
              <span>Friseur</span>
            </Link>

            <p>
              Dein moderner Friseursalon für Schnitt, Farbe, Styling und
              persönliche Beratung in eleganter Atmosphäre.
            </p>

            <Link href="/booking" className={styles.bookingButton}>
              Termin buchen
            </Link>
          </div>

          <div className={styles.column}>
            <h3>Navigation</h3>

            <nav>
              <Link href="/">Home</Link>
              <Link href="/#leistungen">Leistungen</Link>
              <Link href="/#preise">Preise</Link>
              <Link href="/#galerie">Galerie</Link>
              <Link href="/blog">Blog</Link>
            </nav>
          </div>

          <div className={styles.column}>
            <h3>Leistungen</h3>

            <nav>
              <Link href="/booking">Damen Haarschnitt</Link>
              <Link href="/booking">Herren Haarschnitt</Link>
              <Link href="/booking">Farbe & Schnitt</Link>
              <Link href="/booking">Balayage</Link>
              <Link href="/booking">Styling</Link>
            </nav>
          </div>

          <div className={styles.column}>
            <h3>Kontakt</h3>

            <div className={styles.contactList}>
              <p>
                Musterstraße 12
                <br />
                12345 Musterstadt
              </p>

              <p>
                Tel: +49 123 456789
                <br />
                Mail: info@haartraum-friseur.de
              </p>

              <p>
                Mo - Sa: 09:00 - 18:00 Uhr
                <br />
                Sonntag geschlossen
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} Haartraum Friseur. Alle Rechte vorbehalten.</p>

          <div className={styles.legalLinks}>
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <Link href="/admin/login">Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
export default Footer;