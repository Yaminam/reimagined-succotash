import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import { PAGES } from "@/content/pages";
import styles from "./sustainability.module.css";

const page = PAGES.sustainability;

export const metadata = {
  title: "Sustainability & Responsibility",
  description: page?.description?.slice(0, 160) || "Good times come from a good place: the Pernod Ricard 2030 sustainability roadmap.",
};

const PILLARS: { no: string; name: string; text: string }[] = [
  { no: "01", name: "Nurturing Terroir", text: "Protecting the ecosystems, water and biodiversity our craft depends on, with regenerative agriculture that gives back more than it takes." },
  { no: "02", name: "Valuing People", text: "Inclusive, safe and fair workplaces, and thriving communities, across more than seventy countries and 19,000 people." },
  { no: "03", name: "Circular Making", text: "Eco-designed packaging, reuse over waste, and distilleries on a clear path to carbon neutrality." },
  { no: "04", name: "Responsible Hosting", text: "Programmes worldwide that fight the misuse of alcohol and make moderation part of conviviality." },
];

// real photos from the extracted page — unique only, never the hero, no diagrams
const photos = [
  ...new Set(
    (page?.blocks ?? [])
      .filter((b): b is { t: "img"; v: string; alt: string } => b.t === "img")
      .map((b) => b.v),
  ),
]
  .filter((v) => v !== page?.hero)
  .filter((v) => !/framework|simplified|sdg|7-1|logo/i.test(v));

const TEXT_BLOCKS = (page?.blocks ?? []).filter((b) => b.t !== "img");

const STATS = page?.stats?.length
  ? page.stats
  : [
      { value: "2030", label: "Roadmap horizon" },
      { value: "100%", label: "Reusable, recyclable packaging goal" },
      { value: "Net zero", label: "Ambition across operations" },
    ];

export default function SustainabilityPage() {
  return (
    <article className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        {page?.hero ? (
          <Image className={styles.heroImg} src={page.hero} alt="Pernod Ricard sustainability" fill sizes="100vw" priority />
        ) : (
          <div className={styles.heroFallback} aria-hidden />
        )}
        <div className={styles.heroShade} />
        <div className={`ll-container ${styles.heroContent}`}>
          <Reveal><p className="ll-eyebrow"><span>03</span> Sustainability &amp; Responsibility</p></Reveal>
          <Reveal delay={0.05}><h1 className={`ll-display ${styles.title}`}>Good times come from a good place.</h1></Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lede}>
              {page?.description?.slice(0, 220) ||
                "Our 2030 roadmap reshapes how spirits are made, from the soil to the served glass, so the good times keep coming for generations."}
            </p>
          </Reveal>
        </div>
      </header>

      {/* Stats */}
      <section className={styles.statsBand}>
        <div className={`ll-container ${styles.statsRow}`}>
          {STATS.map((s, i) => (
            <Reveal key={`${s.label}-${i}`} delay={i * 0.06}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className={`ll-section ${styles.pillarsSec}`}>
        <div className="ll-container">
          <div className={styles.pillarsHead}>
            <Reveal><p className="ll-eyebrow"><span>·</span> The 2030 roadmap</p></Reveal>
            <Reveal delay={0.05}><h2 className={`ll-display ${styles.pillarsTitle}`}>Four commitments, one promise.</h2></Reveal>
          </div>
          <ul className={styles.pillars}>
            {PILLARS.map((p, i) => (
              <Reveal key={p.no} delay={(i % 2) * 0.06}>
                <li className={styles.pillar}>
                  <span className={styles.pillarMedia}>
                    {photos[i] ? (
                      <Image src={photos[i]} alt={p.name} fill sizes="(max-width: 760px) 100vw, 50vw" />
                    ) : (
                      <span className={styles.pillarFallback} aria-hidden />
                    )}
                    <span className={styles.pillarNo}>{p.no}</span>
                  </span>
                  <div className={styles.pillarBody}>
                    <h3 className={styles.pillarName}>{p.name}</h3>
                    <p className={styles.pillarText}>{p.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Extracted content from the sustainability pages */}
      {TEXT_BLOCKS.length > 0 && (
        <section className={`ll-section ${styles.contentSec}`}>
          <div className="ll-container">
            <Reveal><p className="ll-eyebrow"><span>·</span> In our own words</p></Reveal>
            <div className={styles.prose}>
              {TEXT_BLOCKS.map((b, i) => (
                <Reveal key={i} delay={(i % 3) * 0.04}>
                  {b.t === "h" ? (
                    <h2 className={b.level <= 2 ? styles.blockH2 : styles.blockH3}>{b.v}</h2>
                  ) : (
                    <p className={styles.para}>{b.v}</p>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Statement */}
      <section className={`ll-section ${styles.statementSec}`}>
        <div className="ll-container">
          <Reveal>
            <p className={`ll-display ${styles.statement}`}>
              We hold ourselves to the same standard as our craft: patient, precise,
              and made to last.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/group" className={styles.cta}>Discover our group <span aria-hidden>→</span></Link>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
