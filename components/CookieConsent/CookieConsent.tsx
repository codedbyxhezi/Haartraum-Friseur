"use client";

import { useEffect, useState } from "react";
import styles from "./CookieConsent.module.css";

const COOKIE_NAME = "haartraum_cookie_consent";

function getCookie(name: string) {
  if (typeof document === "undefined") {
    return "";
  }

  const cookies = document.cookie.split("; ");

  const cookie = cookies.find((item) => item.startsWith(`${name}=`));

  return cookie?.split("=")[1] || "";
}

function setConsentCookie(value: "accepted" | "necessary") {
  const maxAge = 60 * 60 * 24 * 365;

  document.cookie = `${COOKIE_NAME}=${value}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [supportsNotifications, setSupportsNotifications] = useState(false);

  useEffect(() => {
    setSupportsNotifications("Notification" in window);

    const consent = getCookie(COOKIE_NAME);

    if (!consent) {
      const timer = window.setTimeout(() => {
        setVisible(true);
      }, 700);

      return () => window.clearTimeout(timer);
    }
  }, []);

  function acceptNecessary() {
    setConsentCookie("necessary");
    setVisible(false);
  }

  async function acceptAll() {
    setConsentCookie("accepted");
    setVisible(false);

    if (!("Notification" in window)) {
      return;
    }

    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        new Notification("Haartraum Friseur", {
          body: "Danke! Buchungs-Hinweise können jetzt angezeigt werden.",
          icon: "/android-chrome-192x192.png",
        });
      }

      return;
    }

    if (Notification.permission === "granted") {
      new Notification("Haartraum Friseur", {
        body: "Benachrichtigungen sind bereits aktiviert.",
        icon: "/android-chrome-192x192.png",
      });
    }
  }

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.icon}>✦</div>

        <div className={styles.content}>
          <p className={styles.kicker}>Datenschutz & Komfort</p>

          <h2>Cookies & Benachrichtigungen</h2>

          <p>
            Wir verwenden notwendige Cookies, damit die Webseite richtig
            funktioniert. Optional kannst du Benachrichtigungen für
            Buchungshinweise erlauben.
          </p>

          {supportsNotifications && (
            <span className={styles.note}>
              Benachrichtigungen kannst du später im Browser wieder deaktivieren.
            </span>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={acceptNecessary}
          >
            Nur notwendige
          </button>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={acceptAll}
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

export { CookieConsent };
export default CookieConsent;