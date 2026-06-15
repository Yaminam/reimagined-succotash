import PageIntro from "@/components/site/PageIntro";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageIntro
        index="07"
        eyebrow="Contact"
        title="Raise a glass with us."
        lede="Media, investors, suppliers and curious minds, find the right door into the house."
      />
      <section className="ll-section">
        <div className="ll-container" style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {[
            ["Headquarters", "5 cours Paul Ricard, 75008 Paris, France"],
            ["Media enquiries", "press@pernod-ricard.example"],
            ["Investor relations", "investors@pernod-ricard.example"],
            ["Careers", "Visit the careers portal"],
            ["Accessibility", "Tell us how we can improve"],
            ["Suppliers", "Partner with the house"],
          ].map(([t, d]) => (
            <div key={t} style={{ padding: "1.5rem", border: "1px solid var(--ll-line)", borderRadius: "var(--ll-radius)" }}>
              <p style={{ fontSize: "var(--ll-text-xs)", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ll-gold)", marginBottom: "0.6rem" }}>{t}</p>
              <p style={{ fontSize: "var(--ll-text-sm)", color: "var(--ll-text-muted)", lineHeight: 1.6 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
