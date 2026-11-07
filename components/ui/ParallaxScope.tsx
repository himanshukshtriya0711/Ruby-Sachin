"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-scrubbed parallax for any descendant with `data-speed` (fraction of
 * viewport height to travel) and an optional `data-fade` (fade out while leaving).
 * Uses GSAP ScrollTrigger; disabled when the visitor prefers reduced motion.
 */
export function ParallaxScope({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const trigger = { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 };
      root.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed ?? "0");
        gsap.to(el, { y: () => window.innerHeight * speed, ease: "none", scrollTrigger: trigger });
      });
      root.querySelectorAll<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.to(el, { opacity: 0, y: -40, ease: "none", scrollTrigger: { ...trigger, end: "70% top" } });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
