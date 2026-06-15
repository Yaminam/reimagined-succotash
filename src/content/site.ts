/** Liquid Light, site IA, mirroring pernod-ricard.com/en. */

export interface NavLink {
  label: string;
  href: string;
}

export const NAV: NavLink[] = [
  { label: "Brands", href: "/brands" },
  { label: "Our Group", href: "/group" },
  { label: "History", href: "/group/our-history" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Investors", href: "/investors" },
  { label: "Newsroom", href: "/news" },
  { label: "Careers", href: "/careers" },
];

export const FOOTER_COLUMNS: { heading: string; links: NavLink[] }[] = [
  {
    heading: "The House",
    links: [
      { label: "Our Group", href: "/group" },
      { label: "Brands", href: "/brands" },
      { label: "Locations", href: "/group" },
      { label: "History", href: "/group" },
    ],
  },
  {
    heading: "Engagement",
    links: [
      { label: "Sustainability & Responsibility", href: "/sustainability" },
      { label: "Investors", href: "/investors" },
      { label: "Newsroom", href: "/news" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Documents & Reports", href: "/documents" },
      { label: "Site directory", href: "/directory" },
      { label: "Accessibility", href: "/contact" },
    ],
  },
];

export const STATS = [
  { value: "240+", label: "Premium brands" },
  { value: "#1", label: "In premium international spirits" },
  { value: "160", label: "Markets" },
  { value: "1805", label: "Since" },
];
