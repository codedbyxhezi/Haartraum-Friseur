import styles from "./ServiceCard.module.css";

type Props = { title: string; price: string; duration: string; description: string };

export function ServiceCard({ title, price, duration, description }: Props) {
  return (
    <article className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.meta}>
        <span>{duration}</span>
        <strong>{price}</strong>
      </div>
    </article>
  );
}
