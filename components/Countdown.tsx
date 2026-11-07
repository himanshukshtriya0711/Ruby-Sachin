"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { countdownTarget } from "@/lib/wedding";
import { Flourish } from "./decor/Ornaments";
import { FloralCluster } from "./decor/FloralCluster";
import { Reveal } from "./ui/Reveal";

type Left = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

const TARGET = new Date(countdownTarget).getTime();

function timeLeft(now: number): Left {
  const diff = Math.max(0, TARGET - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    done: diff === 0,
  };
}

function Unit({ value, label }: { value: number | null; label: string }) {
  const shown = value === null ? "--" : String(value).padStart(2, "0");
  return (
    <div className="glass flex w-[4.6rem] flex-col items-center rounded-2xl px-2 pt-2.5 pb-2 sm:w-24 sm:pt-3">
      <span className="relative block h-10 w-full overflow-hidden sm:h-12" aria-hidden="true">
        {/* re-keying remounts the digit so each change slides in from above */}
        <motion.span
          key={shown}
          initial={value === null ? false : { y: "-65%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 text-center text-[2.1rem] leading-10 font-semibold text-plum tabular-nums sm:text-[2.6rem] sm:leading-[3rem]"
        >
          {shown}
        </motion.span>
      </span>
      <span className="font-sans text-[0.7rem] tracking-[0.08em] text-ink-soft sm:text-xs">{label}</span>
    </div>
  );
}

export function Countdown() {
  const [left, setLeft] = useState<Left | null>(null);

  useEffect(() => {
    const tick = () => setLeft(timeLeft(Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const srText = left
    ? left.done
      ? "The wedding celebrations have begun."
      : `${left.days} days, ${left.hours} hours and ${left.minutes} minutes to go.`
    : "";

  return (
    <section
      aria-labelledby="countdown-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(233,221,245,0)_0%,#EFE6F9_30%,#EADFF6_70%,rgba(233,221,245,0)_100%)] py-14 sm:py-16"
    >
      <FloralCluster variant="corner" seed={31} flipY className="absolute -top-6 -left-8 w-40 opacity-80 sm:w-56" />
      <FloralCluster variant="corner" seed={37} flipX flipY className="absolute -top-6 -right-8 w-40 opacity-80 sm:w-56" />

      <Reveal className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 lg:flex-row lg:justify-center lg:gap-10">
        <div className="flex items-center gap-3">
          <Flourish flip className="hidden w-28 xl:block" />
          <h2
            id="countdown-title"
            className="script text-center text-[2.3rem] leading-tight text-balance text-plum sm:text-5xl lg:whitespace-nowrap"
          >
            {left?.done ? "The Celebrations Have Begun" : "The Big Day Arrives In"}
          </h2>
        </div>

        {!left?.done && (
          <div className="flex items-center gap-2 sm:gap-4">
            <Unit value={left?.days ?? null} label="Days" />
            <Unit value={left?.hours ?? null} label="Hours" />
            <Unit value={left?.minutes ?? null} label="Minutes" />
            <Unit value={left?.seconds ?? null} label="Seconds" />
            <Flourish className="ml-2 hidden w-28 xl:block" />
          </div>
        )}
        <p className="sr-only">{srText}</p>
      </Reveal>
    </section>
  );
}
