import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageIntro from "@/components/site/PageIntro";
import Reveal from "@/components/site/Reveal";
import PhotoMarquee from "@/components/site/PhotoMarquee";
import BrandHighlights from "@/components/site/BrandHighlights";
import BrandWall from "./BrandWall";
import { BRAND_BY_SLUG, BRAND_DETAILS } from "@/content/brands-detail";
import { FEATURED } from "@/content/pernod-portfolio";
import { JsonLd, breadcrumbSchema, webPageSchema, brandsSchema } from "@/lib/seo/jsonld";
import { INDIA_BRANDS } from "@/content/india";
import styles from "./brands.module.css";

// Distinct lifestyle photography for the drifting band.
const MARQUEE_PHOTOS = FEATURED.filter((b) => b.hero).map((b) => ({ src: b.hero as string }));

// Spotlight cards: brands with a hero image and a real detail page, deduped by image.
const seenHero = new Set<string>();
const SPOTLIGHTS = BRAND_DETAILS.filter(
  (b) => b.hero && !seenHero.has(b.hero) && seenHero.add(b.hero),
).slice(0, 6);

export const metadata: Metadata = {
  title: "Brands",
  description:
    "The Pernod Ricard India portfolio in a corporate context, leading Indian-made and international brands across whisky, wine and other categories.",
  alternates: { canonical: "/brands" },
};

export default function BrandsPage() {
  return (
    <>
      <JsonLd
        id="ld-brands"
        data={[
          webPageSchema({ name: "Brands", description: metadata.description as string, path: "/brands" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Brands", path: "/brands" }]),
          brandsSchema(INDIA_BRANDS)]}
      />

      <PageIntro
        index="02"
        eyebrow="The portfolio"
        title="A portfolio of houses, made and shared in India."
        lede="Leading Indian-made brands alongside international icons. Presented here in a corporate context, the heritage, provenance and role each plays in the business."
      />

      {/* Corporate disclosure */}
      <section className={styles.noteSec}>
        <div className="ll-container">
          <Reveal>
            <p className={styles.note}>
              This is a corporate overview. It does not market products, show pricing or
              encourage consumption, in line with Indian advertising and surrogate guidelines.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Drifting photography */}
      <PhotoMarquee images={MARQUEE_PHOTOS} />

      {/* Spotlights */}
      <section className={`ll-section ${styles.spotlightSec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> Brands in focus</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.h2}`}>A spectrum of houses, each its own light.</h2></Reveal>
          <ul className={styles.featured}>
            {SPOTLIGHTS.map((b, i) => (
              <Reveal as="li" key={b.slug} delay={(i % 3) * 0.06}>
                <Link href={`/brands/${b.slug}`} className={styles.feature}>
                  <Image className={styles.featImg} src={b.hero as string} alt={b.name} fill sizes="(max-width: 560px) 100vw, 33vw" />
                  <span className={styles.featShade} />
                  <span className={styles.featMeta}>
                    <span className={styles.featName}>{b.name}</span>
                    <span className={styles.featCat}>{b.category}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Brands in focus, the full portfolio as ivory marks */}
      <BrandHighlights heading="The portfolio, in full." eyebrow="The portfolio" />

      {/* India-first corporate portfolio */}
      <section className={`ll-section ${styles.portfolioSec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> Brands at a glance</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.h2}`}>Indian houses, international icons.</h2></Reveal>
          <ul className={styles.grid}>
            {INDIA_BRANDS.map((b, i) => {
              const href = b.slug && BRAND_BY_SLUG[b.slug] ? `/brands/${b.slug}` : "#group-portfolio";
              return (
                <Reveal as="li" key={b.name} delay={(i % 3) * 0.05}>
                  <Link href={href} className={styles.card}>
                    <div className={styles.cardTop}>
                      <span className={styles.cat}>{b.category}</span>
                      <span className={styles.origin}>{b.origin}</span>
                    </div>
                    <h3 className={styles.name}>{b.name}</h3>
                    <p className={styles.text}>{b.note}</p>
                    <span className={styles.cardLink}>
                      View brand <span aria-hidden>→</span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Wider group portfolio (visual) */}
      <section id="group-portfolio" className={`ll-section ${styles.wallSec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> The wider group</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.h2}`}>Part of a global house of brands.</h2></Reveal>
        </div>
        <div className="ll-container">
          <BrandWall />
        </div>
      </section>
    </>
  );
}
