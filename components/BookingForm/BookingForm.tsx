"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./BookingForm.module.css";

const services = [
  {
    title: "Damen Haarschnitt",
    duration: 60,
    price: "ab 45 €",
    description: "Waschen, Schneiden & Föhnen",
  },
  {
    title: "Herren Haarschnitt",
    duration: 30,
    price: "ab 30 €",
    description: "Waschen, Schneiden & Styling",
  },
  {
    title: "Kinder Haarschnitt",
    duration: 30,
    price: "ab 20 €",
    description: "Schnitt für Kinder bis 12 Jahre",
  },
  {
    title: "Farbe & Schnitt",
    duration: 120,
    price: "ab 85 €",
    description: "Coloration, Schnitt & Finish",
  },
  {
    title: "Balayage",
    duration: 180,
    price: "ab 120 €",
    description: "Balayage, Glossing & Styling",
  },
  {
    title: "Glossing",
    duration: 45,
    price: "ab 35 €",
    description: "Glanz & Farbauffrischung",
  },
  {
    title: "Föhnen & Styling",
    duration: 45,
    price: "ab 25 €",
    description: "Professionelles Finish",
  },
  {
    title: "Event Styling",
    duration: 60,
    price: "ab 55 €",
    description: "Styling für besondere Anlässe",
  },
  {
    title: "Braut Styling",
    duration: 120,
    price: "auf Anfrage",
    description: "Individuell nach Beratung",
  },
];

