import Image from "next/image";
import styles from "./PhotoMarquee.module.css";

/**
 * A slow, drifting band of lifestyle photography, the visual cousin of the
 * word Marquee. Pure CSS, paused under prefers-reduced-motion. Decorative,
 * so hidden from assistive tech (alt left empty intentionally).
 */
export default function PhotoMarquee({
  images,
  reverse = false,
}: {
  images: { src: string }[];
  reverse?: boolean;
}) {
  if (!images.length) return null;
  const row = [...images, ...images];
  return (
    <div className={styles.wrap} aria-hidden>
      <div className={`${styles.track} ${reverse ? styles.reverse : ""}`}>
        {row.map((im, i) => (
          <span key={i} className={styles.cell}>
            <Image src={im.src} alt="" fill sizes="360px" className={styles.img} />
          </span>
        ))}
      </div>
    </div>
  );
}
