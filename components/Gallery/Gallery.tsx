import styles from "./Gallery.module.css";

function Gallery() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.kicker}>Unser Salon</p>
        <h2>Ein Ort zum Wohlfühlen</h2>

        <div className={styles.grid}>
          <div className={`${styles.image} ${styles.large}`} />
          <div className={styles.card}>
            <h3>Entspannte Atmosphäre</h3>
            <p>
              Dunkles Design, warme Beleuchtung und moderne Ausstattung sorgen
              für ein hochwertiges Salon-Erlebnis.
            </p>
          </div>
          <div className={styles.card}>
            <h3>Professionelle Beratung</h3>
            <p>
              Wir beraten dich individuell zu Schnitt, Farbe und Styling passend
              zu deinem Typ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Gallery };
export default Gallery;