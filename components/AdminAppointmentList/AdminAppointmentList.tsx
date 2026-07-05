import styles from "./AdminAppointmentList.module.css";

type Appointment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: Date;
  status: string;
};

export default function AdminAppointmentList({ appointments }: { appointments: Appointment[] }) {
  return (
    <div className={styles.list}>
      {appointments.length === 0 && <p>Noch keine Termine.</p>}
      {appointments.map((a) => (
        <article className={styles.item} key={a.id}>
          <div>
            <strong>{a.date.toLocaleString("de-DE")}</strong>
            <h3>{a.service}</h3>
            <p>{a.name} · {a.email} · {a.phone}</p>
          </div>
          <span data-status={a.status}>{a.status}</span>
        </article>
      ))}
    </div>
  );
}
