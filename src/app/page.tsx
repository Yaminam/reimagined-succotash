import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/sections/Hero";
import Reveal from "@/components/site/Reveal";
import { STATS } from "@/content/site";
import { BRAND_DETAILS } from "@/content/brands-detail";
import { PAGES } from "@/content/pages";
import styles from "./Home.module.css";

// Many brands share the same generic og:image hero — keep only the first of
// each distinct image so no card repeats.
const seenHero = new Set<string>();
const uniqueHero = BRAND_DETAILS.filter((b) => {
  if (!b.hero || seenHero.has(b.hero)) return false;
  seenHero.add(b.hero);
  return true;
});
const FEATURED = uniqueHero.slice(0, 6);
const HOMES = uniqueHero.slice(6, 10);

const CATEGORIES = (() => {
  const counts = new Map<string, number>();
  BRAND_DETAILS.forEach((b) => counts.set(b.category, (counts.get(b.category) || 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
})();

const VALUES: [string, string][] = [
  ["Heritage", "Two centuries of houses, each with a story worth keeping."],
  ["Craft", "Distillers, blenders and cellar masters who answer only to quality."],
  ["Conviviality", "We exist for the moments people share, responsibly, the world over."],
];

const HERITAGE: [string, string][] = [
  ["1805", "The House of Martell lays the first stone of a cognac dynasty."],
  ["1938", "Paul Ricard bottles the spirit of Marseille and conviviality is born."],
  ["1975", "Pernod and Ricard unite. A French house with global ambition."],
  ["2001", "The Seagram icons join the house, Chivas, Martell and The Glenlivet among them."],
  ["2022", "The first carbon neutral distillery. Heritage meets responsibility."],
];

const NEWS: [string, string][] = [
  ["Results", "Pernod Ricard reports its full-year performance"],
  ["Brands", "A new chapter for one of our single malts"],
  ["Sustainability", "Another distillery reaches carbon neutrality"],
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Manifesto */}
      <section className={`ll-section ${styles.manifesto}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>02</span> The house</p></Reveal>
          <Reveal delay={0.05}>
            <p className={`ll-display ${styles.statement}`}>
              We do not sell bottles. We hold moments up to the light,
              <span className={styles.muted}> and let the world see what craft makes of time.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
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

      {/* Conviviality / values */}
      <section className={`ll-section ${styles.values}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>03</span> Conviviality</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className={`ll-display ${styles.valuesTitle}`}>Créateurs de convivialité.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.valuesLede}>
              Since 1805 we have built a house on one belief: that what we make is only
              as good as the moments it creates. Three principles hold the light together.
            </p>
          </Reveal>
          <ul className={styles.valueGrid}>
            {VALUES.map(([t, d], i) => (
              <Reveal key={t} delay={0.12 + i * 0.06}>
                <li className={styles.value}>
                  <span className={styles.valueNo}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={styles.valueName}>{t}</h3>
                  <p className={styles.valueText}>{d}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Spirit families */}
      <section className={`ll-section ${styles.families}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>04</span> Spirit families</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.familiesTitle}`}>Every colour of the craft.</h2></Reveal>
          <ul className={styles.familyGrid}>
            {CATEGORIES.map(([cat, n], i) => (
              <Reveal key={cat} delay={(i % 4) * 0.05}>
                <Link href="/brands" className={styles.family}>
                  <span className={styles.familyName}>{cat}</span>
                  <span className={styles.familyCount}>{n}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured brands */}
      <section className={`ll-section ${styles.brands}`} id="brands-preview">
        <div className="ll-container">
          <div className={styles.brandsHead}>
            <Reveal><p className="ll-eyebrow"><span>05</span> The brands</p></Reveal>
            <Reveal delay={0.05}><h2 className={`ll-display ${styles.brandsTitle}`}>A spectrum of houses, each its own light.</h2></Reveal>
          </div>
          <ul className={styles.featured}>
            {FEATURED.map((b, i) => (
              <Reveal key={b.slug} delay={(i % 3) * 0.06} className={styles.featCell}>
                <Link href={`/brands/${b.slug}`} className={styles.feature}>
                  <Image className={styles.featImg} src={b.hero as string} alt={b.name} fill sizes="(max-width: 640px) 100vw, 33vw" />
                  <span className={styles.featShade} />
                  <span className={styles.featMeta}>
                    <span className={styles.featName}>{b.name}</span>
                    <span className={styles.featCat}>{b.category}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1}><Link href="/brands" className={styles.cta}>Explore all {BRAND_DETAILS.length}+ brands <span aria-hidden>→</span></Link></Reveal>
        </div>
      </section>

      {/* Brand homes */}
      {HOMES.length > 0 && (
        <section className={`ll-section ${styles.homes}`}>
          <div className="ll-container">
            <Reveal><p className="ll-eyebrow"><span>06</span> Brand homes</p></Reveal>
            <Reveal delay={0.05}><h2 className={`ll-display ${styles.homesTitle}`}>Forty doors onto the craft, around the world.</h2></Reveal>
            <ul className={styles.homeRow}>
              {HOMES.map((b, i) => (
                <Reveal key={b.slug} delay={(i % 4) * 0.06}>
                  <Link href={`/brands/${b.slug}`} className={styles.home}>
                    <Image className={styles.homeImg} src={b.hero as string} alt={b.name} fill sizes="(max-width: 640px) 80vw, 24vw" />
                    <span className={styles.homeShade} />
                    <span className={styles.homeName}>{b.name}</span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Heritage */}
      <section className={`ll-section ${styles.heritage}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>07</span> The light through time</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.heritageTitle}`}>Two centuries, one widening beam.</h2></Reveal>
          <ol className={styles.timeline}>
            {HERITAGE.map(([year, text], i) => (
              <Reveal key={year} delay={(i % 3) * 0.05}>
                <li className={styles.beat}>
                  <span className={styles.beatYear}>{year}</span>
                  <span className={styles.beatRail} aria-hidden />
                  <p className={styles.beatText}>{text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.1}><Link href="/group/our-history" className={styles.cta}>The full history <span aria-hidden>→</span></Link></Reveal>
        </div>
      </section>

      {/* Newsroom teaser */}
      <section className={`ll-section ${styles.news}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>08</span> From the newsroom</p></Reveal>
          <ul className={styles.newsList}>
            {NEWS.map(([cat, title], i) => (
              <Reveal key={i} delay={i * 0.05}>
                <Link href="/news" className={styles.newsItem}>
                  <span className={styles.newsCat}>{cat}</span>
                  <span className={styles.newsTitle}>{title}</span>
                  <span className={styles.newsArrow} aria-hidden>→</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Sustainability */}
      <section className={`ll-section ${styles.sustain}`}>
        <div className={`ll-container ${styles.sustainGrid}`}>
          <div className={styles.sustainText}>
            <Reveal><p className="ll-eyebrow"><span>09</span> Sustainability &amp; Responsibility</p></Reveal>
            <Reveal delay={0.05}><h2 className={`ll-display ${styles.sustainHeading}`}>Good times come from a good place.</h2></Reveal>
            <Reveal delay={0.1}>
              <p className={styles.sustainLede}>
                Our 2030 roadmap reshapes how spirits are made, from the soil to the
                served glass, across four commitments.
              </p>
            </Reveal>
            <Reveal delay={0.15}><Link href="/sustainability" className={styles.cta}>Our commitments <span aria-hidden>→</span></Link></Reveal>
          </div>
          {PAGES.sustainability?.hero && (
            <Reveal delay={0.1} className={styles.sustainMedia}>
              <figure className={styles.sustainFigure}>
                <span className={styles.sustainImg}>
                  <Image src={PAGES.sustainability.hero} alt="Pernod Ricard sustainability in practice" fill sizes="(max-width: 900px) 100vw, 45vw" />
                </span>
                <figcaption className={styles.sustainCap}>From terroir to distillery, made responsibly.</figcaption>
              </figure>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
