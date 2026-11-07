import { CalendarDays, CalendarPlus, Clock } from "lucide-react";
import { googleCalendarUrl } from "@/lib/calendar";
import type { ReactNode } from "react";
import { events, formatShort, formatTime, type WeddingEventId } from "@/lib/wedding";
import { cn } from "@/lib/utils";
import { Curtain } from "./decor/Ornaments";
import { FloralCluster } from "./decor/FloralCluster";
import { eventIcons, ParasolIllustration, ThaliIllustration } from "./decor/Icons";
import { GoldParticles } from "./decor/Ambient";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";

const styles: Record<WeddingEventId, { bg: string; decor: ReactNode }> = {
  lagan: {
    bg: "bg-[linear-gradient(140deg,#FFFFFF_0%,#F3EAFB_55%,#E6D6F5_100%)]",
    decor: (
      <>
        <FloralCluster variant="sprig" seed={51} className="absolute -top-3 -right-3 w-36" />
        <ThaliIllustration className="absolute bottom-3 left-3 w-24 opacity-90 transition-transform duration-700 group-hover:-translate-y-1" />
      </>
    ),
  },
  baraat: {
    bg: "bg-[linear-gradient(140deg,#E7D8F6_0%,#D6BDF0_55%,#C8A9E8_100%)]",
    decor: (
      <>
        <FloralCluster variant="sprig" seed={57} className="absolute -top-3 -right-3 w-36" />
        <FloralCluster variant="sprig" seed={61} flipX flipY className="absolute -bottom-4 -right-2 w-28 opacity-80" />
        <ParasolIllustration className="absolute bottom-2 left-4 w-20 -rotate-12 opacity-90 transition-transform duration-700 group-hover:-rotate-6" />
      </>
    ),
  },
  vidaai: {
    bg: "bg-[linear-gradient(140deg,#FBF8FF_0%,#F0E7FA_55%,#E4D3F4_100%)]",
    decor: (
      <>
        <FloralCluster variant="sprig" seed={67} flipX className="absolute -top-3 -left-3 w-36" />
        <div className="absolute top-0 right-0 h-full w-14 opacity-80">
          <Curtain side="right" className="animate-curtain h-full w-full origin-top" />
        </div>
      </>
    ),
  },
};

export function CelebrationCards() {
  return (
    <section id="events" aria-labelledby="events-title" className="relative overflow-hidden pt-6 pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading id="events-title">
          <span className="text-[#8E5DC4]">Rituals</span> &amp; Celebrations
        </SectionHeading>

        <Stagger className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-3 md:gap-6 lg:gap-8" stagger={0.15}>
          {events.map((e) => {
            const Icon = eventIcons[e.id];
            const s = styles[e.id];
            return (
              <StaggerItem key={e.id}>
                <article
                  aria-labelledby={`event-${e.id}`}
                  className={cn(
                    "group relative isolate flex h-full flex-col items-center overflow-hidden rounded-[22px] px-8 pt-8 pb-10 text-center",
                    "shadow-[0_18px_40px_-26px_rgb(75_23_101/0.55)] ring-1 ring-white/80",
                    "transition-[transform,box-shadow] duration-700 ease-[var(--ease-luxe)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-28px_rgb(75_23_101/0.6)]",
                    s.bg,
                  )}
                >
                  <div className="absolute inset-0 -z-10">{s.decor}</div>
                  <GoldParticles count={6} seed={e.date.length + e.id.length} className="-z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/55 to-transparent group-hover:animate-[sheen_1.3s_ease-out]"
                  />

                  <Icon className="size-14 text-plum transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-105" strokeWidth={1.3} />
                  <h3 id={`event-${e.id}`} className="heading-serif mt-2 text-[2rem] leading-tight">
                    {e.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-[1.15rem] font-semibold text-ink">
                    <CalendarDays className="size-[18px] text-plum-soft" strokeWidth={1.5} />
                    <time dateTime={e.date}>{formatShort(e.date)}</time>
                  </p>
                  <p className="mt-3 max-w-[17rem] text-[1.02rem] leading-snug text-ink-soft">{e.description}</p>
                  <p className="mt-4 flex items-center gap-1.5 font-sans text-[0.8rem] font-bold tracking-[0.16em] text-plum-soft uppercase">
                    <Clock className="size-4" strokeWidth={1.8} />
                    <time dateTime={`${e.date}T${e.start}+05:30`}>{formatTime(e.start)}</time>
                  </p>
                  <a
                    href={googleCalendarUrl(e)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 mt-4 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white/70 px-4 font-sans text-xs font-bold tracking-wide text-plum ring-1 ring-plum/15 transition hover:bg-plum hover:text-white"
                  >
                    <CalendarPlus className="size-3.5" strokeWidth={2} />
                    Add to Calendar
                    <span className="sr-only">: {e.title} (opens Google Calendar)</span>
                  </a>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
