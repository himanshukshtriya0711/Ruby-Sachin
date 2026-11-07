import { cn } from "@/lib/utils";

/**
 * Hand-drawn style line illustration of a Mughal palace.
 * Every stroke uses pathLength=1 so <ScrollDraw> can "ink" it on scroll.
 */

const arch = (x: number, w: number, base: number, spring: number, apex: number) =>
  `M${x} ${base}V${spring}Q${x} ${apex + (spring - apex) * 0.35} ${x + w / 2} ${apex}Q${x + w} ${apex + (spring - apex) * 0.35} ${x + w} ${spring}V${base}`;

const chhatri = (cx: number, base: number) =>
  [
    `M${cx - 16} ${base}V${base - 24}M${cx + 16} ${base}V${base - 24}M${cx} ${base}V${base - 24}`,
    `M${cx - 22} ${base - 24}H${cx + 22}M${cx - 20} ${base - 28}H${cx + 20}`,
    `M${cx - 18} ${base - 28}C${cx - 24} ${base - 44} ${cx - 10} ${base - 58} ${cx} ${base - 64}C${cx + 10} ${base - 58} ${cx + 24} ${base - 44} ${cx + 18} ${base - 28}`,
    `M${cx} ${base - 64}V${base - 76}`,
  ].join("");

const minaret = (cx: number) =>
  [
    `M${cx - 9} 340V160M${cx + 9} 340V160`,
    `M${cx - 15} 270H${cx + 15}M${cx - 15} 276H${cx + 15}M${cx - 14} 210H${cx + 14}M${cx - 14} 216H${cx + 14}`,
    `M${cx - 13} 160H${cx + 13}M${cx - 11} 160C${cx - 13} 146 ${cx - 4} 136 ${cx} 130C${cx + 4} 136 ${cx + 13} 146 ${cx + 11} 160`,
    `M${cx} 130V120`,
  ].join("");

const tree = (x: number, s: number) =>
  `M${x} 340V${340 - 34 * s}M${x} ${340 - 34 * s}c${-18 * s} 0 ${-26 * s} ${-16 * s} ${-16 * s} ${-28 * s}c${-8 * s} ${-16 * s} ${10 * s} ${-30 * s} ${24 * s} ${-22 * s}c${12 * s} ${-12 * s} ${32 * s} ${-2 * s} ${30 * s} ${14 * s}c${14 * s} ${8 * s} ${8 * s} ${30 * s} ${-10 * s} ${32 * s}c${-8 * s} ${6 * s} ${-20 * s} ${6 * s} ${-28 * s} ${4 * s}`;

const PATHS: string[] = [
  // ground & plinth
  "M8 340H592",
  "M86 340V314H514V340",
  "M250 340V328H350V340M262 328V340M338 328V340",
  // main body, cornice, parapet
  "M112 314V172H488V314",
  "M106 172H494M112 164H488M112 164V172M488 164V172",
  ...[124, 160, 196, 404, 440, 476].map((x) => `M${x} 164v-6h8v6`),
  // central iwan
  "M234 314V142H366V314",
  arch(254, 92, 314, 212, 160),
  arch(266, 68, 314, 222, 182),
  // ground-floor arches
  ...[124, 168, 398, 442].map((x) => arch(x, 34, 314, 268, 240)),
  // upper windows
  ...[124, 168, 398, 442].map((x) => arch(x + 4, 26, 228, 204, 186) + `H${x + 4}`),
  "M112 240H234M366 240H488",
  // main dome
  "M258 142V122H342V142",
  "M252 122C226 102 250 62 300 46C350 62 374 102 348 122Z",
  "M300 46V24M296 30h8",
  // chhatris
  chhatri(146, 158),
  chhatri(454, 158),
  // minarets
  minaret(64),
  minaret(536),
  // trees
  tree(20, 1),
  tree(578, 0.9),
];

export function PalaceSketch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 360" className={cn("overflow-visible", className)} aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {PATHS.map((d, i) => (
          <path key={i} d={d} pathLength={1} className="draw-path" />
        ))}
      </g>
    </svg>
  );
}
