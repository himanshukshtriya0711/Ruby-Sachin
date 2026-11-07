"use client";

import { Music2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { music } from "@/lib/wedding";
import { OPENED_EVENT } from "./IntroEnvelope";

/** Floating play/pause for optional background music (set `music.src` in lib/wedding.ts). */
export function MusicToggle() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!music.src) return;
    const start = () => {
      const el = audio.current;
      if (!el) return;
      el.volume = 0.45;
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    window.addEventListener(OPENED_EVENT, start);
    return () => window.removeEventListener(OPENED_EVENT, start);
  }, []);

  if (!music.src) return null;

  const toggle = () => {
    const el = audio.current;
    if (!el) return;
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => {});
    else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audio} src={music.src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Pause ${music.title}` : `Play ${music.title}`}
        className="glass fixed bottom-24 left-4 z-40 grid size-12 place-items-center rounded-full text-plum transition hover:scale-105 lg:bottom-6 lg:left-6"
      >
        {playing ? (
          <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-plum"
                style={{ animation: `eq 0.9s ${i * 0.15}s ease-in-out infinite alternate`, height: "100%", transformOrigin: "bottom" }}
              />
            ))}
          </span>
        ) : (
          <Music2 className="size-5" strokeWidth={1.7} />
        )}
      </button>
    </>
  );
}
