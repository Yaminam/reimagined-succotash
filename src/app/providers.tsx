"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import CursorGlass from "@/components/site/CursorGlass";
import RouteTransition from "@/components/site/RouteTransition";

/**
 * Client shell for the site-wide chrome that needs hooks: Lenis smooth scroll,
 * the route-transition curtain and the glass cursor. Kept out of the RSC
 * layout so layout.tsx stays a server component (metadata, fonts, JSON-LD).
 *
 * Lenis is initialised only when motion is allowed; under reduced motion the
 * page uses native scrolling and the @view-transition fallback. In-page hash
 * links (incl. the "Skip to content" link and the careers #apply anchor) are
 * routed through lenis.scrollTo and given focus so keyboard/AT users land
 * correctly.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      const anchor = (e.target as HTMLElement)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <RouteTransition />
      <CursorGlass />
      {children}
    </>
  );
}
