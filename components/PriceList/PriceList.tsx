import styles from "./PriceList.module.css";

const prices = [
  ["Damen Haarschnitt", "Waschen, Schneiden, Föhnen", "ab 45 €"],
  ["Herren Haarschnitt", "Waschen, Schneiden, Styling", "ab 30 €"],
  ["Farbe & Schnitt", "Farbe, Schnitt und Föhnen", "ab 85 €"],
  ["Balayage", "Balayage, Glossing, Schnitt", "ab 120 €"],
  ["Styling", "Glätten, Locken oder Event-Styling", "ab 25 €"],
];

function PriceList() {
  return (
    <section id="preise" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.kicker}>Preise</p>
        <h2>Unsere beliebtesten Leistungen</h2>

        <div className={styles.list}>
          {prices.map(([title, desc, price]) => (
            <div key={title} className={styles.row}>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <strong>{price}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { PriceList };
export default PriceList;