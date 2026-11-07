"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { couple, events, formatShort } from "@/lib/wedding";
import { useGuestName } from "@/lib/useGuestName";
import { FloralCluster } from "./decor/FloralCluster";
import { LotusDivider } from "./decor/Ornaments";
import { GoldParticles } from "./decor/Ambient";

export const INTRO_KEY = "rs-intro-opened";
export const OPENED_EVENT = "invitation-opened";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Full-screen sealed envelope shown once per browser session. Tapping it breaks
 * the wax seal, opens the flap and parts two lavender panels to reveal the site.
 * The layout's inline script hides it before paint for returning visitors.
 */
export function IntroEnvelope() {
  const [phase, setPhase] = useState<"sealed" | "opening" | "parting" | "done">("sealed");
  const guest = useGuestName();

  useEffect(() => {
    if (document.documentElement.classList.contains("intro-done")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with the pre-paint session flag
      setPhase("done");
      return;
    }
    const html = document.documentElement;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = "";
    };
  }, []);

  const open = useCallback(() => {
    if (phase !== "sealed") return;
    setPhase("opening");
    window.dispatchEvent(new Event(OPENED_EVENT)); // inside the tap, so music may start
    window.setTimeout(() => {
      setPhase("parting");
      document.documentElement.classList.add("intro-done");
      document.documentElement.style.overflow = "";
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}
    }, 1300);
    window.setTimeout(() => setPhase("done"), 2500);
  }, [phase]);

  useEffect(() => {
    if (phase !== "sealed") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, open]);

  if (phase === "done") return null;

  const opening = phase !== "sealed";
  const parting = phase === "parting";

  return (
    <div id="intro" className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Wedding invitation">
      {/* two panels that part like curtains */}
      {(["left", "right"] as const).map((side) => (
        <motion.div
          key={side}
          className="absolute inset-y-0 w-1/2 overflow-hidden bg-[linear-gradient(180deg,#FBF8FF_0%,#EFE5F9_55%,#E3D2F3_100%)]"
          style={{ [side]: 0 }}
          animate={parting ? { x: side === "left" ? "-102%" : "102%" } : { x: 0 }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        >
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.7) 0 18px, rgba(200,169,232,0.18) 34px, rgba(255,255,255,0.7) 52px)",
            }}
          />
          <div
            className={`absolute inset-y-0 w-6 from-[#C49A63]/25 to-transparent ${side === "left" ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"}`}
          />
          <FloralCluster
            variant="cascade"
            seed={side === "left" ? 201 : 207}
            flipX={side === "right"}
            className={`absolute -top-3 w-[85%] max-w-[300px] ${side === "left" ? "-left-4" : "-right-4"}`}
          />
          <FloralCluster
            variant="corner"
            seed={side === "left" ? 211 : 217}
            flipX={side === "right"}
            className={`absolute -bottom-4 w-[70%] max-w-[260px] ${side === "left" ? "-left-6" : "-right-6"}`}
          />
        </motion.div>
      ))}

      <GoldParticles count={18} seed={41} />

      {/* invitation content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        animate={parting ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        >
          <AnimatePresence>
            {guest && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-1 text-[1.35rem] text-plum-soft italic"
              >
                Dear {guest},
              </motion.p>
            )}
          </AnimatePresence>
          <p className="eyebrow text-[0.7rem] sm:text-[0.78rem]">You are cordially invited to the wedding of</p>
          <p className="script mt-1 text-[clamp(3rem,13vw,4.6rem)] leading-tight whitespace-nowrap text-plum">
            {couple.bride} <span className="text-[0.6em] text-plum-soft">&amp;</span> {couple.groom}
          </p>
          <LotusDivider className="mx-auto mt-1 w-48" />
        </motion.div>

        {/* envelope */}
        <motion.button
          type="button"
          onClick={open}
          aria-label="Open the invitation"
          className="group relative mt-8 h-[190px] w-[280px] cursor-pointer outline-none sm:h-[220px] sm:w-[330px]"
          style={{ perspective: 900 }}
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
          whileHover={opening ? undefined : { y: -4, rotate: -1 }}
          whileTap={opening ? undefined : { scale: 0.98 }}
        >
          {/* letter rising out */}
          <motion.div
            className="absolute inset-x-4 top-3 bottom-3 z-[1] flex flex-col items-center justify-center rounded-md bg-white shadow-md ring-1 ring-gold/30"
            animate={opening ? { y: -96 } : { y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          >
            <span className="script text-3xl text-plum">Save the Date</span>
            <span className="mt-1 font-sans text-[0.65rem] tracking-[0.22em] text-ink-soft uppercase">
              {events.map((e) => formatShort(e.date).slice(0, 2)).join(" · ")} December 2026
            </span>
          </motion.div>
          {/* envelope body (front pocket) */}
          <div
            className="absolute inset-0 z-[2] rounded-lg bg-[linear-gradient(160deg,#FFFFFF,#F1E8FA)] shadow-[0_30px_60px_-28px_rgb(75_23_101/0.6)] ring-1 ring-gold/40"
            style={{ clipPath: "polygon(0 0, 50% 62%, 100% 0, 100% 100%, 0 100%)" }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[2] rounded-lg"
            style={{
              clipPath: "polygon(0 0, 50% 62%, 100% 0, 100% 100%, 0 100%)",
              background: "linear-gradient(200deg, transparent 55%, rgba(200,169,232,0.25))",
            }}
          />
          {/* flap */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[62%] origin-top"
            style={{ transformStyle: "preserve-3d" }}
            animate={opening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 3 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,#F7F1FD,#E7D9F6)]"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", backfaceVisibility: "hidden" }}
            />
            <div
              className="absolute inset-0 bg-[#EADDF7]"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}
            />
          </motion.div>
          {/* wax seal */}
          <motion.span
            className="absolute top-[62%] left-1/2 z-10 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#8a52ad,#4B1765_70%)] shadow-[0_6px_14px_rgb(50_20_62/0.45),inset_0_-3px_6px_rgb(0_0_0/0.25)] ring-2 ring-[#5a2478]"
            animate={opening ? { scale: 0, opacity: 0, rotate: 25 } : { scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <span className="font-serif text-xl font-semibold text-gold-soft">
              {couple.monogram.first}
              <span className="script text-base">&amp;</span>
              {couple.monogram.second}
            </span>
            <span className="absolute inset-1.5 rounded-full border border-gold-soft/40" />
          </motion.span>
        </motion.button>

        <motion.p
          className="mt-8 flex items-center gap-2 font-sans text-xs tracking-[0.25em] text-plum uppercase"
          initial={{ opacity: 0 }}
          animate={opening ? { opacity: 0 } : { opacity: [0.45, 1, 0.45] }}
          transition={opening ? { duration: 0.2 } : { duration: 2.4, repeat: Infinity, delay: 1.2 }}
        >
          Tap to open
        </motion.p>
      </motion.div>
    </div>
  );
}
