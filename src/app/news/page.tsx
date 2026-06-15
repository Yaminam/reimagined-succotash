import PageIntro from "@/components/site/PageIntro";

export const metadata = { title: "Newsroom" };

const ITEMS = [
  ["Press release", "Pernod Ricard reports full-year results"],
  ["Brands", "A new chapter for an iconic single malt"],
  ["Sustainability", "Another distillery reaches carbon neutrality"],
  ["People", "Conviviality at work: behind the house"],
  ["Innovation", "Investing in the future of craft"],
  ["Markets", "Growth across premium international spirits"],
];

export default function NewsPage() {
  return (
    <>
      <PageIntro
        index="05"
        eyebrow="Newsroom"
        title="The house, in its own words."
        lede="Press releases, brand stories and the moments that move the group forward."
      />
      <section className="ll-section">
        <div className="ll-container" style={{ display: "grid", gap: "0" }}>
          {ITEMS.map(([cat, title], i) => (
            <a key={i} href="#" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "1.5rem", alignItems: "center", padding: "1.5rem 0", borderTop: "1px solid var(--ll-line-soft)", color: "var(--ll-text)" }}>
              <span style={{ fontSize: "var(--ll-text-xs)", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ll-gold)", minWidth: "9rem" }}>{cat}</span>
              <span style={{ fontFamily: "var(--ll-serif)", fontWeight: 300, fontSize: "var(--ll-text-xl)", color: "var(--ll-ivory)" }}>{title}</span>
              <span aria-hidden style={{ color: "var(--ll-text-faint)" }}>→</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
