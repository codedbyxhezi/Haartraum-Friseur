import { notFound } from "next/navigation";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { blogPosts } from "../../../data/blogPosts";
import styles from "./page.module.css";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className={styles.main}>
        <article className={styles.article}>
          <span className={styles.category}>{post.category}</span>

          <h1>{post.title}</h1>

          <div className={styles.meta}>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>

          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.content}>
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}