"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import styles from "./CareersForm.module.css";

const STEPS = [
  { no: "01", title: "Apply", text: "Tell us where you would make an impact, and share your profile." },
  { no: "02", title: "Conversation", text: "A first conversation with our talent team to understand your ambitions." },
  { no: "03", title: "Meet the team", text: "Meet the people and leaders you would work alongside." },
  { no: "04", title: "Welcome", text: "An offer, an onboarding, and ownership from day one." },
];

interface Errors {
  name?: string;
  email?: string;
  area?: string;
  consent?: string;
}

/**
 * Expression-of-interest form. No backend yet: a valid submission composes a
 * pre-filled email to the talent team and shows a success state. Swap the
 * onSubmit handler for an ATS/API endpoint in production.
 */
export default function CareersForm({ areas }: { areas: string[] }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    area: "",
    location: "",
    experience: "",
    links: "",
    note: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Please tell us your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) e.email = "Please enter a valid email address.";
    if (!values.area) e.area = "Please choose an area of interest.";
    if (!values.consent) e.consent = "Please confirm consent to proceed.";
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone || "-"}`,
      `Area of interest: ${values.area}`,
      `Preferred location: ${values.location || "-"}`,
      `Experience: ${values.experience || "-"}`,
      `Links: ${values.links || "-"}`,
      "",
      values.note,
    ].join("\n");
    const mailto = `mailto:careers@pernod-ricard.com?subject=${encodeURIComponent(
      `Career interest, ${values.area}, ${values.name}`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  }

  return (
    <section className={`ll-section ${styles.sec}`} id="apply">
      <div className={`ll-container ${styles.grid}`}>
        <div className={styles.intro}>
          <Reveal><p className="ll-eyebrow"><span>·</span> Express your interest</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className={`ll-display ${styles.title}`}>Tell us where you would make an impact.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ol className={styles.steps}>
              {STEPS.map((s) => (
                <li key={s.no} className={styles.step}>
                  <span className={styles.stepNo}>{s.no}</span>
                  <div>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <p className={styles.stepText}>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div className={styles.formWrap}>
          {submitted ? (
            <div className={styles.success} role="status">
              <p className={`ll-display ${styles.successTitle}`}>Thank you, {values.name.split(" ")[0]}.</p>
              <p className={styles.successText}>
                Your email client should have opened with your details ready to send. If it did
                not, write to us at careers@pernod-ricard.com and our talent team will be in touch.
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <div className={styles.row}>
                <Field id="name" label="Full name" required error={errors.name}>
                  <input
                    id="name"
                    className={styles.input}
                    value={values.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-err" : undefined}
                    autoComplete="name"
                  />
                </Field>
                <Field id="email" label="Email" required error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    className={styles.input}
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-err" : undefined}
                    autoComplete="email"
                  />
                </Field>
              </div>

              <div className={styles.row}>
                <Field id="phone" label="Phone (optional)">
                  <input
                    id="phone"
                    type="tel"
                    className={styles.input}
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    autoComplete="tel"
                  />
                </Field>
                <Field id="area" label="Area of interest" required error={errors.area}>
                  <select
                    id="area"
                    className={styles.input}
                    value={values.area}
                    onChange={(e) => set("area", e.target.value)}
                    aria-invalid={Boolean(errors.area)}
                    aria-describedby={errors.area ? "area-err" : undefined}
                  >
                    <option value="">Select an area</option>
                    {areas.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className={styles.row}>
                <Field id="location" label="Preferred location (optional)">
                  <input
                    id="location"
                    className={styles.input}
                    value={values.location}
                    onChange={(e) => set("location", e.target.value)}
                  />
                </Field>
                <Field id="experience" label="Years of experience (optional)">
                  <input
                    id="experience"
                    className={styles.input}
                    value={values.experience}
                    onChange={(e) => set("experience", e.target.value)}
                  />
                </Field>
              </div>

              <Field id="links" label="Portfolio or LinkedIn (optional)">
                <input
                  id="links"
                  className={styles.input}
                  value={values.links}
                  onChange={(e) => set("links", e.target.value)}
                  placeholder="https://"
                />
              </Field>

              <Field id="note" label="Cover note (optional)">
                <textarea
                  id="note"
                  className={`${styles.input} ${styles.textarea}`}
                  value={values.note}
                  onChange={(e) => set("note", e.target.value)}
                  rows={4}
                />
              </Field>

              <div className={styles.consent}>
                <input
                  id="consent"
                  type="checkbox"
                  className={styles.checkbox}
                  checked={values.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? "consent-err" : undefined}
                />
                <label htmlFor="consent" className={styles.consentLabel}>
                  I consent to Pernod Ricard India processing my details for recruitment, in line
                  with its <Link href="/privacy" className={styles.inlineLink}>privacy notice</Link> and the DPDP Act.
                </label>
              </div>
              {errors.consent && (
                <p id="consent-err" className={styles.error}>{errors.consent}</p>
              )}

              <button type="submit" className={styles.submit}>
                Submit your interest <span aria-hidden>→</span>
              </button>
              <p className={styles.formNote}>
                This opens a pre-filled email to our talent team. We will never ask for payment to apply.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span aria-hidden className={styles.req}> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className={styles.error}>{error}</p>
      )}
    </div>
  );
}
