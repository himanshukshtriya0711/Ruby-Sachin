"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, LoaderCircle, Minus, Plus } from "lucide-react";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { RSVP_LIMITS, submitRsvp, validateRsvp, type RsvpData, type RsvpErrors } from "@/lib/rsvp";
import { events, formatShort } from "@/lib/wedding";
import { cn } from "@/lib/utils";
import { useGuestName } from "@/lib/useGuestName";
import { RsvpSuccess } from "./RsvpSuccess";
import { EnvelopeIcon } from "./decor/Icons";
import { FloralCluster } from "./decor/FloralCluster";
import { LotusDivider } from "./decor/Ornaments";
import { GoldParticles, Petals } from "./decor/Ambient";
import { Reveal } from "./ui/Reveal";

const initial: RsvpData = {
  name: "",
  guests: 1,
  attendance: "",
  events: events.map((e) => e.id),
  message: "",
};

const inputBase =
  "w-full rounded-xl border bg-white/85 px-4 py-3 font-sans text-[0.98rem] text-ink placeholder:text-ink-soft/60 transition focus:border-plum-soft focus:bg-white focus:ring-4 focus:ring-lavender/30 focus:outline-none";

function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor: string;
  children: ReactNode;
}) {
  const id = htmlFor;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[1.08rem] font-semibold text-plum">
        {label}
        {hint && <span className="ml-2 font-sans text-xs font-normal text-ink-soft">{hint}</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 font-sans text-sm text-[#a02c5a]"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function RSVP() {
  const [data, setData] = useState<RsvpData>(initial);
  const guest = useGuestName();

  // Pre-fill the name for personalised links (…/?to=Sharma%20Family)
  const [prefilledFor, setPrefilledFor] = useState("");
  if (guest && guest !== prefilledFor) {
    setPrefilledFor(guest);
    if (!data.name) setData({ ...data, name: guest });
  }
  const [errors, setErrors] = useState<RsvpErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [touched, setTouched] = useState(false);
  const uid = useId();
  const ids = { name: `${uid}-name`, guests: `${uid}-guests`, message: `${uid}-message`, attendance: `${uid}-attendance`, events: `${uid}-events` };

  const update = <K extends keyof RsvpData>(key: K, value: RsvpData[K]) => {
    const next = { ...data, [key]: value };
    setData(next);
    if (touched) setErrors(validateRsvp(next));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const v = validateRsvp(data);
    setErrors(v);
    if (Object.keys(v).length) {
      const firstKey = (Object.keys(v) as (keyof typeof ids)[])[0];
      document.getElementById(ids[firstKey])?.focus();
      return;
    }
    setStatus("sending");
    setServerError("");
    // The API logs the RSVP; WhatsApp is how it reaches the family. If the API is
    // unreachable we still continue to WhatsApp — only field errors stop the guest.
    const res = await submitRsvp(data);
    if (res.ok || !res.errors) {
      setStatus("sent");
      requestAnimationFrame(() =>
        document.getElementById("rsvp-title")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    } else {
      setStatus("error");
      setServerError(res.error);
      if (res.errors) setErrors(res.errors);
    }
  };

  const accepting = data.attendance === "accept";

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-title"
      className="relative overflow-hidden bg-[radial-gradient(120%_70%_at_50%_0%,#FBF8FF_0%,#EFE5F9_55%,#E3D2F3_100%)] py-20 sm:py-28"
    >
      <Petals count={8} seed={21} />
      <GoldParticles count={12} seed={17} />
      <FloralCluster variant="cascade" seed={91} className="absolute -top-4 -left-6 w-44 sm:w-64 lg:w-80" />
      <FloralCluster variant="cascade" seed={97} flipX className="absolute -top-4 -right-6 w-44 sm:w-64 lg:w-80" />

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        <Reveal className="glass relative rounded-[32px] px-5 py-10 sm:px-12 sm:py-14">
          <div className="text-center">
            <EnvelopeIcon className="mx-auto size-12 text-plum-soft" strokeWidth={1.2} />
            <p className="eyebrow mt-3 text-[0.72rem] text-plum-soft">RSVP</p>
            <h2 id="rsvp-title" className="heading-serif mt-2 text-[2.15rem] leading-tight sm:text-[2.8rem]">
              We Would Love to Celebrate With You
            </h2>
            <p className="mt-3 text-lg text-ink-soft">Kindly let us know if you&rsquo;ll be joining us.</p>
            <LotusDivider className="mx-auto mt-4 w-48" />
          </div>

          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <RsvpSuccess
                key="thanks"
                data={data}
                onReset={() => {
                  setData(initial);
                  setErrors({});
                  setTouched(false);
                  setStatus("idle");
                }}
              />
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-9 grid gap-6"
              >
                <Field label="Your Name" htmlFor={ids.name} error={errors.name}>
                  <input
                    id={ids.name}
                    name="name"
                    autoComplete="name"
                    placeholder="e.g. Ananya Sharma"
                    maxLength={RSVP_LIMITS.maxName}
                    value={data.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? `${ids.name}-error` : undefined}
                    className={cn(inputBase, errors.name ? "border-[#c0577f]" : "border-lavender-soft")}
                  />
                </Field>

                <fieldset>
                  <legend className="mb-2 block text-[1.08rem] font-semibold text-plum">Will you be attending?</legend>
                  <div
                    id={ids.attendance}
                    tabIndex={-1}
                    className="grid gap-3 sm:grid-cols-2"
                    aria-describedby={errors.attendance ? `${ids.attendance}-error` : undefined}
                  >
                    {(
                      [
                        { v: "accept", t: "Joyfully Accept", s: "Count me in!" },
                        { v: "decline", t: "Regretfully Decline", s: "Sending my blessings" },
                      ] as const
                    ).map((o) => (
                      <label
                        key={o.v}
                        className={cn(
                          "relative flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 transition",
                          "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-lavender/40",
                          data.attendance === o.v
                            ? "border-plum-soft bg-white shadow-[0_10px_24px_-16px_rgb(75_23_101/0.6)]"
                            : "border-lavender-soft bg-white/60 hover:border-lavender",
                        )}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value={o.v}
                          checked={data.attendance === o.v}
                          onChange={() => update("attendance", o.v)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={cn(
                            "grid size-5 shrink-0 place-items-center rounded-full border transition",
                            data.attendance === o.v ? "border-plum bg-plum" : "border-lavender",
                          )}
                        >
                          {data.attendance === o.v && <span className="size-2 rounded-full bg-white" />}
                        </span>
                        <span>
                          <span className="block text-[1.12rem] leading-tight font-semibold text-plum">{o.t}</span>
                          <span className="block font-sans text-xs text-ink-soft">{o.s}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.attendance && (
                    <p id={`${ids.attendance}-error`} className="mt-1.5 font-sans text-sm text-[#a02c5a]" role="alert">
                      {errors.attendance}
                    </p>
                  )}
                </fieldset>

                <AnimatePresence initial={false}>
                  {accepting && (
                    <motion.div
                      key="accept-extra"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="-m-2 overflow-hidden p-2"
                    >
                      <div className="grid gap-6">
                        <Field label="Number of Guests" hint="including you" htmlFor={ids.guests} error={errors.guests}>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => update("guests", Math.max(1, data.guests - 1))}
                              disabled={data.guests <= 1}
                              aria-label="Fewer guests"
                              className="grid size-11 place-items-center rounded-full border border-lavender bg-white text-plum transition hover:bg-lavender-mist disabled:opacity-40"
                            >
                              <Minus className="size-4" />
                            </button>
                            <input
                              id={ids.guests}
                              type="number"
                              inputMode="numeric"
                              min={1}
                              max={RSVP_LIMITS.maxGuests}
                              value={data.guests}
                              onChange={(e) => update("guests", Math.round(Number(e.target.value)) || 0)}
                              aria-invalid={!!errors.guests}
                              aria-describedby={errors.guests ? `${ids.guests}-error` : undefined}
                              className={cn(inputBase, "w-20 text-center text-lg [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none", errors.guests ? "border-[#c0577f]" : "border-lavender-soft")}
                            />
                            <button
                              type="button"
                              onClick={() => update("guests", Math.min(RSVP_LIMITS.maxGuests, data.guests + 1))}
                              disabled={data.guests >= RSVP_LIMITS.maxGuests}
                              aria-label="More guests"
                              className="grid size-11 place-items-center rounded-full border border-lavender bg-white text-plum transition hover:bg-lavender-mist disabled:opacity-40"
                            >
                              <Plus className="size-4" />
                            </button>
                          </div>
                        </Field>

                        <fieldset>
                          <legend className="mb-2 block text-[1.08rem] font-semibold text-plum">Celebrations you&rsquo;ll attend</legend>
                          <div id={ids.events} tabIndex={-1} className="grid gap-2 sm:grid-cols-3">
                            {events.map((ev) => {
                              const on = data.events.includes(ev.id);
                              return (
                                <label
                                  key={ev.id}
                                  className={cn(
                                    "flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-lavender/40",
                                    on ? "border-plum-soft bg-white" : "border-lavender-soft bg-white/50",
                                  )}
                                >
                                  <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={on}
                                    onChange={() =>
                                      update(
                                        "events",
                                        on ? data.events.filter((x) => x !== ev.id) : [...data.events, ev.id],
                                      )
                                    }
                                  />
                                  <span
                                    aria-hidden="true"
                                    className={cn(
                                      "grid size-5 shrink-0 place-items-center rounded-md border transition",
                                      on ? "border-plum bg-plum text-white" : "border-lavender",
                                    )}
                                  >
                                    {on && <Check className="size-3.5" strokeWidth={2.5} />}
                                  </span>
                                  <span className="leading-tight">
                                    <span className="block font-semibold text-plum">{ev.title}</span>
                                    <span className="block font-sans text-[0.7rem] text-ink-soft">{formatShort(ev.date)}</span>
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                          {errors.events && (
                            <p className="mt-1.5 font-sans text-sm text-[#a02c5a]" role="alert">
                              {errors.events}
                            </p>
                          )}
                        </fieldset>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Field label="A Message for the Couple" hint="optional" htmlFor={ids.message} error={errors.message}>
                  <textarea
                    id={ids.message}
                    rows={4}
                    maxLength={RSVP_LIMITS.maxMessage}
                    placeholder="Share your wishes, blessings or a favourite memory…"
                    value={data.message}
                    onChange={(e) => update("message", e.target.value)}
                    aria-invalid={!!errors.message}
                    className={cn(inputBase, "resize-none", errors.message ? "border-[#c0577f]" : "border-lavender-soft")}
                  />
                  <p className="mt-1 text-right font-sans text-xs text-ink-soft tabular-nums">
                    {data.message.length}/{RSVP_LIMITS.maxMessage}
                  </p>
                </Field>

                {status === "error" && serverError && (
                  <p className="rounded-xl bg-[#fbeaf1] px-4 py-3 text-center font-sans text-sm text-[#8c2350]" role="alert">
                    {serverError}
                  </p>
                )}

                <div className="text-center">
                  <button type="submit" disabled={status === "sending"} className="btn btn-solid group w-full px-10 sm:w-auto">
                    {status === "sending" ? (
                      <>
                        <LoaderCircle className="size-5 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Confirm Your Presence
                        <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.6} />
                      </>
                    )}
                  </button>
                  <p className="mt-3 font-sans text-xs text-ink-soft">
                    After confirming, WhatsApp opens with your RSVP ready to send to the family.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
