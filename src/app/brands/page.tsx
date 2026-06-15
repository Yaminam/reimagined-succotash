import PageIntro from "@/components/site/PageIntro";
import BrandWall from "./BrandWall";

export const metadata = {
  title: "Brands",
  description: "The Pernod Ricard portfolio - a spectrum of houses across whisky, cognac, champagne, gin, rum, tequila and more.",
};

export default function BrandsPage() {
  return (
    <>
      <PageIntro
        index="01"
        eyebrow="The House of Brands"
        title="A spectrum of houses, each its own light."
        lede="More than two hundred premium brands, from international icons to local favourites. Every one holds light a little differently."
      />
      <section className="ll-section">
        <div className="ll-container">
          <BrandWall />
        </div>
      </section>
    </>
  );
}
