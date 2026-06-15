"use client";

import styles from "./Fallbacks.module.css";

/** Pure-CSS lit vessel, shown when WebGL is unavailable. */
export function VesselFallback() {
  return (
    <div className={styles.wrap} aria-hidden>
      <div className={styles.glow} />
      <div className={styles.vessel}>
        <span className={styles.stopper} />
        <span className={styles.neck} />
        <span className={styles.body}>
          <span className={styles.shine} />
          <span className={styles.liquid} />
        </span>
      </div>
      <div className={styles.caustic} />
    </div>
  );
}