const stylists = [
  {
    name: "Laura",
    role: "Coloration & Balayage",
  },
  {
    name: "Milan",
    role: "Schnitt & Styling",
  },
  {
    name: "Sofia",
    role: "Damenservice & Events",
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

function getTodayValue() {
  return new Date().toISOString().split("T")[0];
}

export function BookingForm() {
  const [step, setStep] = useState(1);

  const [service, setService] = useState("");
  const [stylist, setStylist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingBookedTimes, setLoadingBookedTimes] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const selectedService = useMemo(() => {
    return services.find((item) => item.title === service);
  }, [service]);

  const canGoStepTwo = Boolean(service && stylist);
  const canGoStepThree = Boolean(date && time);
  const canSubmit = Boolean(
    name && email && phone && service && stylist && date && time
  );

  useEffect(() => {
    async function loadBookedTimes() {
      if (!date || !service || !stylist) {
        setBookedTimes([]);
        return;
      }

      try {
        setLoadingBookedTimes(true);

        const params = new URLSearchParams({
          date,
          service,
          stylist,
        });

        const response = await fetch(`/api/appointments?${params.toString()}`);
        const data = await response.json();

        const blockedTimes = data.blockedTimes || data.bookedTimes || [];

        setBookedTimes(blockedTimes);

        if (blockedTimes.includes(time)) {
          setTime("");
        }
      } catch (error) {
        console.error(error);
        setBookedTimes([]);
      } finally {
        setLoadingBookedTimes(false);
      }
    }

    loadBookedTimes();
  }, [date, service, stylist, time]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      setMessage("Bitte fülle alle Felder aus.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          stylist,
          date,
          time,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Termin konnte nicht gebucht werden.");
        return;
      }

      setMessage("Dein Termin wurde erfolgreich gebucht.");

      setStep(1);
      setService("");
      setStylist("");
      setDate("");
      setTime("");
      setName("");
      setEmail("");
      setPhone("");
      setBookedTimes([]);
    } catch (error) {
      console.error(error);
      setMessage("Termin konnte nicht gebucht werden.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.section}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.kicker}>Online Terminbuchung</p>
          <h1>Buche deinen Termin</h1>
          <p>
            Wähle deine Leistung, deinen Friseur und anschließend eine freie
            Uhrzeit.
          </p>
        </div>

        <div className={styles.progress}>
          <button
            type="button"
            className={`${styles.progressItem} ${
              step === 1 ? styles.progressItemActive : ""
            }`}
            onClick={() => setStep(1)}
          >
            <span>01</span>
            Leistung & Friseur
          </button>

          <button
            type="button"
            className={`${styles.progressItem} ${
              step === 2 ? styles.progressItemActive : ""
            }`}
            onClick={() => canGoStepTwo && setStep(2)}
            disabled={!canGoStepTwo}
          >
            <span>02</span>
            Datum & Uhrzeit
          </button>

          <button
            type="button"
            className={`${styles.progressItem} ${
              step === 3 ? styles.progressItemActive : ""
            }`}
            onClick={() => canGoStepThree && setStep(3)}
            disabled={!canGoStepThree}
          >
            <span>03</span>
            Deine Daten
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {step === 1 && (
            <section className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Leistung & Friseur auswählen</h2>
                  <p>
                    Die Dauer der Leistung wird automatisch bei freien Zeiten
                    berücksichtigt.
                  </p>
                </div>

                {selectedService && (
                  <div className={styles.selectedInfo}>
                    {selectedService.duration} Min.
                  </div>
                )}
              </div>

              <div className={styles.stepOneGrid}>
                <div>
                  <div className={styles.serviceGrid}>
                    {services.map((item) => (
                      <button
                        key={item.title}
                        type="button"
                        className={`${styles.optionCard} ${
                          service === item.title
                            ? styles.optionCardActive
                            : ""
                        }`}
                        onClick={() => {
                          setService(item.title);
                          setTime("");
                          setMessage("");
                        }}
                      >
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>

                        <div className={styles.optionMeta}>
                          <span>{item.duration} Min.</span>
                          <strong>{item.price}</strong>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <aside className={styles.stylistPanel}>
                  <h2 className={styles.stylistPanelTitle}>
                    Friseur auswählen
                  </h2>

                  <p className={styles.stylistPanelText}>
                    Wähle aus, bei wem du deinen Termin buchen möchtest.
                  </p>

                  <div className={styles.stylistGrid}>
                    {stylists.map((item) => (
                      <button
                        key={item.name}
                        type="button"
                        className={`${styles.stylistCard} ${
                          stylist === item.name
                            ? styles.optionCardActive
                            : ""
                        }`}
                        onClick={() => {
                          setStylist(item.name);
                          setTime("");
                          setMessage("");
                        }}
                      >
                        <span>{item.name.charAt(0)}</span>

                        <div>
                          <h3>{item.name}</h3>
                          <p>{item.role}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </aside>
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.primaryButton}
                  disabled={!canGoStepTwo}
                  onClick={() => setStep(2)}
                >
                  Weiter
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Datum & Uhrzeit</h2>
                  <p>
                    Gebucht wird bei {stylist} für {selectedService?.duration}{" "}
                    Minuten.
                  </p>
                </div>

                <div className={styles.selectedInfo}>
                  {selectedService?.title}
                </div>
              </div>

              <div className={styles.dateTimeGrid}>
                <label className={styles.dateBox}>
                  Datum auswählen
                  <input
                    type="date"
                    value={date}
                    min={getTodayValue()}
                    onChange={(event) => {
                      setDate(event.target.value);
                      setTime("");
                      setMessage("");
                    }}
                    required
                  />
                </label>

                <div className={styles.timeArea}>
                  <div className={styles.timeTop}>
                    <h3>Freie Uhrzeiten</h3>
                    {loadingBookedTimes && <small>Lade Zeiten...</small>}
                  </div>

                  <div className={styles.timeGrid}>
                    {timeSlots.map((slot) => {
                      const isBlocked = bookedTimes.includes(slot);

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={!date || isBlocked}
                          className={`${styles.timeButton} ${
                            time === slot ? styles.timeButtonActive : ""
                          } ${isBlocked ? styles.timeButtonDisabled : ""}`}
                          onClick={() => {
                            setTime(slot);
                            setMessage("");
                          }}
                        >
                          {slot}
                          {isBlocked && <small>Belegt</small>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => setStep(1)}
                >
                  Zurück
                </button>

                <button
                  type="button"
                  className={styles.primaryButton}
                  disabled={!canGoStepThree}
                  onClick={() => setStep(3)}
                >
                  Weiter
                </button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Deine Daten</h2>
                  <p>Prüfe deinen Termin und bestätige die Buchung.</p>
                </div>
              </div>

              <div className={styles.summary}>
                <div>
                  <span>Leistung</span>
                  <strong>{service}</strong>
                </div>

                <div>
                  <span>Friseur</span>
                  <strong>{stylist}</strong>
                </div>

                <div>
                  <span>Dauer</span>
                  <strong>{selectedService?.duration} Minuten</strong>
                </div>

                <div>
                  <span>Termin</span>
                  <strong>
                    {date} um {time} Uhr
                  </strong>
                </div>
              </div>

              <div className={styles.fieldsGrid}>
                <label>
                  Name
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setMessage("");
                    }}
                    placeholder="Dein Name"
                    required
                  />
                </label>

                <label>
                  E-Mail
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setMessage("");
                    }}
                    placeholder="deine@email.de"
                    required
                  />
                </label>

                <label>
                  Telefon
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                      setMessage("");
                    }}
                    placeholder="+49 ..."
                    required
                  />
                </label>
              </div>

              {message && <p className={styles.message}>{message}</p>}

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => setStep(2)}
                >
                  Zurück
                </button>

                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={!canSubmit || loading}
                >
                  {loading ? "Wird gebucht..." : "Termin buchen"}
                </button>
              </div>
            </section>
          )}
        </form>
      </div>
    </main>
  );
}

export default BookingForm;