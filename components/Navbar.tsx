"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { couple, events, formatShort, navLinks } from "@/lib/wedding";
import { cn } from "@/lib/utils";
import { Sprig } from "./decor/Ornaments";
import { SaveTheDate } from "./SaveTheDate";

function Monogram({ className }: { className?: string }) {
  return (
    <a href="#home" className={cn("group flex items-center gap-1", className)} aria-label={`${couple.bride} & ${couple.groom} — home`}>
      <span className="font-serif text-[1.9rem] leading-none font-semibold tracking-tight text-plum">
        {couple.monogram.first}
        <span className="script mx-0.5 text-[1.5rem] text-plum-soft">&amp;</span>
        {couple.monogram.second}
      </span>
      <Sprig className="w-7 -translate-y-1 transition-transform duration-700 group-hover:rotate-12" />
    </a>
  );
}

export function Navbar() {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    // Static header: sits at the top of the page over the hero and scrolls away with it.
    <header
      className={cn(
        "absolute inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500",
        open
          ? "bg-white/80 backdrop-blur-xl"
          : "bg-gradient-to-b from-white/70 to-white/0 max-lg:bg-white/55 max-lg:backdrop-blur-md",
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-10">
        <Monogram />

        <ul className="hidden items-center gap-1 lg:flex xl:gap-3">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={cn(
                  "relative block px-3 py-2 text-[1.08rem] font-semibold transition-colors duration-300",
                  active === l.id ? "text-plum" : "text-ink/80 hover:text-plum",
                )}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-[1.5px] rounded-full bg-plum"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <SaveTheDate />
          </div>
          <div className="sm:hidden">
            <SaveTheDate compact />
          </div>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-plum transition hover:bg-lavender-soft lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X className="size-6" strokeWidth={1.5} /> : <Menu className="size-6" strokeWidth={1.5} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 64px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-gradient-to-b from-white/60 to-lavender-soft/90 lg:hidden"
          >
            <motion.ul
              className="flex flex-col items-center gap-1 px-6 pt-8"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {navLinks.map((l) => (
                <motion.li
                  key={l.id}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                  className="w-full max-w-xs"
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-2xl py-3 text-center font-serif text-[1.65rem] italic font-semibold transition",
                      active === l.id ? "bg-white/70 text-plum" : "text-ink/80",
                    )}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <p className="mt-8 text-center font-sans text-xs tracking-[0.2em] text-ink-soft uppercase">
              {events.map((e) => formatShort(e.date).slice(0, 2)).join(" · ")} December 2026
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
