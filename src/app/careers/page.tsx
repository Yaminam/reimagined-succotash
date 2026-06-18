import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import Faq from "@/components/site/Faq";
import Marquee from "@/components/site/Marquee";
import CountUp from "@/components/site/CountUp";
import Magnetic from "@/components/site/Magnetic";
import PhotoBreak from "@/components/site/PhotoBreak";
import BrandHighlights from "@/components/site/BrandHighlights";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import { PAGES } from "@/content/pages";
import { EMPLOYER_PILLARS, CAREER_AREAS, CAREERS_FAQS } from "@/content/india";
import CareersForm from "./CareersForm";
import styles from "./careers.module.css";

const LIFE_STATS = [
  { value: "Créateurs", label: "De convivialité, our purpose" },
  { value: "23 hrs", label: "Learning per employee, a year" },
  { value: "Coursera", label: "Unlimited learning access" },
  { value: "1,400+", label: "Colleagues across India" },
];

const CARDINAL = [
  { no: "01", name: "Entrepreneurial spirit", text: "We trust our people to act like owners: to decide, to lead, and to build something that lasts." },
  { no: "02", name: "Mutual trust", text: "We give and expect candour, respect and freedom in equal measure, across every team and level." },
  { no: "03", name: "Sense of ethics", text: "We hold to a clear code of conduct, in a regulated category, without exception." },
];

const WHERE = [
  { no: "01", name: "Gurugram", text: "Our corporate head office at DLF Cyber City, Haryana." },
  { no: "02", name: "Mumbai", text: "A commercial and marketing hub on the west coast." },
  { no: "03", name: "Nashik & Behror", text: "Our distilleries and winery, where the spirits are made." },
  { no: "04", name: "Nationwide", text: "Sales and operations teams across India's states and union territories." },
];

const page = PAGES.careers;
const photos = [
  ...new Set(
    (page?.blocks ?? [])
      .filter((b): b is { t: "img"; v: string; alt: string } => b.t === "img")
      .map((b) => b.v))];
