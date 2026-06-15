import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://pernod-ricard.example"),
  title: {
    default: "Pernod Ricard, Liquid Light",
    template: "%s · Pernod Ricard",
  },
  description:
    "A house of light and liquid. The craft, brands, heritage and global reach of Pernod Ricard, seen through how light behaves in a glass.",
  icons: {
    icon: "/images/pernod/icons/favicon.png",
    apple: "/images/pernod/icons/apple-touch-icon-152x152.png",
  },
  openGraph: {
    title: "Pernod Ricard, Liquid Light",
    description: "A house of light and liquid.",
    type: "website",
    locale: "en",
  },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="ll-grain">
        <a href="#main" className="ll-skip">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
