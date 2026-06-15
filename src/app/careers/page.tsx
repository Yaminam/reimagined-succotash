import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import { PAGES } from "@/content/pages";
import styles from "./careers.module.css";

const page = PAGES.careers;
const photos = [
  ...new Set(
    (page?.blocks ?? [])
      .filter((b): b is { t: "img"; v: string; alt: string } => b.t === "img")
      .map((b) => b.v),
  ),
];
const hero = photos[0] ?? null;
const band = photos[1] ?? photos[0] ?? null;

export const metadata = {
  title: "Careers",
  description: page?.description?.slice(0, 160) || "Join 19,000 people who turn craft into connection across 70+ countries.",
};

const STATS = [
  { value: "19,000", label: "People" },
  { value: "70+", label: "Countries" },
  { value: "240+", label: "Brands to grow" },
];

const AREAS: { name: string; text: string }[] = [
  { name: "Marketing & Brand", text: "Build some of the world's most loved spirits brands across every market." },
  { name: "Operations & Supply", text: "From grain to glass: distilling, blending, bottling and global logistics." },
  { name: "Sales & Commercial", text: "Bring our brands to bars, shelves and tables across 160 markets." },
  { name: "Technology & Data", text: "Engineer the tools and the insight behind a modern spirits house." },
  { name: "Finance & Strategy", text: "Steward value and shape the long-term direction of the group." },
  { name: "People & Culture", text: "Grow and care for the 19,000 people who make conviviality real." },
];

export default function CareersPage() {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        {hero ? (
          <Image className={styles.heroImg} src={hero} alt="Working at Pernod Ricard" fill sizes="100vw" priority />
        ) : (
          <div className={styles.heroFallback} aria-hidden />
        )}
        <div className={styles.heroShade} />
        <div className={`ll-container ${styles.heroContent}`}>
          <Reveal><p className="ll-eyebrow"><span>06</span> Careers</p></Reveal>
          <Reveal delay={0.05}><h1 className={`ll-display ${styles.title}`}>Bring your light.</h1></Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lede}>
              {page?.description?.slice(0, 220) ||
                "Join 19,000 Créateurs de convivialité across more than seventy countries, and help turn two centuries of craft into the moments people share."}
            </p>
          </Reveal>
        </div>
      </header>

      <section className={styles.statsBand}>
        <div className={`ll-container ${styles.statsRow}`}>
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`ll-section ${styles.areasSec}`}>
        <div className="ll-container">
          <div className={styles.head}>
            <Reveal><p className="ll-eyebrow"><span>·</span> Where you could grow</p></Reveal>
            <Reveal delay={0.05}><h2 className={`ll-display ${styles.headTitle}`}>Find your place in the house.</h2></Reveal>
          </div>
          <ul className={styles.areas}>
            {AREAS.map((a, i) => {
              const img = photos[(i % Math.max(1, photos.length - 1)) + 1] ?? photos[0];
              return (
                <Reveal key={a.name} delay={(i % 3) * 0.05}>
                  <li className={styles.area}>
                    <span className={styles.areaMedia}>
                      {img ? <Image src={img} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /> : <span className={styles.areaFallback} aria-hidden />}
                    </span>
                    <div className={styles.areaBody}>
                      <h3 className={styles.areaName}>{a.name}</h3>
                      <p className={styles.areaText}>{a.text}</p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {band && (
        <section className={styles.bandSec}>
          <Image className={styles.bandImg} src={band} alt="Life at Pernod Ricard" fill sizes="100vw" />
          <span className={styles.bandShade} />
          <div className={`ll-container ${styles.bandInner}`}>
            <Reveal><p className={`ll-display ${styles.bandQuote}`}>Great spirits are made by great people.</p></Reveal>
            <Reveal delay={0.06}>
              <a href="#" className={styles.cta}>Explore opportunities <span aria-hidden>→</span></a>
            </Reveal>
          </div>
        </section>
      )}
    </article>
  );
}
