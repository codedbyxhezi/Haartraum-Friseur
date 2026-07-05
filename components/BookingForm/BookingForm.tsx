"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./BookingForm.module.css";

const services = [
  {
    value: "Damen Haarschnitt",
    label: "Damen Haarschnitt",
    price: "ab 45 €",
    duration: "45 Min.",
  },
  {
    value: "Herren Haarschnitt",
    label: "Herren Haarschnitt",
    price: "ab 30 €",
    duration: "30 Min.",
  },
  {
    value: "Farbe & Schnitt",
    label: "Farbe & Schnitt",
    price: "ab 85 €",
    duration: "90 Min.",
  },
  {
    value: "Balayage",
    label: "Balayage",
    price: "ab 120 €",
    duration: "120 Min.",
  },
  {
    value: "Styling",
    label: "Styling",
    price: "ab 25 €",
    duration: "30 Min.",
  },
];

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function BookingForm() {
  const [step, setStep] = useState(1);

  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingBookedTimes, setLoadingBookedTimes] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const selectedService = useMemo(() => {
    return services.find((item) => item.value === service);
  }, [service]);

  useEffect(() => {
    async function loadBookedTimes() {
      if (!date) {
        setBookedTimes([]);
        return;
      }

      setLoadingBookedTimes(true);

      try {
        const response = await fetch(`/api/appointments?date=${date}`);
        const data = await response.json();

        setBookedTimes(data.bookedTimes || []);
      } catch {
        setBookedTimes([]);
      } finally {
        setLoadingBookedTimes(false);
      }
    }

    loadBookedTimes();
  }, [date]);

  useEffect(() => {
    if (time && bookedTimes.includes(time)) {
      setTime("");
    }
  }, [bookedTimes, time]);

  function goNext() {
    setError("");
    setSuccess("");

    if (step === 1 && !service) {
      setError("Bitte wähle zuerst eine Leistung aus.");
      return;
    }

    if (step === 2 && (!date || !time)) {
      setError("Bitte wähle Datum und Uhrzeit aus.");
      return;
    }

    setStep((currentStep) => Math.min(currentStep + 1, 3));
  }

  function goBack() {
    setError("");
    setSuccess("");
    setStep((currentStep) => Math.max(currentStep - 1, 1));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccess("");
    setError("");

    if (!service || !date || !time || !name || !email || !phone) {
      setError("Bitte fülle alle Felder aus.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service,
          date,
          time,
          name,
          email,
          phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Der Termin konnte nicht gebucht werden.");
        setLoading(false);
        return;
      }

      setSuccess("Dein Termin wurde erfolgreich gebucht.");

      setService("");
      setDate("");
      setTime("");
      setName("");
      setEmail("");
      setPhone("");
      setBookedTimes([]);
      setStep(1);
    } catch {
      setError("Es ist ein Fehler passiert. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.kicker}>Online Terminbuchung</p>
          <h1>Termin buchen</h1>
          <p>In wenigen Schritten zu deinem Friseurtermin.</p>
        </div>

        <div className={styles.steps}>
          <button
            type="button"
            className={`${styles.stepItem} ${step >= 1 ? styles.active : ""}`}
          >
            <span>1</span>
            Leistung
          </button>

          <button
            type="button"
            className={`${styles.stepItem} ${step >= 2 ? styles.active : ""}`}
          >
            <span>2</span>
            Termin
          </button>

          <button
            type="button"
            className={`${styles.stepItem} ${step >= 3 ? styles.active : ""}`}
          >
            <span>3</span>
            Daten
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {step === 1 && (
            <div className={styles.stepContent}>
              <div className={styles.titleRow}>
                <div>
                  <h2>Leistung auswählen</h2>
                  <p>Wähle aus, was du buchen möchtest.</p>
                </div>
              </div>

              <div className={styles.serviceGrid}>
                {services.map((item) => (
                  <label
                    key={item.value}
                    className={`${styles.serviceCard} ${
                      service === item.value ? styles.serviceCardActive : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={item.value}
                      checked={service === item.value}
                      onChange={(event) => setService(event.target.value)}
                    />

                    <div>
                      <strong>{item.label}</strong>
                      <span>{item.duration}</span>
                    </div>

                    <em>{item.price}</em>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.stepContent}>
              <div className={styles.titleRow}>
                <div>
                  <h2>Datum & Uhrzeit</h2>
                  <p>Wähle deinen gewünschten Termin.</p>
                </div>
              </div>

              <div className={styles.dateTimeGrid}>
                <label className={styles.field}>
                  Datum
                  <input
                    type="date"
                    value={date}
                    min={getTodayDate()}
                    onChange={(event) => {
                      setDate(event.target.value);
                      setTime("");
                      setError("");
                    }}
                    required
                  />
                </label>

                <div className={styles.timeArea}>
                  <p>
                    Uhrzeit{" "}
                    {loadingBookedTimes && <small>wird geladen...</small>}
                  </p>

                  <div className={styles.timeGrid}>
                    {timeSlots.map((slot) => {
                      const isBooked = bookedTimes.includes(slot);

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isBooked || !date}
                          className={`${styles.timeButton} ${
                            time === slot ? styles.timeButtonActive : ""
                          } ${isBooked ? styles.timeButtonDisabled : ""}`}
                          onClick={() => {
                            if (!isBooked) {
                              setTime(slot);
                              setError("");
                            }
                          }}
                        >
                          {slot}
                          {isBooked && <small>Belegt</small>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.stepContent}>
              <div className={styles.titleRow}>
                <div>
                  <h2>Deine Daten</h2>
                  <p>Zum Abschluss brauchen wir deine Kontaktdaten.</p>
                </div>
              </div>

              <div className={styles.fieldsGrid}>
                <label className={styles.field}>
                  Name
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Max Mustermann"
                    required
                  />
                </label>

                <label className={styles.field}>
                  E-Mail
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="max@email.de"
                    required
                  />
                </label>

                <label className={styles.field}>
                  Telefon
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="01234 567890"
                    required
                  />
                </label>
              </div>

              <div className={styles.summary}>
                <div>
                  <span>Leistung</span>
                  <strong>{selectedService?.label}</strong>
                </div>

                <div>
                  <span>Preis</span>
                  <strong>{selectedService?.price}</strong>
                </div>

                <div>
                  <span>Termin</span>
                  <strong>
                    {date}, {time} Uhr
                  </strong>
                </div>
              </div>
            </div>
          )}

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <div className={styles.actions}>
            {step > 1 && (
              <button
                type="button"
                className={styles.backButton}
                onClick={goBack}
              >
                Zurück
              </button>
            )}

            {step < 3 && (
              <button
                type="button"
                className={styles.nextButton}
                onClick={goNext}
              >
                Weiter
              </button>
            )}

            {step === 3 && (
              <button
                type="submit"
                disabled={loading}
                className={styles.nextButton}
              >
                {loading ? "Wird gebucht..." : "Termin buchen"}
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export { BookingForm };
export default BookingForm;