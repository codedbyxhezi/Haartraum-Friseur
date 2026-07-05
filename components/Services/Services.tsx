import Link from "next/link";
import styles from "./Services.module.css";

const services = [
  {
    icon: "✂",
    title: "Damen Haarschnitt",
    description:
      "Individueller Schnitt mit Beratung, Waschen und professionellem Styling.",
    price: "ab 45 €",
    duration: "45 Min.",
  },
  {
    icon: "◒",
    title: "Farbe & Schnitt",
    description:
      "Hochwertige Coloration, Schnitt und Finish für einen frischen Look.",
    price: "ab 85 €",
    duration: "90 Min.",
  },
  {
    icon: "◇",
    title: "Balayage",
    description:
      "Weiche Farbverläufe, Glossing und natürlicher Luxus-Look.",
    price: "ab 120 €",
    duration: "120 Min.",
  },
  {
    icon: "◎",
    title: "Herrenservice",
    description:
      "Moderner Haarschnitt, Styling und gepflegter Look für Herren.",
    price: "ab 30 €",
    duration: "30 Min.",
  },
];

function Services() {
  return (
    <section id="leistungen" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.kicker}>Unsere Leistungen</p>
          <h2>Für deinen perfekten Look</h2>
          <p>
            Ob frischer Schnitt, moderne Farbe oder elegantes Styling — wir
            beraten dich persönlich und finden den Look, der zu dir passt.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <article key={service.title} className={styles.card}>
              <div className={styles.top}>
                <div className={styles.icon}>{service.icon}</div>

                <div className={styles.meta}>
                  <span>{service.duration}</span>
                  <strong>{service.price}</strong>
                </div>
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <Link href="/booking" className={styles.cardButton}>
                Termin buchen
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Services };
export default Services;