const hero = photos[0] ?? null;
const band = photos[1] ?? photos[0] ?? null;

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build your career with one of India's leading premium spirits companies, ownership from day one, brands worth building, and growth across the Pernod Ricard group.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <article className={styles.page}>
      <JsonLd
        id="ld-careers"
        data={[
          webPageSchema({ name: "Careers", description: metadata.description as string, path: "/careers" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Careers", path: "/careers" }])]}
      />

      <header className={styles.hero}>
        {hero ? (
          <Image className={styles.heroImg} src={hero} alt="Working at Pernod Ricard India" fill sizes="100vw" priority />
        ) : (
          <div className={styles.heroFallback} aria-hidden />
        )}
        <div className={styles.heroShade} />
        <div className={`ll-container ${styles.heroContent}`}>
          <Reveal><p className="ll-eyebrow"><span>06</span> Careers</p></Reveal>
          <Reveal delay={0.05}><h1 className={`ll-display ${styles.title}`}>Build something that lasts.</h1></Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lede}>
              Join one of India&apos;s leading premium spirits companies, a place where you are
              trusted to lead early, given brands worth building, and able to grow across the
              wider Pernod Ricard group.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Magnetic>
              <Link href="#apply" className={styles.cta}>Submit your interest <span aria-hidden>→</span></Link>
            </Magnetic>
          </Reveal>
        </div>
      </header>

      {/* Life here, in numbers */}
      <section className={styles.statsBand}>
        <div className={`ll-container ${styles.statsRow}`}>
          {LIFE_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className={styles.stat}>
                <CountUp value={s.value} className={styles.statValue} />
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Cardinal values */}
      <section className={`ll-section ${styles.pillarsSec}`}>
        <div className="ll-container">
          <div className={styles.head}>
            <Reveal><p className="ll-eyebrow"><span>·</span> What we value</p></Reveal>
            <Reveal delay={0.05}><h2 className={`ll-display ${styles.headTitle}`}>Three values, lived every day.</h2></Reveal>
          </div>
          <ul className={styles.pillars}>
            {CARDINAL.map((c, i) => (
              <Reveal as="li" className={styles.pillar} key={c.no} delay={(i % 3) * 0.06}>
                <span className={styles.pillarNo}>{c.no}</span>
                <h3 className={styles.pillarName}>{c.name}</h3>
                <p className={styles.pillarText}>{c.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Employer pillars */}
      <section className={`ll-section ${styles.pillarsSec}`}>
        <div className="ll-container">
          <div className={styles.head}>
            <Reveal><p className="ll-eyebrow"><span>·</span> Why build here</p></Reveal>
            <Reveal delay={0.05}><h2 className={`ll-display ${styles.headTitle}`}>An employer worth choosing.</h2></Reveal>
          </div>
          <ul className={styles.pillars}>
            {EMPLOYER_PILLARS.map((p, i) => (
              <Reveal as="li" className={styles.pillar} key={p.title} delay={(i % 2) * 0.06}>
                <span className={styles.pillarNo}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.pillarName}>{p.title}</h3>
                <p className={styles.pillarText}>{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Kinetic functions band */}
      <Marquee items={CAREER_AREAS.map((a) => a.name)} reverse />

      {/* Functional areas */}
      <section className={`ll-section ${styles.areasSec}`}>
        <div className="ll-container">
          <div className={styles.head}>
            <Reveal><p className="ll-eyebrow"><span>·</span> Where you could grow</p></Reveal>
            <Reveal delay={0.05}><h2 className={`ll-display ${styles.headTitle}`}>Find your place in the business.</h2></Reveal>
          </div>
          <ul className={styles.areas}>
            {CAREER_AREAS.map((a, i) => {
              const img = photos[(i % Math.max(1, photos.length - 1)) + 1] ?? photos[0];
              return (
                <Reveal as="li" className={styles.area} key={a.name} delay={(i % 3) * 0.05}>
                  <span className={styles.areaMedia}>
                    {img ? <Image src={img} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /> : <span className={styles.areaFallback} aria-hidden />}
                  </span>
                  <div className={styles.areaBody}>
                    <h3 className={styles.areaName}>{a.name}</h3>
                    <p className={styles.areaText}>{a.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Life here */}
      <PhotoBreak
        src="/images/pernod/27-jameson_distillery_bow_st_bar.jpg"
        alt="People at work in a convivial setting"
        eyebrow="Life here"
        caption="A place to grow, with brands worth building."
      />

      {band && (
        <section className={styles.bandSec}>
          <Image className={styles.bandImg} src={band} alt="Life at Pernod Ricard India" fill sizes="100vw" />
          <span className={styles.bandShade} />
          <div className={`ll-container ${styles.bandInner}`}>
            <Reveal><p className={`ll-display ${styles.bandQuote}`}>Great brands are built by people who are trusted to lead.</p></Reveal>
            <Reveal delay={0.06}>
              <Link href="/contact" className={styles.cta}>Talk to our talent team <span aria-hidden>→</span></Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Where you'd work */}
      <section className={`ll-section ${styles.pillarsSec}`}>
        <div className="ll-container">
          <div className={styles.head}>
            <Reveal><p className="ll-eyebrow"><span>·</span> Where you would work</p></Reveal>
            <Reveal delay={0.05}><h2 className={`ll-display ${styles.headTitle}`}>Hubs and houses across India.</h2></Reveal>
          </div>
          <ul className={styles.pillars}>
            {WHERE.map((w, i) => (
              <Reveal as="li" className={styles.pillar} key={w.no} delay={(i % 2) * 0.06}>
                <span className={styles.pillarNo}>{w.no}</span>
                <h3 className={styles.pillarName}>{w.name}</h3>
                <p className={styles.pillarText}>{w.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Application form */}
      <CareersForm areas={CAREER_AREAS.map((a) => a.name)} />

      {/* Brands in focus */}
      <BrandHighlights heading="The brands you could help build." />

      <Faq items={CAREERS_FAQS} title="Working here, answered." eyebrow="Answers" />
    </article>
  );
}
