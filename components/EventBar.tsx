import { events, formatLong, type WeddingEventId } from "@/lib/wedding";
import { DiyaIcon, HorseIcon, RingsIcon } from "./decor/Icons";
import { Stagger, StaggerItem } from "./ui/Reveal";

const barIcons: Record<WeddingEventId, typeof RingsIcon> = {
  lagan: RingsIcon,
  baraat: HorseIcon,
  vidaai: DiyaIcon,
};

/** Rounded white strip of the three events, overlapping the bottom of the hero. */
export function EventBar() {
  return (
    <div className="relative z-20 -mt-28 px-4 sm:-mt-32 sm:px-6">
      <Stagger
        stagger={0.12}
        amount={0.4}
        className="glass mx-auto grid max-w-5xl grid-cols-1 rounded-[28px] px-5 py-2 sm:grid-cols-3 sm:rounded-full sm:px-4 sm:py-4"
      >
        {events.map((e, i) => {
          const Icon = barIcons[e.id];
          return (
            <StaggerItem
              key={e.id}
              className={
                "flex items-center gap-4 py-3.5 sm:justify-center sm:py-1 " +
                (i > 0
                  ? "border-t border-gold/35 sm:border-t-0 sm:border-l sm:border-l-gold/45"
                  : "")
              }
            >
              <a href="#events" className="group flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-lavender-mist text-gold ring-1 ring-gold/25 transition duration-500 group-hover:-rotate-6 group-hover:bg-white sm:bg-transparent sm:ring-0">
                  <Icon className="size-11" strokeWidth={1.35} />
                </span>
                <span className="text-left">
                  <span className="block text-[1.3rem] leading-tight font-bold text-plum">{e.title}</span>
                  <span className="block text-[1.05rem] text-ink">{formatLong(e.date)}</span>
                </span>
              </a>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
