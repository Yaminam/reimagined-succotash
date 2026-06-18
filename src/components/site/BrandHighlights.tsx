import Image from "next/image";
import Reveal from "./Reveal";
import { PORTFOLIO } from "@/content/pernod-portfolio";
import styles from "./BrandHighlights.module.css";

/**
 * "Brands in focus" band, added to every inner page so the portfolio is
 * present everywhere in a corporate frame. Logos are rendered as a consistent
 * ivory mark; we show name + category only (factual reference, no pricing,
 * ratings or consumption cues, per the surrogate-advertising rules).
 *
 * Reuses PORTFOLIO (no new data). Server component, no client JS beyond the
 * Reveal wrappers.
 */
const DEFAULT_NAMES = [
  "Chivas Regal",
  "The Glenlivet",
  "Ballantine's",
  "Jameson",
  "Absolut",
  "Beefeater",
  "Martell",
  "Mumm",
  "Havana Club",
  "Royal Salute",
  "Perrier-Jouët",
  "Redbreast",
  "Royal Stag",
  "Monkey 47",
];

export default function BrandHighlights({
  heading = "A house of brands, made and shared in India.",
  eyebrow = "Brands in focus",
  index = "·",
  names,
}: {
  heading?: string;
  eyebrow?: string;
  index?: string;
  names?: string[];
}) {
  const brands = (names ?? DEFAULT_NAMES)
    .map((n) => PORTFOLIO.find((b) => b.name === n))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  if (!brands.length) return null;

  return (
    <section className={`ll-section ${styles.wrap}`} aria-labelledby="brand-highlights-title">
      <div className="ll-container">
        <Reveal>
          <p className="ll-eyebrow">
            <span>{index}</span> {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="brand-highlights-title" className={`ll-display ${styles.title}`}>
            {heading}
          </h2>
        </Reveal>
        <ul className={styles.grid}>
          {brands.map((b, i) => (
            <Reveal as="li" key={b.name} delay={(i % 4) * 0.04} className={styles.cell}>
              <span className={styles.logoWrap}>
                <Image src={b.logo} alt={b.name} fill sizes="180px" className={styles.logo} />
              </span>
              <span className={styles.name}>{b.name}</span>
              <span className={styles.cat}>{b.category}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
