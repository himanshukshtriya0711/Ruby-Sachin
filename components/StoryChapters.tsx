"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useId, useState } from "react";
import { story } from "@/lib/wedding";

/** "Read Our Story" button that unfolds the story chapters as a small timeline. */
export function StoryChapters() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="btn btn-outline group mt-6 min-h-10 px-5 py-1.5 text-base not-italic font-medium"
      >
        {open ? "Close Our Story" : "Read Our Story"}
        <ArrowRight
          className={`size-4 transition-transform duration-500 ${open ? "rotate-90" : "group-hover:translate-x-1"}`}
          strokeWidth={1.6}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="chapters"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-2 overflow-hidden text-left"
          >
            <ol className="relative ml-2 border-l border-gold/50 pt-6 pb-1">
              {story.chapters.map((c, i) => (
                <motion.li
                  key={c.title}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
                  className="relative mb-6 pl-7 last:mb-0"
                >
                  <span className="absolute top-1.5 -left-[7px] size-3.5 rotate-45 border border-gold bg-ivory" />
                  <h3 className="heading-serif text-2xl">{c.title}</h3>
                  <p className="mt-1 text-ink-soft">{c.body}</p>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
