import Image from "next/image";
import PageIntro from "@/components/site/PageIntro";
import Reveal from "@/components/site/Reveal";
import { PAGES } from "@/content/pages";
import styles from "./history.module.css";

export const metadata = {
  title: "Our History",
  description: "From an 1805 distillery to the world's leading premium spirits house: two centuries of Pernod Ricard.",
};

const MILESTONES: { year: string; title: string; text: string }[] = [
  { year: "1805", title: "The first stone", text: "Maison Pernod opens in Pontarlier. The name that will anchor a house enters the world." },
  { year: "1932", title: "Born of the sun", text: "Paul Ricard creates his pastis in Marseille and bottles the spirit of conviviality." },
  { year: "1975", title: "Two families, one vision", text: "Pernod and Ricard merge to form Pernod Ricard, a French house with global ambition." },
  { year: "1988", title: "Ireland joins the house", text: "The acquisition of Irish Distillers brings Jameson and a centuries-old whiskey craft into the family." },
  { year: "1993", title: "East opens", text: "Expansion across Central and Eastern Europe widens the house's reach after the Iron Curtain lifts." },
  { year: "2001", title: "Icons acquired", text: "A share of the Seagram spirits and wine business brings Chivas Regal, Martell and The Glenlivet aboard." },
  { year: "2005", title: "Allied Domecq", text: "Ballantine's, Beefeater, Malibu and Kahlua join, making the house a true global leader." },
  { year: "2008", title: "Clarity, distilled", text: "The acquisition of Vin & Sprit brings Absolut Vodka into the portfolio." },
  { year: "2019", title: "A good place", text: "The 2030 sustainability roadmap, Good Times from a Good Place, is set as the house's compass." },
  { year: "2022", title: "Carbon neutral craft", text: "The first carbon neutral distillery comes online, joining heritage to responsibility." },
  { year: "2025", title: "The house today", text: "More than 240 premium brands across 160 markets, number one in premium international spirits." },
];

export default function OurHistoryPage() {
  const hero = PAGES["group-history"]?.hero;
  const imgs = (PAGES["group-history"]?.blocks ?? [])
    .filter((b): b is { t: "img"; v: string; alt: string } => b.t === "img")
    .map((b) => b.v);
  return (
    <>
      <PageIntro
        index="02 / History"
        eyebrow="Our History"
        title="Two families. Two centuries. One house."
        lede="From an 1805 distillery in the Jura to the world's leading premium spirits house, the story of Pernod Ricard is a story of patient, convivial craft."
      />

      {hero && (
        <section className={styles.heroSec}>
          <div className="ll-container">
            <Reveal>
              <span className={styles.heroFrame}>
                <Image src={hero} alt="Pernod Ricard heritage" fill sizes="(max-width: 1200px) 100vw, 1200px" priority />
              </span>
            </Reveal>
          </div>
        </section>
      )}

      <section className={`ll-section ${styles.timelineSec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> The milestones</p></Reveal>
          <ol className={styles.timeline}>
            {MILESTONES.map((m, i) => {
              const img = i % 2 === 1 ? imgs[(i - 1) / 2] : undefined;
              return (
                <Reveal key={m.year} delay={(i % 3) * 0.05}>
                  <li className={styles.beat}>
                    <span className={styles.year}>{m.year}</span>
                    <span className={styles.rail} aria-hidden />
                    <div className={styles.body}>
                      <h2 className={styles.beatTitle}>{m.title}</h2>
                      <p className={styles.beatText}>{m.text}</p>
                      {img && (
                        <span className={styles.beatImg}>
                          <Image src={img} alt={m.title} fill sizes="(max-width: 900px) 100vw, 700px" />
                        </span>
                      )}
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
