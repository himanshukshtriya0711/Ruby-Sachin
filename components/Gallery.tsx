"use client";

import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { galleryPhotos, type Photo } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { PhotosIcon } from "./decor/Icons";
import { FloralCluster } from "./decor/FloralCluster";
import { LotusDivider } from "./decor/Ornaments";
import { Reveal } from "./ui/Reveal";

const TILTS = ["lg:-rotate-[2deg]", "lg:rotate-[1.5deg]", "lg:-rotate-[1deg]", "lg:rotate-[2.2deg]"];

export function Gallery({ photos = galleryPhotos }: { photos?: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(0);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const open = (i: number, el: HTMLElement) => {
    lastTrigger.current = el;
    setDir(0);
    setIndex(i);
  };
  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => {
      setDir(d);
      setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length));
    },
    [photos.length],
  );

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative overflow-hidden py-20 sm:py-28">
      <FloralCluster variant="spray" seed={83} className="absolute top-6 -right-24 w-80 opacity-70 sm:w-[420px]" flipX />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <Reveal className="flex flex-col items-center text-center">
          <PhotosIcon className="size-12 text-plum-soft" strokeWidth={1.2} />
          <h2 id="gallery-title" className="heading-serif mt-2 text-[2.6rem] leading-tight sm:text-5xl">
            Gallery
          </h2>
          <p className="mt-2 text-lg text-ink-soft">A glimpse of our journey together.</p>
          <LotusDivider className="mt-4 w-52" />
        </Reveal>

        {/* Portrait photos span two rows, landscape one; dense flow fills any gaps. */}
        <ul className="mt-12 grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 min-[420px]:auto-rows-[180px] sm:auto-rows-[220px] sm:gap-5 lg:auto-rows-[200px] lg:grid-cols-4 lg:gap-6">
          {photos.map((p, i) => (
            <Reveal
              as="li"
              key={i}
              delay={(i % 4) * 0.08}
              amount={0.15}
              className={p.src.height > p.src.width ? "row-span-2" : ""}
            >
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                aria-label={`Open photo ${i + 1} of ${photos.length}: ${p.alt}`}
                className={cn(
                  "group relative block h-full w-full cursor-zoom-in bg-white p-1.5 shadow-[0_18px_36px_-20px_rgb(50_20_62/0.5)] sm:p-2.5",
                  "transition-transform duration-700 ease-[var(--ease-luxe)] hover:z-10 hover:-translate-y-1 lg:hover:rotate-0",
                  TILTS[i % TILTS.length],
                )}
              >
                <span className="relative block h-full overflow-hidden bg-lavender-soft">
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 270px, 48vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-[1.08]"
                    style={{ objectPosition: p.focus }}
                  />
                  <span className="absolute inset-0 grid place-items-center bg-plum/0 transition-colors duration-500 group-hover:bg-plum/25">
                    <Expand className="size-7 scale-75 text-white opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100" strokeWidth={1.4} />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {index !== null && (
          <Lightbox photos={photos} index={index} dir={dir} onClose={close} onStep={step} />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({
  photos,
  index,
  dir,
  onClose,
  onStep,
}: {
  photos: Photo[];
  index: number;
  dir: number;
  onClose: () => void;
  onStep: (d: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const photo = photos[index];

  useEffect(() => {
    closeRef.current?.focus();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
      else if (e.key === "Tab") {
        // keep focus inside the dialog
        const f = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!f || f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) onStep(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) onStep(-1);
  };

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#1f0b29]/90 px-3 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition hover:bg-white/20"
      >
        <X className="size-6" strokeWidth={1.5} />
      </button>

      <div className="relative flex w-full max-w-5xl items-center justify-center" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.figure
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 80, scale: dir === 0 ? 0.92 : 1 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: dir * -80 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={onDragEnd}
            className="flex cursor-grab flex-col items-center active:cursor-grabbing"
          >
            <div className="bg-white p-2 shadow-2xl sm:p-3">
              <Image
                src={photo.src}
                alt={photo.alt}
                placeholder="blur"
                sizes="92vw"
                draggable={false}
                className="h-auto max-h-[72svh] w-auto max-w-[86vw] object-contain select-none sm:max-h-[78svh]"
              />
            </div>
            <figcaption className="mt-4 max-w-xl px-6 text-center text-lg text-white/85 italic">{photo.alt}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center gap-5 text-white">
        <button
          type="button"
          onClick={() => onStep(-1)}
          aria-label="Previous photo"
          className="grid size-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/25 transition hover:bg-white/20"
        >
          <ChevronLeft className="size-6" strokeWidth={1.5} />
        </button>
        <span className="font-sans text-sm tracking-widest text-white/75 tabular-nums" aria-live="polite">
          {index + 1} / {photos.length}
        </span>
        <button
          type="button"
          onClick={() => onStep(1)}
          aria-label="Next photo"
          className="grid size-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/25 transition hover:bg-white/20"
        >
          <ChevronRight className="size-6" strokeWidth={1.5} />
        </button>
      </div>
    </motion.div>
  );
}
