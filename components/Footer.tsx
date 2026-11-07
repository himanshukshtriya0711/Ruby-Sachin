import { ArrowUp } from "lucide-react";
import { closingMessage, couple, events, formatShort, navLinks } from "@/lib/wedding";
import { FloralCluster } from "./decor/FloralCluster";
import { LotusDivider } from "./decor/Ornaments";
import { GoldParticles, Petals } from "./decor/Ambient";
import { Reveal } from "./ui/Reveal";
import { ShareInvite } from "./ShareInvite";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#E3D2F3_0%,#D9C3F0_45%,#CDB2EA_100%)] pt-20 pb-10 text-center">
      <Petals count={8} seed={33} />
      <GoldParticles count={14} seed={29} />
      <FloralCluster variant="corner" seed={101} className="absolute -bottom-6 -left-10 w-52 sm:w-72 lg:w-96" />
      <FloralCluster variant="corner" seed={107} flipX className="absolute -right-10 -bottom-6 w-52 sm:w-72 lg:w-96" />

      <Reveal className="relative mx-auto max-w-3xl px-6">
        <div className="relative mx-auto grid size-36 place-items-center rounded-full bg-white/60 ring-1 ring-gold/60 backdrop-blur-sm sm:size-44">
          <div className="absolute inset-2 rounded-full ring-1 ring-gold/35" aria-hidden="true" />
          <p className="font-serif text-5xl font-semibold text-plum sm:text-6xl" aria-label={`${couple.bride} and ${couple.groom}`}>
            {couple.monogram.first}
            <span className="script mx-1 text-[0.7em] font-normal text-plum-soft">&amp;</span>
            {couple.monogram.second}
          </p>
        </div>

        <p className="script mt-6 text-5xl text-plum sm:text-6xl">
          {couple.bride} &amp; {couple.groom}
        </p>

        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[1.05rem] text-ink">
          {events.map((e, i) => (
            <li key={e.id} className="flex items-center gap-4">
              {i > 0 && <span className="size-1.5 rotate-45 bg-gold" aria-hidden="true" />}
              <span>
                <span className="font-semibold text-plum">{e.title}</span> · <time dateTime={e.date}>{formatShort(e.date)}</time>
              </span>
            </li>
          ))}
        </ul>

        <LotusDivider className="mx-auto mt-7 w-56" />
        <p className="mx-auto mt-5 max-w-xl text-[1.6rem] leading-snug text-balance text-plum italic sm:text-[1.9rem]">{closingMessage}</p>

        <ShareInvite className="mt-8" />

        <nav aria-label="Footer" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-sans text-sm tracking-wide text-ink-soft">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="py-2 transition hover:text-plum">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#home"
          className="mx-auto mt-8 grid size-11 place-items-center rounded-full bg-white/60 text-plum ring-1 ring-white transition hover:-translate-y-1 hover:bg-white"
          aria-label="Back to top"
        >
          <ArrowUp className="size-5" strokeWidth={1.5} />
        </a>

        <p className="mt-8 font-sans text-[0.7rem] tracking-wide text-ink-soft/80">
          Made with love for {couple.bride} &amp; {couple.groom}
        </p>
      </Reveal>
    </footer>
  );
}
