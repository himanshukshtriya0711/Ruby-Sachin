"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Download } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";
import { events, formatShort } from "@/lib/wedding";
import { cn } from "@/lib/utils";

/** "Save the Date" pill with a popover to add the events to a calendar. */
export function SaveTheDate({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={compact ? "Save the date" : undefined}
        className={cn(
          "btn btn-solid not-italic",
          compact ? "size-11 min-h-0 p-0" : "min-h-10 px-5 py-2 text-[0.95rem]",
        )}
      >
        <CalendarDays className="size-[18px]" strokeWidth={1.6} />
        {!compact && <span className="font-medium not-italic">Save the Date</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass absolute right-0 top-[calc(100%+10px)] z-50 w-[min(84vw,300px)] origin-top-right rounded-2xl p-2 text-left"
          >
            <p className="eyebrow px-3 pt-2 pb-1 !text-[0.68rem] text-ink-soft">Add to Google Calendar</p>
            <ul>
              {events.map((e) => (
                <li key={e.id}>
                  <a
                    href={googleCalendarUrl(e)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition hover:bg-lavender-mist"
                  >
                    <span className="font-semibold text-plum">{e.title}</span>
                    <span className="font-sans text-xs text-ink-soft">{formatShort(e.date)}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mx-3 my-1 h-px bg-lavender-soft" />
            <button
              type="button"
              onClick={() => {
                downloadIcs();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition hover:bg-lavender-mist"
            >
              <Download className="size-4 text-gold" />
              <span>
                <span className="block font-semibold text-plum">All events (.ics)</span>
                <span className="block font-sans text-xs text-ink-soft">Apple Calendar, Outlook &amp; more</span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
