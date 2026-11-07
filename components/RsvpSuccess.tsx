"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Heart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { RsvpData } from "@/lib/rsvp";
import { couple } from "@/lib/wedding";
import { rsvpMessage, whatsappUrl } from "@/lib/whatsapp";
import { seeded } from "@/lib/utils";

const REDIRECT_SECONDS = 4;

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.51-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.76-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

/** One-off burst of lavender petals and gold flecks — a little celebration on "accept". */
function PetalBurst() {
  const pieces = useMemo(() => {
    const rnd = seeded(12);
    return Array.from({ length: 34 }, (_, i) => {
      const angle = (i / 34) * Math.PI * 2 + rnd() * 0.4;
      const dist = 120 + rnd() * 200;
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist * 0.75 - 40,
        fall: 140 + rnd() * 160,
        rot: (rnd() - 0.5) * 720,
        size: 8 + rnd() * 10,
        gold: i % 5 === 0,
        delay: rnd() * 0.15,
      };
    });
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute top-8 left-1/2 z-10 size-0">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute block"
          style={{
            width: p.size,
            height: p.gold ? p.size * 0.5 : p.size * 0.8,
            borderRadius: p.gold ? 999 : "75% 0 75% 0",
            background: p.gold
              ? "linear-gradient(90deg,#E6CFA6,#C49A63)"
              : "linear-gradient(135deg,#FFFFFF,#C8A9E8)",
            boxShadow: "0 2px 6px rgb(120 80 160 / 0.2)",
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
          animate={{
            x: [0, p.x, p.x * 1.1],
            y: [0, p.y, p.y + p.fall],
            opacity: [1, 1, 0],
            rotate: p.rot,
            scale: [0.4, 1, 0.9],
          }}
          transition={{ duration: 2.4, delay: p.delay, times: [0, 0.35, 1], ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function RsvpSuccess({ data, onReset }: { data: RsvpData; onReset: () => void }) {
  const accepting = data.attendance === "accept";
  const url = whatsappUrl(rsvpMessage(data));
  const reduce = useReducedMotion();
  const [left, setLeft] = useState(REDIRECT_SECONDS);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (cancelled) return;
    if (left <= 0) {
      window.location.href = url;
      return;
    }
    const t = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [left, cancelled, url]);

  const firstName = data.name.trim().split(/\s+/)[0];
  const progress = 1 - left / REDIRECT_SECONDS;

  return (
    <motion.div
      key="thanks"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-10 text-center"
      role="status"
    >
      {accepting && !reduce && <PetalBurst />}
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
        className="mx-auto grid size-16 place-items-center rounded-full bg-plum text-white shadow-lg"
      >
        {accepting ? <Check className="size-8" strokeWidth={1.6} /> : <Heart className="size-7" strokeWidth={1.6} />}
      </motion.span>
      <p className="script mt-5 text-5xl text-plum">Thank you, {firstName}</p>
      <p className="mx-auto mt-3 max-w-sm text-lg text-ink-soft">
        {accepting
          ? "Your presence means the world to us. We can't wait to celebrate with you!"
          : "We'll miss you dearly, and we're grateful for your love and blessings."}
      </p>
      <p className="mt-2 text-plum-soft italic">
        — {couple.bride} &amp; {couple.groom}
      </p>

      <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-white/80 p-5 ring-1 ring-lavender-soft">
        <p className="text-[1.05rem] text-ink">
          {cancelled ? (
            "Please send your RSVP on WhatsApp so the family receives it."
          ) : (
            <>
              Opening WhatsApp to send your RSVP to the family in{" "}
              <span className="font-bold text-plum tabular-nums">{Math.max(left, 0)}</span>…
            </>
          )}
        </p>
        {!cancelled && (
          <div className="mx-auto mt-3 h-1 w-full overflow-hidden rounded-full bg-lavender-soft" aria-hidden="true">
            <motion.div
              className="h-full origin-left rounded-full bg-[#25D366]"
              animate={{ scaleX: progress }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        )}
        <a
          href={url}
          className="btn mt-4 w-full bg-[#25D366] text-white not-italic shadow-[0_10px_24px_-12px_rgb(37_211_102/0.8)] hover:bg-[#1ebe5b]"
        >
          <WhatsAppGlyph className="size-5" />
          <span className="font-semibold">Send RSVP on WhatsApp</span>
        </a>
        {!cancelled && (
          <button
            type="button"
            onClick={() => setCancelled(true)}
            className="mt-2 font-sans text-sm text-ink-soft underline-offset-4 hover:text-plum hover:underline"
          >
            Stay on this page
          </button>
        )}
      </div>

      <button type="button" className="btn btn-outline mt-6 text-base" onClick={onReset}>
        Send another response
      </button>
    </motion.div>
  );
}
