import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/site/PageIntro";
import Reveal from "@/components/site/Reveal";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import { ORG, EMAIL_DOMAIN } from "@/lib/site-config";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How Pernod Ricard India collects, uses and protects personal data on this corporate website, and your rights under India's Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE = "18 June 2026";
const PRIVACY_EMAIL = `privacy@${EMAIL_DOMAIN}`;

/** A reading section: a heading and one or more paragraphs. */
const SECTIONS: { id: string; title: string; body: string[] }[] = [
  {
    id: "scope",
    title: "About this notice",
    body: [
      "This privacy notice explains how Pernod Ricard India Private Limited (\"Pernod Ricard India\", \"we\", \"us\") handles personal data collected through this corporate website.",
      "This is a corporate website. It does not sell or promote alcohol, and it is not a consumer or e-commerce platform. We collect only the limited personal data needed to respond to enquiries, consider expressions of career interest, and operate and improve the site.",
      "This is a representative notice prepared for this build. It will be confirmed and finalised by our legal and compliance teams before any public launch.",
    ],
  },
  {
    id: "fiduciary",
    title: "Who is responsible for your data",
    body: [
      `The data fiduciary is Pernod Ricard India Private Limited, with its corporate office at ${ORG.headquarters.street}, ${ORG.headquarters.locality}, ${ORG.headquarters.region} ${ORG.headquarters.postalCode}, India.`,
      `For any question about this notice or your personal data, you can contact us at ${PRIVACY_EMAIL}.`,
    ],
  },
  {
    id: "collect",
    title: "What we collect",
    body: [
      "Information you give us: when you submit an expression of interest through the Careers section, or contact us, we collect details such as your name, email address, phone number, area of interest, location, experience and anything you include in a cover note or message.",
      "Information collected automatically: like most websites, we may collect limited technical data such as device and browser type, approximate location and pages viewed. Where this involves non-essential cookies or analytics, it is collected only after you give consent through our cookie banner.",
      "Age confirmation: to comply with Indian advertising and surrogate guidelines, we ask you to confirm you are of legal drinking age. We store only your confirmation, not your date of birth.",
    ],
  },
  {
    id: "use",
    title: "How we use your data",
    body: [
      "To respond to your enquiries and route them to the right team.",
      "To consider and respond to expressions of career interest.",
      "To operate, secure, measure and improve this website.",
      "To meet our legal, regulatory and compliance obligations.",
      "We do not use this website to market alcohol or to encourage its consumption, and we do not sell your personal data.",
    ],
  },
  {
    id: "basis",
    title: "Consent and legal basis",
    body: [
      "We process your personal data on the basis of your consent and, where applicable, for legitimate uses permitted under the Digital Personal Data Protection Act, 2023 (the \"DPDP Act\").",
      "Where we rely on consent, you can withdraw it at any time. Withdrawing consent does not affect processing already carried out, and some functions may not be available without the relevant data.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: [
      "Essential cookies are needed for the site to work and are always on. Non-essential cookies, including analytics, load only after you accept them through the cookie banner.",
      "You can change your choice at any time by clearing your stored preference in your browser, after which the banner will appear again.",
    ],
  },
  {
    id: "sharing",
    title: "How we share data",
    body: [
      "With the wider Pernod Ricard group, where needed for the purposes above and subject to appropriate safeguards.",
      "With service providers who host, secure and operate the site on our behalf, under contract and only on our instructions.",
      "With authorities or advisers where we are required to do so by law, or to protect our rights and the safety of others.",
    ],
  },
  {
    id: "transfers",
    title: "International transfers",
    body: [
      "Pernod Ricard is a global group. Where personal data is transferred outside India, we do so in accordance with the DPDP Act and applicable transfer requirements, with safeguards appropriate to the data involved.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep data",
    body: [
      "We keep personal data only for as long as necessary for the purpose it was collected, to meet legal and regulatory obligations, or to resolve disputes, after which it is deleted or anonymised.",
    ],
  },
  {
    id: "security",
    title: "How we protect data",
    body: [
      "We apply reasonable technical and organisational measures, including access controls and encryption in transit, to protect personal data against unauthorised access, loss or misuse.",
    ],
  },
];

const RIGHTS = [
  "Access a summary of the personal data we hold about you and how it is processed.",
  "Correct, complete or update inaccurate or incomplete data.",
  "Request erasure of your personal data, subject to legal retention requirements.",
  "Withdraw consent you have previously given.",
  "Nominate another individual to exercise your rights in the event of incapacity or death.",
  "Raise a grievance and have it addressed within the timelines set by the DPDP Act.",
];

export default function PrivacyPage() {
  return (
    <article className={styles.page}>
      <JsonLd
        id="ld-privacy"
        data={[
          webPageSchema({ name: "Privacy Notice", description: metadata.description as string, path: "/privacy" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy Notice", path: "/privacy" },
          ]),
        ]}
      />

      <PageIntro
        index="10"
        eyebrow="Privacy Notice"
        title="How we handle your data, and the rights you hold."
        lede="A clear account of what this corporate site collects, why, and how we protect it, in line with India's Digital Personal Data Protection Act, 2023."
      />

      <section className={`ll-section ${styles.body}`}>
        <div className={`ll-container ${styles.wrap}`}>
          <Reveal>
            <p className={styles.effective}>Effective {EFFECTIVE}</p>
          </Reveal>

          {SECTIONS.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.04}>
              <section className={styles.block} aria-labelledby={`p-${s.id}`}>
                <h2 id={`p-${s.id}`} className={styles.h2}>{s.title}</h2>
                {s.body.map((p, j) => (
                  <p key={j} className={styles.para}>{p}</p>
                ))}
              </section>
            </Reveal>
          ))}

          {/* Rights */}
          <Reveal>
            <section className={styles.block} aria-labelledby="p-rights">
              <h2 id="p-rights" className={styles.h2}>Your rights as a data principal</h2>
              <p className={styles.para}>
                Under the DPDP Act, and subject to its conditions, you have the right to:
              </p>
              <ul className={styles.rights}>
                {RIGHTS.map((r) => (
                  <li key={r} className={styles.right}>{r}</li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* Grievance / contact */}
          <Reveal>
            <section className={styles.block} aria-labelledby="p-contact">
              <h2 id="p-contact" className={styles.h2}>Grievance redressal and contact</h2>
              <p className={styles.para}>
                To exercise any of these rights, or to raise a concern, please write to our privacy
                team. We will acknowledge and address your request within the timelines required by law.
              </p>
              <p className={styles.contact}>
                <a href={`mailto:${PRIVACY_EMAIL}`} className={styles.link}>{PRIVACY_EMAIL}</a>
                <span className={styles.contactAddr}>
                  Pernod Ricard India Private Limited, {ORG.headquarters.locality}, {ORG.headquarters.region}, India
                </span>
              </p>
              <p className={styles.para}>
                You also have the right to raise a complaint with the Data Protection Board of India.
              </p>
            </section>
          </Reveal>

          {/* Changes */}
          <Reveal>
            <section className={styles.block} aria-labelledby="p-changes">
              <h2 id="p-changes" className={styles.h2}>Changes to this notice</h2>
              <p className={styles.para}>
                We may update this notice as our practices or the law evolve. The effective date above
                shows when it was last revised, and material changes will be reflected here.
              </p>
              <p className={styles.para}>
                For the group&apos;s wider privacy framework, see the {" "}
                <Link href="/contact" className={styles.link}>Contact</Link> section, or reach the
                relevant team there.
              </p>
            </section>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
