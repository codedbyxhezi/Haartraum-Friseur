import Header from "../../components/Header/Header";
import { BookingForm } from "../../components/BookingForm/BookingForm";
import Footer from "../../components/Footer/Footer";

import styles from "./page.module.css";

export default function BookingPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}