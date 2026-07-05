"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollToTop.module.css";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 500);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      className={`${styles.button} ${isVisible ? styles.show : ""}`}
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
    >
      ↑
    </button>
  );
}

export { ScrollToTop };
export default ScrollToTop;