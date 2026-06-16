
# Wedding Invitation Template

A single-page wedding invitation site inspired by momento.uz. Built as a **reusable template**: all couple-specific content lives in one config file, so spinning up a new client = duplicate project, edit one file, swap a few images.

## Sections (top to bottom, single page)

1. **Locked Hero** — Full-screen floral background, couple names inside a heart, lock icon. Click unlocks (scrolls into the invitation).
2. **Welcome / Greeting** — Short message to guests, soft fabric background.
3. **Countdown** — Days / hours / minutes / seconds until the wedding.
4. **Calendar** — Single month grid with the wedding day highlighted as a heart.
5. **Event Details** — Venue name, address, time, dress code, format (e.g. halal/no alcohol).
6. **Venue Photos** — 2–3 images (exterior, interior) with short captions.
7. **Location / Map** — Address block + Google Maps / Yandex Maps / route buttons (plain links, no embedded SDK).
8. **RSVP Form** — Guest name, party size (1–5), attending yes/no, optional comment.
9. **Gifts / Requests** — Polite note about envelopes / no money during dancing / Telegram group link.
10. **Closing Thanks** — Floral image, signature from the couple.
11. **Share** — Telegram, WhatsApp, Copy-link buttons.
12. **Guest List** (optional, can be hidden per client) — Table of confirmed RSVPs.

Persistent UI: language switcher (UZ / RU / EN) top-right, background music toggle top-left.

## Features

- **Config-driven content** — One `src/config/wedding.ts` file holds every couple-specific value (names, date, venue, texts, image paths, map links, feature toggles). No code changes per client.
- **i18n** — 3 languages (UZ/RU/EN) via a simple JSON dictionary in the same config. Default language configurable.
- **Lock-screen reveal** — Hero stays locked until user taps the heart; then page scrolls/unlocks.
- **Live countdown** — Pure client-side timer from `weddingDate`.
- **RSVP** — Lovable Cloud table (`rsvps`) with one server function for insert and one for list (admin only). Cheapest backend option; no external services.
- **Public guest list** — Reads from same `rsvps` table; toggle on/off per client via config.
- **Share buttons** — Native links (`t.me/share`, `wa.me`, `navigator.clipboard`). No SDKs.
- **Background music** — Single `<audio>` tag, mp3 in `/public`, toggle button. Off by default.
- **Maps** — Plain anchor links to Google/Yandex (no API keys, no SDK = $0).
- **SEO/OG** — Title, description, og:image set from config so each client has proper share previews.
- **Feature toggles** — `showGuestList`, `showMusic`, `showCountdown`, etc. in config to hide/show sections without code edits.

## Design Style

- **Mood:** elegant, airy, romantic, monochrome with a single soft accent.
- **Palette:** off-white background (`oklch(0.98 0.005 90)`), warm ink black for text, muted rose/blush accent (`oklch(0.78 0.05 20)`), light beige cards. Defined as semantic tokens in `src/styles.css`.
- **Typography:** serif display for couple names and section titles (e.g. Cormorant Garamond / Playfair); clean sans for body (Inter or DM Sans). Loaded via Google Fonts link in `__root.tsx`.
- **Layout:** single column, generous whitespace, narrow content width (~640px) centered.
- **Imagery:** soft black-and-white floral hero backgrounds; rounded photos with subtle shadow.
- **Decorative touches:** thin divider lines with a small heart/leaf glyph; uppercase tracked-out section eyebrows above each headline.

## Animations (lightweight, CSS / Framer Motion-lite)

- Hero lock heart: gentle pulse loop.
- On unlock: fade + scale of the heart, smooth scroll to next section.
- Scroll-triggered fade-up on every section (IntersectionObserver, no heavy lib).
- Countdown digits: subtle flip/fade on change.
- Calendar wedding-day cell: slow heartbeat pulse.
- Image hover: slight zoom on venue photos.
- Background floral images: very slow parallax (transform on scroll), disabled on mobile for perf.

No video, no Lottie, no WebGL — keeps build and bandwidth cost minimal.

## Required Content Fields (the per-client config)

```ts
{
  couple: { nameA, nameB, monogram? },
  date: { iso, displayDate, displayTime, doorsOpenTime },
  venue: { name, addressLine, city, mapsGoogle, mapsYandex, route },
  dressCode, format,                       // short strings
  greeting: { eyebrow, title, body },
  closing:  { title, body, signature },
  gifts:    { intro, danceNote, telegramGroupUrl },
  photos:   { heroBg, fabricBg, venueExterior, venueInterior, closingBg, ogImage },
  music:    { src, autoplay: false },
  share:    { url },
  features: { music, countdown, calendar, guestList, rsvp },
  language: { default: 'uz', available: ['uz','ru','en'] },
  i18n:     { uz: {...}, ru: {...}, en: {...} }  // labels only; couple text above stays as-is
}
```

## Technical Plan (low cost)

- **Stack:** existing TanStack Start template, Tailwind, shadcn — no new heavy deps. Add only `framer-motion` (small) for reveal animations, or skip it and use CSS keyframes.
- **Routes:**
  - `/` — the invitation (single page, all sections).
  - `/admin/rsvps` — gated guest-list dashboard (auth required) — optional, can ship later.
- **Backend (Lovable Cloud):**
  - Table `rsvps(id, guest_name, party_size, attending, comment, created_at)`.
  - RLS: anonymous `INSERT` allowed; `SELECT` only for authenticated admin (or public if `showGuestList = true`).
  - Two server functions: `submitRsvp`, `listRsvps`.
- **Assets:** placed in `/public/wedding/` per client; referenced by config. Use `.webp` to keep bandwidth low.
- **Build cost optimizations:** no map SDK, no analytics, no third-party fonts beyond Google Fonts, single page = single bundle, images lazy-loaded.

## Reuse Workflow (for each new client)

1. Duplicate the project.
2. Replace images in `/public/wedding/`.
3. Edit `src/config/wedding.ts` (names, date, venue, texts, toggles).
4. Update `__root.tsx` meta title/description (or read from config).
5. Publish.

No component edits required for a standard client.

## Out of Scope (kept out to control cost)

- Multiple themes / theme picker (can add later as a `theme` field in config).
- Photo galleries with lightbox.
- Live-streaming or video backgrounds.
- Embedded map SDK.
- Email/SMS notifications on RSVP (can be added later via a webhook).
