import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { blogPosts } from "../../data/blogPosts";
import Link from "next/link";
import styles from "./page.module.css";

export default function BlogPage() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Haartraum Blog</p>
          <h1>Tipps, Trends & Pflegewissen</h1>
          <p>
            Inspiration und einfache Tipps rund um Haarschnitt, Farbe, Styling
            und Pflege.
          </p>
        </section>

        <section className={styles.grid}>
          {blogPosts.map((post) => (
            <article key={post.slug} className={styles.card}>
              <span>{post.category}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>

              <div className={styles.meta}>
                <small>{post.date}</small>
                <small>{post.readTime}</small>
              </div>

              <Link href={`/blog/${post.slug}`}>Beitrag lesen</Link>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}