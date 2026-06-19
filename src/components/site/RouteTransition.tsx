"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./RouteTransition.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A curtain that lifts on each route change, light "pouring" between pages.
 * Keyed on the pathname: a new panel mounts covering the viewport, then wipes
 * up to reveal the page. Skipped under reduced motion, where the native
 * @view-transition fallback in globals.css applies instead.
 */
export default function RouteTransition() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={styles.curtain}
        aria-hidden
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ transformOrigin: "top" }}
      />
    </AnimatePresence>
  );
}
