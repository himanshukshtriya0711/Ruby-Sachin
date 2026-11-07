"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gold thread across the top that fills as the guest scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[linear-gradient(90deg,#C8A9E8,#C49A63,#E6CFA6)]"
      style={{ scaleX }}
    />
  );
}
