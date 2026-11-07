"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShareInvite } from "./ShareInvite";

/**
 * Phones only: a floating "Will you join us?" bar that appears after the hero
 * and hides while the RSVP form or footer is on screen.
 */
export function MobileRsvpBar() {
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = [document.getElementById("rsvp"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => !!el,
    );
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setBlocked(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !blocked;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="glass flex items-center gap-2 rounded-full py-1.5 pr-1.5 pl-5">
            <p className="flex-1 text-[1.05rem] leading-tight font-semibold text-plum italic">Will you join us?</p>
            <ShareInvite iconOnly className="border-transparent bg-transparent" />
            <a href="#rsvp" className="btn btn-solid min-h-11 px-5 py-2 text-base">
              RSVP
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
