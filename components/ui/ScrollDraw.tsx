"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Inks every `.draw-path` inside as the block scrolls through the viewport,
 * scrubbed to scroll position (GSAP ScrollTrigger). Reduced-motion users see it fully drawn.
 */
export function ScrollDraw({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const paths = el.querySelectorAll<SVGPathElement>(".draw-path");
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.to(paths, {
        strokeDashoffset: 0,
        ease: "none",
        stagger: 0.04,
        scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 45%", scrub: 0.8 },
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
