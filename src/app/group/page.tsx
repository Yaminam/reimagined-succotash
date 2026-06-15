import Link from "next/link";
import ContentPage from "@/components/site/ContentPage";
import { PAGES } from "@/content/pages";

const page = PAGES.group;
export const metadata = {
  title: "Our Group",
  description: page?.description?.slice(0, 160),
};

export default function GroupPage() {
  return (
    <>
      <ContentPage page={page} index="02" />
      <section className="ll-section" style={{ paddingTop: 0 }}>
        <div className="ll-container" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Link href="/group/our-history" style={chip}>Our History →</Link>
          <Link href="/group/our-role-society" style={chip}>Our Role in Society →</Link>
        </div>
      </section>
    </>
  );
}

const chip: React.CSSProperties = {
  fontSize: "var(--ll-text-sm)",
  color: "var(--ll-ivory)",
  padding: "0.9rem 1.4rem",
  border: "1px solid var(--ll-line)",
  borderRadius: "999px",
};
