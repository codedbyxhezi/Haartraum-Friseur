import styles from "./FAQ.module.css";

const faqs = [
  {
    question: "Wie funktioniert die Online-Terminbuchung?",
    answer:
      "Du wählst eine Leistung, suchst dir Datum und Uhrzeit aus und gibst deine Kontaktdaten ein. Danach bekommst du eine Bestätigung per E-Mail.",
  },
  {
    question: "Kann ich meinen Termin stornieren?",
    answer:
      "Ja, in der Bestätigungsmail bekommst du später einen Stornierungslink. Darüber kannst du den Termin einfach absagen.",
  },
  {
    question: "Bekomme ich eine Terminbestätigung?",
    answer:
      "Ja, nach erfolgreicher Buchung erhältst du automatisch eine E-Mail mit allen Termindetails.",
  },
  {
    question: "Kann ich auch telefonisch buchen?",
    answer:
      "Ja, du kannst uns während der Öffnungszeiten telefonisch erreichen und deinen Termin direkt vereinbaren.",
  },
];

function FAQ() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.kicker}>Fragen & Antworten</p>
        <h2>Alles Wichtige auf einen Blick</h2>

        <div className={styles.list}>
          {faqs.map((faq) => (
            <article key={faq.question} className={styles.item}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export { FAQ };
export default FAQ;