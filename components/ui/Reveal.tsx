"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const variants: Record<"up" | "left" | "right" | "fade" | "image", Variants> = {
  up: { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  image: {
    hidden: { opacity: 0, clipPath: "inset(12% 12% 12% 12% round 6px)", scale: 1.04 },
    show: { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1 },
  },
};

/** Fades / slides its children in once they scroll into view. */
export function Reveal({
  children,
  from = "up",
  delay = 0,
  duration = 0.9,
  className,
  as = "div",
  amount = 0.25,
}: {
  children: ReactNode;
  from?: keyof typeof variants;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "li" | "span" | "figure";
  amount?: number;
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={variants[from]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers <StaggerItem> children as it enters the viewport. */
export function Stagger({
  children,
  className,
  stagger = 0.12,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
    >
      {children}
    </motion.div>
  );
}
