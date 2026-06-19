"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import styles from "./CursorGlass.module.css";

type Drop = { id: number; dx: number; dy: number; s: number; d: number };
type Splash = { id: number; x: number; y: number; drops: Drop[] };

/**
 * A small rocks-glass of amber liquid that becomes the pointer — the
 * "liquid light" made literal — trailed by a soft champagne glow. On click
 * the glass tips and a splash of spirit bursts from the rim. Mounted only on
 * fine pointers (desktop) and never under reduced motion, so touch users and
 * those who opt out of motion keep the native cursor and a still page.
 */
export default function CursorGlass() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [pouring, setPouring] = useState(false);
  const [splashes, setSplashes] = useState<Splash[]>([]);
  const seq = useRef(0);

  // Raw values drive the glass (instant, so clicks land precisely);
  // springed values trail the ambient glow a beat behind.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const gx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const gy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);
    document.documentElement.classList.add(styles.hideNative);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setActive(
        Boolean(t?.closest("a, button, [role='button'], input, textarea, select, summary, label")),
      );
    };

    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      setPouring(true);
      window.setTimeout(() => setPouring(false), 360);

      const count = 11;
      const drops: Drop[] = Array.from({ length: count }, (_, i) => {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.7;
        const dist = 26 + Math.random() * 40;
        return {
          id: i,
          dx: Math.cos(angle) * dist,
          // bias downward so the spray settles like a real splash
          dy: Math.sin(angle) * dist + dist * 0.45,
          s: 0.5 + Math.random() * 0.9,
          d: Math.random() * 60,
        };
      });
      const id = ++seq.current;
      setSplashes((prev) => [...prev, { id, x: e.clientX, y: e.clientY, drops }]);
      window.setTimeout(
        () => setSplashes((prev) => prev.filter((s) => s.id !== id)),
        950,
      );
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      document.documentElement.classList.remove(styles.hideNative);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* ambient glow, trailing a beat behind */}
      <motion.div
        className={`${styles.glow} ${active ? styles.active : ""}`}
        style={{ x: gx, y: gy }}
        aria-hidden
      />

      {/* the glass itself, locked to the pointer */}
      <motion.div
        className={`${styles.glass} ${active ? styles.active : ""} ${pouring ? styles.pour : ""}`}
        style={{ x, y }}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" width="26" height="26">
          <defs>
            <linearGradient id="ll-liquid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e4b25c" />
              <stop offset="1" stopColor="#b5683a" />
            </linearGradient>
          </defs>
          {/* glass body */}
          <path
            d="M6 4 H18 L16.6 20 Q16.4 21.4 15 21.4 H9 Q7.6 21.4 7.4 20 Z"
            fill="rgba(228,224,210,0.10)"
            stroke="rgba(245,241,230,0.85)"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          {/* amber spirit */}
          <path
            className={styles.liquid}
            d="M7.1 11 H16.9 L16.6 20 Q16.4 21.4 15 21.4 H9 Q7.6 21.4 7.4 20 Z"
            fill="url(#ll-liquid)"
          />
          {/* surface + rim highlight */}
          <path d="M7.05 11 H16.95" stroke="rgba(255,247,224,0.9)" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M8.6 5.4 L7.8 18.6" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* splashes */}
      {splashes.map((s) => (
        <div key={s.id} className={styles.splash} style={{ left: s.x, top: s.y }} aria-hidden>
          <span className={styles.ring} />
          {s.drops.map((d) => (
            <span
              key={d.id}
              className={styles.drop}
              style={
                {
                  "--dx": `${d.dx}px`,
                  "--dy": `${d.dy}px`,
                  "--s": d.s,
                  animationDelay: `${d.d}ms`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </>
  );
}
