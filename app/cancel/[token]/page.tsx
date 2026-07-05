import styles from "./page.module.css";

type Props = { params: Promise<{ token: string }> };

export default async function CancelPage({ params }: Props) {
  const { token } = await params;

  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <h1>Termin stornieren</h1>
        <p>Storno-Token:</p>
        <code>{token}</code>
        <form action="/api/cancel" method="POST">
          <input type="hidden" name="token" value={token} />
          <button>Termin stornieren</button>
        </form>
      </section>
    </main>
  );
}
