"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Headline that "pours" in word by word — each word rises and resolves from
 * blur to sharp, like light coming into focus. Triggers when scrolled into
 * view, runs once, and collapses to plain text under reduced-motion.
 */
export default function PourText({
  children,
  className,
  as: Tag = "span",
  delay = 0,
}: {
  children: string;
  className?: string;
  as?: ElementType;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <Tag className={className}>{children}</Tag>;

  const words = children.split(" ");

  return (
    <Tag className={className} aria-label={children}>
      <motion.span
        aria-hidden
        style={{ display: "inline" }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ staggerChildren: 0.08, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <Fragment key={i}>
            <motion.span
              style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
              variants={{
                hidden: { opacity: 0, y: "0.4em", filter: "blur(8px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
