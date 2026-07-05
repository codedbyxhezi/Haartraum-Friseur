import styles from "./Team.module.css";

const team = [
  {
    name: "Laura",
    role: "Color Expertin",
    text: "Spezialisiert auf Balayage, Strähnen und moderne Farbtechniken.",
  },
  {
    name: "Milan",
    role: "Master Stylist",
    text: "Perfekte Schnitte, Herrenservice und individuelle Beratung.",
  },
  {
    name: "Sofia",
    role: "Styling Expertin",
    text: "Elegantes Styling für Alltag, Events und besondere Anlässe.",
  },
];

function Team() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.kicker}>Unser Team</p>
        <h2>Stylisten mit Leidenschaft</h2>

        <div className={styles.grid}>
          {team.map((member) => (
            <article key={member.name} className={styles.card}>
              <div className={styles.avatar}>{member.name.charAt(0)}</div>
              <h3>{member.name}</h3>
              <span>{member.role}</span>
              <p>{member.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Team };
export default Team;