import Link from "next/link";
import { blogPosts } from "../../data/blogPosts";
import styles from "./BlogPreview.module.css";

function BlogPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={styles.kicker}>Blog</p>
            <h2>Tipps rund um Haare & Styling</h2>
          </div>

          <Link href="/blog" className={styles.allButton}>
            Alle Beiträge
          </Link>
        </div>

        <div className={styles.grid}>
          {blogPosts.slice(0, 3).map((post) => (
            <article key={post.slug} className={styles.card}>
              <span className={styles.category}>{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>

              <div className={styles.meta}>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>

              <Link href={`/blog/${post.slug}`} className={styles.link}>
                Weiterlesen
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export { BlogPreview };
export default BlogPreview;