import styles from "./Reviews.module.css";

const reviews = [
  {
    name: "Anna Müller",
    text: "Super Beratung und ein wunderschöner Schnitt. Ich habe mich direkt wohlgefühlt.",
    rating: "★★★★★",
  },
  {
    name: "Max Weber",
    text: "Sehr sauberer Salon, pünktliche Termine und professioneller Service.",
    rating: "★★★★★",
  },
  {
    name: "Sofia Kaya",
    text: "Meine Farbe ist genau so geworden, wie ich sie wollte. Absolute Empfehlung!",
    rating: "★★★★★",
  },
];

function Reviews() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.kicker}>Kundenstimmen</p>
        <h2>Was unsere Kunden sagen</h2>

        <div className={styles.grid}>
          {reviews.map((review) => (
            <article key={review.name} className={styles.card}>
              <div className={styles.rating}>{review.rating}</div>
              <p>“{review.text}”</p>
              <strong>{review.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Reviews };
export default Reviews;