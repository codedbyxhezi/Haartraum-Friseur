import styles from "./TimeSlots.module.css";

const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

type Props = { selected: string; onSelect: (slot: string) => void };

export function TimeSlots({ selected, onSelect }: Props) {
  return (
    <div className={styles.grid}>
      {slots.map((slot) => (
        <button
          key={slot}
          type="button"
          className={selected === slot ? styles.active : styles.slot}
          onClick={() => onSelect(slot)}
        >
          {slot}
        </button>
      ))}
    </div>
  );
}
