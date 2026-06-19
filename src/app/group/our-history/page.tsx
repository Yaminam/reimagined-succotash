import type { Metadata } from "next";
import Image from "next/image";
import PageIntro from "@/components/site/PageIntro";
import Reveal from "@/components/site/Reveal";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import { PAGES } from "@/content/pages";
import BrandHighlights from "@/components/site/BrandHighlights";
import HistoryTimeline from "./HistoryTimeline";
import styles from "./history.module.css";

export const metadata: Metadata = {
  title: "Our History",
  description:
    "From an 1805 lineage in France to one of India's largest premium spirits companies: the story of Pernod Ricard in India since 1993.",
  alternates: { canonical: "/group/our-history" },
};

const MILESTONES: { year: string; title: string; text: string; img?: string; logo?: string }[] = [
  { year: "1715", title: "Martell is founded", text: "Jean Martell establishes his cognac house in the town of Cognac, the oldest lineage in the group still in the bottle today.", logo: "/images/pernod/43-martell_logo_240.png" },
  { year: "1780", title: "Jameson, in Dublin", text: "John Jameson founds the Bow Street distillery, beginning a tradition of triple-distilled Irish whiskey.", logo: "/images/pernod/40-brand-jameson-logo-240px.png" },
  { year: "1805", title: "The lineage continues", text: "Maison Pernod opens in France. The craft and the name that will anchor the house enter the world.", img: "/images/brands/pernod/24-brand-pernod-absinthe-lifestyle-original.jpg" },
  { year: "1824", title: "The Glenlivet is licensed", text: "George Smith takes the first licence in the Livet valley, defining the Speyside single malt for two centuries to come.", logo: "/images/pernod/48-the-glenlivet_logo_240.png" },
  { year: "1827", title: "Champagne Mumm", text: "G.H. Mumm is founded in Reims, in time becoming one of the most celebrated champagne houses in the world.", logo: "/images/pernod/44-brand-mumm-logo-240px.png" },
  { year: "1909", title: "Chivas Regal", text: "The Chivas brothers of Aberdeen craft a 25-year-old blend, founding a name now synonymous with luxury Scotch." },
  { year: "1934", title: "Havana Club", text: "Havana Club is established in Cuba, carrying the island's rum-making heritage onto the world stage.", logo: "/images/pernod/39-havana_club_logo-resize_blue.png" },
  { year: "1975", title: "Two families, one vision", text: "Pernod and Ricard merge to form Pernod Ricard, a French house with global ambition." },
  { year: "1979", title: "Absolut, reinvented", text: "Absolut Vodka launches from Åhus, Sweden, becoming a global icon of design and craft.", logo: "/images/pernod/35-brand-absolut-logo-240px_1.png" },
  { year: "1993", title: "India begins", text: "Pernod Ricard India is incorporated, an early bet on the country's appetite for premium spirits." },
  { year: "1995", title: "Made for India", text: "Royal Stag and Blenders Pride are created for the Indian market, the foundations of a locally made portfolio." },
  { year: "2001", title: "An Indian portfolio", text: "The group's acquisition of Seagram brings Royal Stag, Blenders Pride and 100 Pipers into the house." },
  { year: "2010s", title: "Trading up", text: "Premiumisation accelerates; the network grows to more than thirty bottling plants and distilleries at Nashik and Behror." },
  { year: "2021", title: "A good place", text: "The 'Good Times from a Good Place' 2030 roadmap drives water stewardship and community action across India." },
  { year: "2023", title: "A new chapter", text: "Jean Touboul is appointed Managing Director & CEO, continuing the transformation of the India business." },
  { year: "Today", title: "Among India's largest", text: "The second-largest spirits company in India by revenue, manufacturing nationwide and building for the decades ahead.", img: "/images/pages/group-history/08-spirits-maturation-warehouse.jpg" },
];

export default function OurHistoryPage() {
  const hero = PAGES["group-history"]?.hero;
  const timeline = MILESTONES;
  return (
    <>
      <JsonLd
        id="ld-history"
        data={[
          webPageSchema({ name: "Our History", description: metadata.description as string, path: "/group/our-history" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Group", path: "/group" },
            { name: "Our History", path: "/group/our-history" },
          ]),
        ]}
      />

      <PageIntro
        index="02 / History"
        eyebrow="Our History"
        title="A lineage from 1805. A business built in India since 1993."
        lede="The story of Pernod Ricard in India joins two centuries of French craft to three decades of patient, premium brand-building in one of the world's most dynamic markets."
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
          <HistoryTimeline items={timeline} />
        </div>
      </section>

      {/* Brands in focus */}
      <BrandHighlights heading="Two centuries of houses, one company." />
    </>
  );
}
