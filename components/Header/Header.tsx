"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} onClick={closeMenu}>
        <span className={styles.logoIcon}>✂</span>
        <span>
          <strong>HAARTRAUM</strong>
          <small>FRISEUR</small>
        </span>
      </Link>

      <nav className={styles.desktopNav}>
        <Link href="/">Home</Link>
        <Link href="/#leistungen">Leistungen</Link>
        <Link href="/#preise">Preise</Link>
        <Link href="/#ueber-uns">Über uns</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/#kontakt">Kontakt</Link>
      </nav>

      <div className={styles.desktopActions}>
        <Link href="/admin/login" className={styles.loginButton}>
          Login
        </Link>

        <Link href="/booking" className={styles.bookingButton}>
          <span>▣</span>
          Termin buchen
        </Link>
      </div>

      <button
        className={styles.burger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menü öffnen"
      >
        <span className={isOpen ? styles.lineOneActive : ""}></span>
        <span className={isOpen ? styles.lineTwoActive : ""}></span>
        <span className={isOpen ? styles.lineThreeActive : ""}></span>
      </button>

      <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}>
        <nav className={styles.mobileNav}>
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/#leistungen" onClick={closeMenu}>Leistungen</Link>
          <Link href="/#preise" onClick={closeMenu}>Preise</Link>
          <Link href="/#ueber-uns" onClick={closeMenu}>Über uns</Link>
          <Link href="/blog" onClick={closeMenu}>Blog</Link>
          <Link href="/#kontakt" onClick={closeMenu}>Kontakt</Link>
        </nav>

        <div className={styles.mobileActions}>
          <Link href="/admin/login" className={styles.mobileLoginButton} onClick={closeMenu}>
            Login
          </Link>

          <Link href="/booking" className={styles.mobileBookingButton} onClick={closeMenu}>
            Termin buchen
          </Link>
        </div>
      </div>
    </header>
  );
}

export { Header };
export default Header;