import Link from "next/link";
import styles from "./PriceList.module.css";

const prices = [
  {
    category: "Schnitt",
    items: [
      {
        title: "Damen Haarschnitt",
        description: "Waschen, Schneiden & Föhnen",
        price: "ab 45 €",
      },
      {
        title: "Herren Haarschnitt",
        description: "Waschen, Schneiden & Styling",
        price: "ab 30 €",
      },
      {
        title: "Kinder Haarschnitt",
        description: "Schnitt für Kinder bis 12 Jahre",
        price: "ab 20 €",
      },
    ],
  },
  {
    category: "Farbe",
    items: [
      {
        title: "Farbe & Schnitt",
        description: "Coloration, Schnitt & Finish",
        price: "ab 85 €",
      },
      {
        title: "Balayage",
        description: "Balayage, Glossing & Styling",
        price: "ab 120 €",
      },
      {
        title: "Glossing",
        description: "Frischer Glanz & Farbauffrischung",
        price: "ab 35 €",
      },
    ],
  },
  {
    category: "Styling",
    items: [
      {
        title: "Föhnen & Styling",
        description: "Professionelles Finish",
        price: "ab 25 €",
      },
      {
        title: "Event Styling",
        description: "Styling für besondere Anlässe",
        price: "ab 55 €",
      },
      {
        title: "Braut Styling",
        description: "Individuell nach Beratung",
        price: "auf Anfrage",
      },
    ],
  },
];

function PriceList() {
  return (
    <section id="preise" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.kicker}>Preise</p>
          <h2>Transparente Preise für deinen Look</h2>
          <p>
            Unsere Preise richten sich nach Aufwand, Haarlänge und gewünschtem
            Ergebnis. Bei Farb- und Spezialbehandlungen beraten wir dich gerne
            persönlich.
          </p>
        </div>

        <div className={styles.grid}>
          {prices.map((group) => (
            <article key={group.category} className={styles.card}>
              <div className={styles.cardHeader}>
                <span>{group.category}</span>
              </div>

              <div className={styles.list}>
                {group.items.map((item) => (
                  <div key={item.title} className={styles.row}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <strong>{item.price}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.note}>
          <div>
            <h3>Du bist unsicher, welche Leistung passt?</h3>
            <p>
              Buche einfach deinen Termin oder kontaktiere uns für eine kurze
              Beratung.
            </p>
          </div>

          <Link href="/booking" className={styles.button}>
            Termin buchen
          </Link>
        </div>
      </div>
    </section>
  );
}

export { PriceList };
export default PriceList;