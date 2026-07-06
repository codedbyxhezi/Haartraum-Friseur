import Link from "next/link";
import styles from "./Gallery.module.css";

const galleryItems = [
  {
    title: "Empfangsbereich",
    text: "Ein eleganter erster Eindruck mit warmem Licht und goldenen Details.",
    image: "/gallery-1.jpg",
    className: "large",
  },
  {
    title: "Styling Plätze",
    text: "Moderne Spiegelplätze für Beratung, Schnitt und Finish.",
    image: "/gallery-2.jpg",
    className: "topRight",
  },
  {
    title: "Salon Ambiente",
    text: "Luxuriöse Atmosphäre mit ruhigen Farben und hochwertigem Interior.",
    image: "/gallery-3.jpg",
    className: "bottomLeft",
  },
];

function Gallery() {
  return (
    <section id="galerie" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.kicker}>Galerie</p>
          <h2>Ein Blick in unseren Salon</h2>
          <p>
            Entdecke die Atmosphäre von Haartraum Friseur — elegant, modern und
            mit Liebe zum Detail gestaltet.
          </p>
        </div>

        <div className={styles.grid}>
          {galleryItems.map((item) => (
            <article
              key={item.title}
              className={`${styles.card} ${styles[item.className]}`}
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className={styles.cardContent}>
                <span>Haartraum Friseur</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}

          <article className={styles.infoCard}>
            <p className={styles.infoKicker}>Dein Moment</p>
            <h3>Schönheit beginnt mit einem guten Gefühl.</h3>
            <p>
              Von der Beratung bis zum Finish möchten wir, dass du dich
              wohlfühlst und den Salon mit einem Look verlässt, der zu dir
              passt.
            </p>

            <Link href="/booking" className={styles.button}>
              Termin buchen
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}

export { Gallery };
export default Gallery;