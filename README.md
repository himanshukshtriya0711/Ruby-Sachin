# Ruby & Sachin — Wedding Invitation

A luxury lavender wedding invitation site built with Next.js (App Router), React, TypeScript, Tailwind CSS v4, Framer Motion, GSAP ScrollTrigger and Lucide icons.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Personalising the site

Everything a couple would change lives in two files:

| What | Where |
| --- | --- |
| Names, event dates, timings, descriptions, story chapters, closing message | `lib/wedding.ts` |
| Venue name, address, Google Maps link (**currently placeholders**) | `lib/wedding.ts` → `venue` |
| Countdown target (currently the start of the Baraat day, IST) | `lib/wedding.ts` → `countdownTarget` |
| Hero, story, venue and gallery photos | `lib/assets.ts` + files in `assets/images/` |
| Social / WhatsApp preview image | `app/opengraph-image.jpg` and `app/twitter-image.jpg` (1200×630) |

**Swapping photos:** overwrite a file in `assets/images/` with the same name, or add a new file and change its import in `lib/assets.ts`. Width, height and blur placeholders are picked up automatically. Use `focus` (CSS `object-position`) to keep faces in frame. In the gallery, portrait photos take two grid rows and landscape photos one.

The current photos are royalty-free placeholders from [Unsplash](https://unsplash.com/license).

## RSVP → WhatsApp

The form validates on the client, logs the entry through `app/api/rsvp/route.ts`, then shows a thank-you screen and opens WhatsApp (after a 4-second countdown, with a manual button and a "Stay on this page" option) with the RSVP pre-written to `whatsappNumber` in `lib/wedding.ts`. The message format lives in `lib/whatsapp.ts`. To also store responses (Google Sheets, Supabase…), add it at the `TODO` in the API route.

## Personalised invitation links

Add `?to=` to the link you send each family, e.g. `https://your-site.com/?to=Sharma%20Family`. The envelope and hero greet them ("Dear Sharma Family,") and the RSVP name is pre-filled.

## Extras

- **Envelope intro**: a wax-sealed envelope opens and the curtains part on first visit (once per browser session). Press Enter or tap to open.
- **Background music**: put an mp3 in `public/` and set `music.src` in `lib/wedding.ts` (e.g. `"/music.mp3"`). It starts when the envelope is opened and a floating button pauses it.
- **Share**: "Share Invitation" opens the phone's share sheet (or WhatsApp on desktop).
- **Mobile RSVP bar**: a floating "Will you join us?" bar on phones.
- **Add to Calendar** on every event card, plus "Save the Date" (Google Calendar / .ics) in the navbar.
- **Venue map**: embedded Google Map with Get Directions. Set `venue.mapUrl` to a Maps share link if you want an exact pin.

## Deployment (Vercel)

Import the repo into Vercel and set `NEXT_PUBLIC_SITE_URL` to your final domain (e.g. `https://ruby-weds-sachin.com`) so Open Graph links resolve correctly. Without it, the Vercel production URL is used.

## Structure

```
app/                 layout (fonts, SEO), page, RSVP API route, OG images, icon
components/          Navbar, Hero, EventBar, Countdown, OurStory, CelebrationCards,
                     Venue, Gallery, RSVP, Footer, SaveTheDate, StoryChapters
components/decor/    hand-built SVG florals, curtains, lantern, palace sketch, icons, petals
components/ui/       Reveal/Stagger (Framer Motion), ParallaxScope & ScrollDraw (GSAP)
lib/                 wedding content, image registry, calendar (.ics / Google), RSVP validation
```

All motion respects `prefers-reduced-motion`.
