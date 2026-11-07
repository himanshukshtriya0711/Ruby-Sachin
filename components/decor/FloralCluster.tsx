import { useId } from "react";
import { cn, r2, seeded } from "@/lib/utils";

/**
 * Procedurally arranged lavender blossoms, leaves and hanging wisteria racemes.
 * Flowers are defined once in <defs> and placed with <use>, which keeps the DOM small.
 * Layout is seeded, so server and client render identical markup.
 */

type Pt = [number, number];
type Branch = {
  from: Pt;
  c: Pt;
  to: Pt;
  count: number;
  size: [number, number];
  racemes?: number;
  leaves?: number;
};

type Variant = "cascade" | "corner" | "spray" | "sprig";

const LAYOUTS: Record<Variant, { w: number; h: number; branches: Branch[] }> = {
  // Hangs from the top-left corner (hero, story polaroids)
  cascade: {
    w: 420,
    h: 560,
    branches: [
      { from: [0, 6], c: [170, 10], to: [330, 70], count: 15, size: [11, 19], racemes: 5, leaves: 7 },
      { from: [0, 30], c: [100, 170], to: [70, 400], count: 15, size: [10, 18], racemes: 2, leaves: 7 },
      { from: [10, 0], c: [140, 100], to: [215, 230], count: 12, size: [9, 16], racemes: 3, leaves: 5 },
      { from: [0, 220], c: [40, 360], to: [20, 540], count: 9, size: [8, 14], leaves: 5 },
    ],
  },
  // Grows out of the bottom-left corner
  corner: {
    w: 320,
    h: 320,
    branches: [
      { from: [0, 320], c: [70, 210], to: [190, 160], count: 11, size: [11, 18], leaves: 5 },
      { from: [0, 320], c: [140, 300], to: [300, 262], count: 10, size: [10, 16], leaves: 5 },
      { from: [0, 320], c: [20, 200], to: [48, 50], count: 9, size: [9, 15], leaves: 4 },
      { from: [0, 320], c: [80, 260], to: [130, 230], count: 5, size: [14, 20] },
    ],
  },
  // Wide horizontal garland (section edges)
  spray: {
    w: 520,
    h: 200,
    branches: [
      { from: [0, 120], c: [180, 30], to: [500, 70], count: 16, size: [9, 16], racemes: 4, leaves: 7 },
      { from: [20, 140], c: [200, 190], to: [420, 150], count: 11, size: [8, 14], leaves: 5 },
    ],
  },
  // Small accent for card corners
  sprig: {
    w: 200,
    h: 200,
    branches: [
      { from: [200, 0], c: [140, 60], to: [60, 80], count: 8, size: [8, 14], leaves: 4, racemes: 1 },
      { from: [200, 0], c: [170, 90], to: [150, 180], count: 7, size: [7, 13], leaves: 3 },
    ],
  },
};

const TONES = [
  ["#FFFFFF", "#EADDF7", "#CDB0EC"],
  ["#F7F0FF", "#D5BBF0", "#A97CD8"],
  ["#EFE4FB", "#C3A0E6", "#8E5DC4"],
  ["#FFFFFF", "#F2EAFB", "#DCC8F2"],
];

const PETAL = "M0 0C-7-4-11.5-14-6.5-20.5C-3.5-24 3.5-24 6.5-20.5C11.5-14 7-4 0 0Z";
const LEAF = "M0 0C7-6 19-7 30 0C19 7 7 6 0 0Z";

function bezier(b: Branch, t: number): { p: Pt; tan: Pt } {
  const u = 1 - t;
  const p: Pt = [
    u * u * b.from[0] + 2 * u * t * b.c[0] + t * t * b.to[0],
    u * u * b.from[1] + 2 * u * t * b.c[1] + t * t * b.to[1],
  ];
  const tan: Pt = [
    2 * u * (b.c[0] - b.from[0]) + 2 * t * (b.to[0] - b.c[0]),
    2 * u * (b.c[1] - b.from[1]) + 2 * t * (b.to[1] - b.c[1]),
  ];
  return { p, tan };
}

type Use = { kind: "f" | "l" | "b"; x: number; y: number; s: number; rot: number; tone: number; o: number };

