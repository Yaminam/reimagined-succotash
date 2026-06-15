import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import { PAGES } from "@/content/pages";
import { DOCUMENTS } from "@/content/documents";
import { BRAND_BY_SLUG } from "@/content/brands-detail";
import ReportCard from "@/components/site/ReportCard";
import styles from "./investors.module.css";

const page = PAGES.investors;
const bandImg =
  BRAND_BY_SLUG["martell"]?.hero ?? BRAND_BY_SLUG["mumm"]?.hero ?? BRAND_BY_SLUG["midleton-very-rare"]?.hero ?? null;

export const metadata = {
  title: "Investors",
  description: "Results, reports, the AGM and the long-term strategy behind the world's number one in premium international spirits.",
};

const STATS = page?.stats?.length
  ? page.stats
  : [
      { value: "#1", label: "In premium international spirits" },
      { value: "240+", label: "Premium brands" },
      { value: "160", label: "Markets" },
      { value: "1805", label: "Heritage since" },
    ];

const BLOCKS = page?.blocks ?? [];

const ESSENTIALS = [
  "Full-year & half-year results",
  "Annual General Meeting",
  "Financial calendar",
  "Share price & dividend",
  "Strategy & outlook",
  "Governance",
];

export default function InvestorsPage() {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        {page?.hero ? (
          <Image className={styles.heroImg} src={page.hero} alt="Pernod Ricard investors" fill sizes="100vw" priority />
        ) : (
          <div className={styles.heroFallback} aria-hidden />
        )}
        <div className={styles.heroShade} />
        <div className={`ll-container ${styles.heroContent}`}>
          <Reveal><p className="ll-eyebrow"><span>04</span> Investors</p></Reveal>
          <Reveal delay={0.05}><h1 className={`ll-display ${styles.title}`}>Value, created with patience.</h1></Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lede}>
              {page?.description?.slice(0, 200) ||
                "Results, reports and the long-term strategy of the world's leading premium international spirits and wine house."}
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

      {/* Extracted content from the investor pages */}
      {BLOCKS.length > 0 && (
        <section className={`ll-section ${styles.strategySec}`}>
          <div className="ll-container">
            <Reveal><p className="ll-eyebrow"><span>·</span> From the investor pages</p></Reveal>
            <div className={styles.prose}>
              {BLOCKS.map((b, i) => (
                <Reveal key={i} delay={(i % 3) * 0.04}>
                  {b.t === "img" ? (
                    <span className={styles.figure}>
                      <Image src={b.v} alt={b.alt || ""} fill sizes="(max-width: 900px) 100vw, 820px" />
                    </span>
                  ) : b.t === "h" ? (
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

      {/* Reports */}
      {DOCUMENTS.length > 0 && (
        <section className={`ll-section ${styles.reportsSec}`}>
          <div className="ll-container">
            <div className={styles.head}>
              <Reveal><p className="ll-eyebrow"><span>·</span> Reports &amp; results</p></Reveal>
              <Reveal delay={0.05}><h2 className={`ll-display ${styles.headTitle}`}>The house, on the record.</h2></Reveal>
            </div>
            <div className={styles.reportsGrid}>
              {DOCUMENTS.map((d, i) => (
                <Reveal key={d.file} delay={(i % 3) * 0.05}>
                  <ReportCard doc={d} index={i} />
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}><Link href="/documents" className={styles.cta}>All documents <span aria-hidden>→</span></Link></Reveal>
          </div>
        </section>
      )}

      {/* Image band */}
      {bandImg && (
        <section className={styles.bandSec}>
          <Image className={styles.bandImg} src={bandImg} alt="A Pernod Ricard maison" fill sizes="100vw" />
          <span className={styles.bandShade} />
          <div className={`ll-container ${styles.bandInner}`}>
            <Reveal>
              <p className={`ll-display ${styles.bandQuote}`}>
                We make the spirits that mark the moments that matter.
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* Essentials */}
      <section className={`ll-section ${styles.essSec}`}>
        <div className="ll-container">
          <div className={styles.head}>
            <Reveal><p className="ll-eyebrow"><span>·</span> Investor essentials</p></Reveal>
          </div>
          <ul className={styles.essGrid}>
            {ESSENTIALS.map((e, i) => (
              <Reveal key={e} delay={(i % 3) * 0.05}>
                <a href="#" className={styles.ess}>
                  <span className={styles.essNo}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.essName}>{e}</span>
                  <span className={styles.essArrow} aria-hidden>→</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className={`ll-section ${styles.contactSec}`}>
        <div className="ll-container">
          <Reveal><p className={`ll-display ${styles.contactLine}`}>Investor relations</p></Reveal>
          <Reveal delay={0.05}>
            <a href="mailto:investors@pernod-ricard.example" className={styles.cta}>
              investors@pernod-ricard.example <span aria-hidden>↗</span>
            </a>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
