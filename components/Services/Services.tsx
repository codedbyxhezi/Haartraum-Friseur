import styles from "./Services.module.css";

const services = [
  {
    icon: "✂",
    title: "Haarschnitt",
    description: "Individueller Schnitt, perfekt auf dich abgestimmt.",
    price: "ab 35 €",
  },
  {
    icon: "◒",
    title: "Farbe & Strähnen",
    description: "Hochwertige Farben für ein strahlendes Ergebnis.",
    price: "ab 60 €",
  },
  {
    icon: "◌",
    title: "Styling",
    description: "Professionelles Styling für jeden Anlass.",
    price: "ab 25 €",
  },
  {
    icon: "◎",
    title: "Herrenservice",
    description: "Haarschnitt & Bartpflege für den modernen Mann.",
    price: "ab 30 €",
  },
];

export default function Services() {
  return (
    <section id="leistungen" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.kicker}>Unsere Leistungen</p>
        <h2>Für deinen perfekten Look</h2>

        <div className={styles.grid}>
          {services.map((service) => (
            <article key={service.title} className={styles.card}>
              <div className={styles.icon}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <strong>{service.price}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}