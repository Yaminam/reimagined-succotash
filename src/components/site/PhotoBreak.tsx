"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import styles from "./PhotoBreak.module.css";

/**
 * Full-bleed cinematic image band with a slow parallax drift and an
 * eyebrow + caption. Punctuates long pages. The image sits in an oversized
 * frame so the drift never reveals an edge; parallax is frozen under
 * prefers-reduced-motion.
 */
export default function PhotoBreak({
  src,
  alt,
  eyebrow,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  eyebrow?: string;
  caption?: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className={styles.break} ref={ref} aria-label={caption || eyebrow || alt}>
      <motion.div className={styles.media} style={reduce ? undefined : { y }}>
        <Image src={src} alt={alt} fill sizes="100vw" className={styles.img} priority={priority} />
      </motion.div>
      <span className={styles.shade} aria-hidden />
      {(eyebrow || caption) && (
        <div className={`ll-container ${styles.content}`}>
          {eyebrow && (
            <p className="ll-eyebrow">
              <span>·</span> {eyebrow}
            </p>
          )}
          {caption && <p className={`ll-display ${styles.caption}`}>{caption}</p>}
        </div>
      )}
    </section>
  );
}