function build(variant: Variant, seed: number) {
  const L = LAYOUTS[variant];
  const rnd = seeded(seed);
  const stems: string[] = [];
  const items: Use[] = [];
  const racemes: Use[] = [];

  for (const b of L.branches) {
    stems.push(`M${b.from[0]} ${b.from[1]}Q${b.c[0]} ${b.c[1]} ${b.to[0]} ${b.to[1]}`);

    for (let i = 0; i < (b.leaves ?? 0); i++) {
      const t = 0.12 + (i / Math.max(1, b.leaves ?? 1)) * 0.8 + rnd() * 0.05;
      const { p, tan } = bezier(b, t);
      const ang = (Math.atan2(tan[1], tan[0]) * 180) / Math.PI;
      const side = i % 2 === 0 ? -1 : 1;
      items.push({ kind: "l", x: p[0], y: p[1], s: 1 + rnd() * 0.8, rot: ang + side * (35 + rnd() * 30), tone: i % 2, o: 0.85 });
    }

    const count = Math.round(b.count * 1.35);
    for (let i = 0; i < count; i++) {
      const t = Math.min(1, (i + rnd() * 0.7) / count);
      const { p, tan } = bezier(b, t);
      const len = Math.hypot(tan[0], tan[1]) || 1;
      const nx = -tan[1] / len;
      const ny = tan[0] / len;
      const off = (rnd() - 0.5) * 34;
      const grow = 1 - t * 0.4;
      const s = (b.size[0] + rnd() * (b.size[1] - b.size[0])) * grow;
      const tone = Math.floor(rnd() * TONES.length);
      items.push({ kind: rnd() > 0.88 ? "b" : "f", x: p[0] + nx * off, y: p[1] + ny * off, s, rot: rnd() * 72, tone, o: 0.82 + rnd() * 0.18 });
    }

    for (let k = 0; k < (b.racemes ?? 0); k++) {
      const t = 0.2 + rnd() * 0.75;
      const { p } = bezier(b, t);
      const n = 9 + Math.floor(rnd() * 5);
      const length = 70 + rnd() * 80;
      for (let j = 0; j < n; j++) {
        const f = j / n;
        racemes.push({
          kind: "f",
          x: p[0] + Math.sin(f * 5 + k) * 4 + (rnd() - 0.5) * 9,
          y: p[1] + f * length,
          s: 7 * (1 - f * 0.55),
          rot: rnd() * 72,
          tone: f > 0.6 ? 3 : f > 0.3 ? 0 : 1,
          o: 0.95 - f * 0.25,
        });
      }
    }
  }

  // draw leaves first, then racemes, then blossoms on top
  const sorted = [
    ...items.filter((i) => i.kind === "l"),
    ...racemes,
    ...items.filter((i) => i.kind !== "l").sort((a, b) => a.s - b.s),
  ];
  return { w: L.w, h: L.h, stems, items: sorted };
}

export function FloralCluster({
  variant = "corner",
  seed = 1,
  className,
  flipX,
  flipY,
}: {
  variant?: Variant;
  seed?: number;
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const { w, h, stems, items } = build(variant, seed);
  const transform = flipX || flipY ? `scale(${flipX ? -1 : 1} ${flipY ? -1 : 1})` : undefined;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("pointer-events-none select-none", className)}
      style={{ transform, overflow: "visible" }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {TONES.map((t, i) => (
          <linearGradient key={i} id={`${id}g${i}`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={t[0]} />
            <stop offset="0.45" stopColor={t[1]} />
            <stop offset="1" stopColor={t[2]} />
          </linearGradient>
        ))}
        <linearGradient id={`${id}leaf0`} x1="0" x2="1">
          <stop offset="0" stopColor="#9DAE8E" />
          <stop offset="1" stopColor="#C9D3BC" />
        </linearGradient>
        <linearGradient id={`${id}leaf1`} x1="0" x2="1">
          <stop offset="0" stopColor="#A99BBB" />
          <stop offset="1" stopColor="#D9D0E4" />
        </linearGradient>
        {TONES.map((_, i) => (
          <g key={i} id={`${id}f${i}`}>
            {[0, 72, 144, 216, 288].map((a) => (
              <path key={a} d={PETAL} transform={`rotate(${a})`} fill={`url(#${id}g${i})`} stroke="#7A4FA8" strokeOpacity="0.14" strokeWidth="0.6" />
            ))}
            <circle r="3.4" fill="#FFF7E8" />
            <circle r="1.7" fill="#C49A63" />
          </g>
        ))}
        {TONES.map((_, i) => (
          <ellipse key={`b${i}`} id={`${id}b${i}`} rx="5" ry="8" fill={`url(#${id}g${i})`} stroke="#7A4FA8" strokeOpacity="0.15" strokeWidth="0.6" />
        ))}
        <path id={`${id}l0`} d={LEAF} fill={`url(#${id}leaf0)`} />
        <path id={`${id}l1`} d={LEAF} fill={`url(#${id}leaf1)`} />
      </defs>

      <g fill="none" stroke="#9A8BA8" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round">
        {stems.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {items.map((it, i) => (
        <use
          key={i}
          href={`#${id}${it.kind}${it.kind === "l" ? it.tone % 2 : it.tone}`}
          transform={`translate(${r2(it.x)} ${r2(it.y)}) rotate(${r2(it.rot)}) scale(${r2(it.kind === "l" ? it.s : it.s / 13)})`}
          opacity={r2(it.o)}
        />
      ))}
    </svg>
  );
}
