
# Full i18n Coverage Pass

Goal: no hardcoded UI strings anywhere in the app. Add Uzbek Cyrillic as a 4th locale. No UI/layout changes, no new features.

## 1. Extend the locale set

In `src/config/wedding.ts`:
- `Lang` type → `"uz" | "uz-cyrl" | "ru" | "en"` (uz = Latin, uz-cyrl = Cyrillic).
- `wedding.language.available` → `["uz", "uz-cyrl", "ru", "en"]`.
- Add a display-label map so the switcher chips render `UZ`, `УЗ`, `RU`, `EN` instead of raw codes.

## 2. Expand the `i18n` dictionary

Add the following keys (currently hardcoded) to every locale (`uz`, `uz-cyrl`, `ru`, `en`):

- `toggleMusic`, `unlockInvitation` — aria-labels
- `shareTelegram`, `shareWhatsApp` — share button labels
- `telegramGroup` — gifts Telegram link label
- `guestCountRange` — RSVP "1 — 5" helper (translated phrasing per locale)
- `notFoundTitle`, `notFoundBody`, `goHome` — 404 page
- `errorTitle`, `errorBody`, `tryAgain` — error boundary
- `seoTitleSuffix`, `seoDescriptionTemplate` — SEO strings (rendered per current language with the couple names + date interpolated)

Also re-translate existing keys for the new `uz-cyrl` locale (mirror of `uz` in Cyrillic).

## 3. Move the per-couple messages into i18n-shaped objects

In `src/config/wedding.ts`, change `messages` from flat strings into per-locale records, e.g.:

```ts
messages = {
  greeting:        { uz: "...", "uz-cyrl": "...", ru: "...", en: "..." },
  giftsIntro:      { uz, "uz-cyrl", ru, en },
  giftsEnvelope:   { uz, "uz-cyrl", ru, en },
  giftsDanceNote:  { uz, "uz-cyrl", ru, en },
  closing:         { uz, "uz-cyrl", ru, en },
}
```

Components read `messages.greeting[lang]` etc. via a small `m(key, lang)` helper that falls back to `uz` when a translation is missing (safe for templating: a client can leave non-default languages blank and the app still renders).

## 4. Component edits (text replacements only — no layout/markup changes)

- **`Invitation.tsx`**
  - Replace every hardcoded string with `t(...)` or `m(...)` lookups.
  - aria-labels, share button labels, gifts Telegram label, RSVP range helper, greeting/gifts/closing bodies all switch to lookups.
  - Calendar month name: replace `toLocaleString` with explicit translated month-name array per locale so it reflects the chosen language (currently it uses the browser locale and would never show Cyrillic).
  - Weekday labels already branch on `lang`; add a `uz-cyrl` branch.

- **`__root.tsx`**
  - Wrap the 404 component and the error component in client-side language detection (read `document.documentElement.lang`, default to `wedding.language.default`) and pull strings from the dictionary. These render outside the main app tree, so they use a tiny standalone `pickLang()` helper exported from `config/wedding.ts`.
  - Set `<html lang>` from the default language on the shell.
  - Default `<title>`/description stay as a fallback; the per-route head() in `index.tsx` overrides them.

- **`src/routes/index.tsx`**
  - Generate title/description from `i18n[default].seoTitleSuffix` + `seoDescriptionTemplate` with couple/date/venue interpolated, instead of an English literal. Use the configured default language.

## 5. Language switcher

- Render labels from the new display map (`UZ / УЗ / RU / EN`).
- Persist selection to `localStorage` so language sticks across navigations (small win, no design change — purely behavior to make sure "switcher works for every single text element" survives a reload).
- On change, also update `document.documentElement.lang` so screen readers and the 404/error boundary pick up the right language.

## 6. Re-check pass

After edits, grep the source tree for:
- string literals containing letters inside `Invitation.tsx`, `__root.tsx`, `index.tsx` that aren't class names, route paths, URLs, font names, or i18n keys
- any remaining Uzbek/Russian word in component files (`rg "[А-Яа-яʻ]" src/components src/routes`)

If anything remains, route it through `t()`/`m()` and add the matching dictionary entries.

## Out of scope

- No new features (RSVP backend, theme picker, etc.).
- No layout, spacing, or visual changes.
- No content rewrites — translations preserve the original meaning.

## Files changed

- `src/config/wedding.ts` — new locale, extended dictionary, per-locale messages, helpers.
- `src/components/wedding/Invitation.tsx` — replace literals with lookups; add Cyrillic branches in calendar; localStorage + `<html lang>` sync in the page root.
- `src/routes/__root.tsx` — localize 404 + error boundary.
- `src/routes/index.tsx` — localize SEO meta.
