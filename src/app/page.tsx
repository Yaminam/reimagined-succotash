import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/sections/Hero";
import Reveal from "@/components/site/Reveal";
import { STATS } from "@/content/site";
import { BRAND_DETAILS } from "@/content/brands-detail";
import { PAGES } from "@/content/pages";
import { ARTICLES, formatDate } from "@/content/news";
import { CORPORATE_FAQS, WHAT_WE_STAND_FOR, INDIA_STORY } from "@/content/india";
import Faq from "@/components/site/Faq";
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

const VALUES = WHAT_WE_STAND_FOR.slice(0, 3);
const HERITAGE = INDIA_STORY;
const NEWS = ARTICLES.slice(0, 3);

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
              We build on one belief: that what we make is only as good as the moments it
              creates, and the trust we earn making it. In India, three principles hold the light together.
            </p>
          </Reveal>
          <ul className={styles.valueGrid}>
            {VALUES.map((v, i) => (
              <Reveal as="li" className={styles.value} key={v.title} delay={0.12 + i * 0.06}>
                <span className={styles.valueNo}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.valueName}>{v.title}</h3>
                <p className={styles.valueText}>{v.body}</p>
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
          <Reveal delay={0.08}>
            <p className={styles.familiesLede}>
              The portfolio spans every major category. The figure beside each family is the
              number of brands it holds.
            </p>
          </Reveal>
          <ul className={styles.familyGrid}>
            {CATEGORIES.map(([cat, n], i) => (
              <Reveal as="li" key={cat} delay={(i % 4) * 0.05}>
                <Link href="/brands" className={styles.family}>
                  <span className={styles.familyName}>{cat}</span>
                  <span className={styles.familyCount} aria-label={`${n} brands`}>
                    {n}<span className={styles.familyUnit}> brands</span>
                  </span>
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
              <Reveal as="li" key={b.slug} delay={(i % 3) * 0.06} className={styles.featCell}>
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
            <Reveal delay={0.05}><h2 className={`ll-display ${styles.homesTitle}`}>Part of a global house of brands.</h2></Reveal>
            <ul className={styles.homeRow}>
              {HOMES.map((b, i) => (
                <Reveal as="li" key={b.slug} delay={(i % 4) * 0.06}>
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
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.heritageTitle}`}>Lineage from 1805. Built in India since 1993.</h2></Reveal>
          <ol className={styles.timeline}>
            {HERITAGE.map((m, i) => (
              <Reveal as="li" className={styles.beat} key={m.year} delay={(i % 3) * 0.05}>
                <span className={styles.beatYear}>{m.year}</span>
                <span className={styles.beatRail} aria-hidden />
                <p className={styles.beatText}>{m.text}</p>
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
            {NEWS.map((a, i) => (
              <Reveal as="li" key={a.slug} delay={i * 0.05}>
                <Link href={`/news/${a.slug}`} className={styles.newsItem}>
                  <span className={styles.newsCat}>{a.category} · {formatDate(a.datePublished)}</span>
                  <span className={styles.newsTitle}>{a.title}</span>
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

      {/* Answer-ready FAQ — emits FAQPage schema for search & answer engines */}
      <Faq items={CORPORATE_FAQS} title="The questions we are asked most." eyebrow="Answers" index="10" />
    </>
  );
}
