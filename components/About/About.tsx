import styles from "./About.module.css";

function About() {
  return (
    <section id="ueber-uns" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageBox}>
          <div className={styles.image} />
        </div>

        <div className={styles.content}>
          <p className={styles.kicker}>Über uns</p>
          <h2>Moderne Haarpflege mit Stil und Erfahrung</h2>
          <p>
            Bei Haartraum verbinden wir präzises Handwerk mit persönlicher
            Beratung. Ob klassischer Haarschnitt, moderne Farbe oder elegantes
            Styling — wir nehmen uns Zeit für deinen perfekten Look.
          </p>

          <div className={styles.stats}>
            <div>
              <strong>10+</strong>
              <span>Jahre Erfahrung</span>
            </div>
            <div>
              <strong>500+</strong>
              <span>Zufriedene Kunden</span>
            </div>
            <div>
              <strong>4.9</strong>
              <span>Bewertung</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { About };
export default About;