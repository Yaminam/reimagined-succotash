import Reveal from "./Reveal";
import styles from "./PageIntro.module.css";

/** Shared inner-page header: index, title, lede, on a lit dark field. */
export default function PageIntro({
  index,
  eyebrow,
  title,
  lede,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className={styles.intro}>
      <div className="ll-container">
        <Reveal>
          <p className="ll-eyebrow">
            <span>{index}</span> {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className={`ll-display ${styles.title}`}>{title}</h1>
        </Reveal>
        {lede && (
          <Reveal delay={0.1}>
            <p className={styles.lede}>{lede}</p>
          </Reveal>
        )}
      </div>
      <div className={styles.glow} aria-hidden />
    </header>
  );
}
