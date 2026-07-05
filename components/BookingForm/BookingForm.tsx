"use client";

import { useState } from "react";
import { TimeSlots } from "@/components/TimeSlots/TimeSlots";
import styles from "./BookingForm.module.css";

export function BookingForm() {
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const payload = {
      name: String(form.get("name")),
      email: String(form.get("email")),
      phone: String(form.get("phone")),
      service: String(form.get("service")),
      date: String(form.get("date")),
      time,
    };

    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setMessage(response.ok ? "Termin wurde angefragt. Bitte prüfe deine E-Mail." : "Leider gab es einen Fehler.");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>Name<input name="name" required placeholder="Max Müller" /></label>
      <label>E-Mail<input name="email" type="email" required placeholder="max@example.com" /></label>
      <label>Telefon<input name="phone" required placeholder="+49 ..." /></label>
      <label>Service
        <select name="service" required defaultValue="">
          <option value="" disabled>Bitte wählen</option>
          <option>Damen Haarschnitt</option>
          <option>Herren Haarschnitt</option>
          <option>Farbe & Schnitt</option>
          <option>Balayage</option>
        </select>
      </label>
      <label>Datum<input name="date" type="date" required /></label>
      <div>
        <span className={styles.label}>Uhrzeit</span>
        <TimeSlots selected={time} onSelect={setTime} />
      </div>
      <button className={styles.button} disabled={!time}>Termin buchen</button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
}
