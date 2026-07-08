import { useEffect, useMemo, useRef, useState } from "react";
import { Heart, Lock, MapPin, Music2, VolumeX, Copy, Send } from "lucide-react";
import {
  wedding,
  messages,
  langLabels,
  htmlLang,
  calendarStrings,
  pickText,
  t as tr,
  type Lang,
} from "@/config/wedding";

// ---------- helpers ----------
function useT(lang: Lang) {
  return (key: string) => tr(lang, key);
}

function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id={id}
      ref={ref}
      className={`reveal mx-auto w-full max-w-2xl px-6 py-20 ${className}`}
    >
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow text-center">{children}</p>;
}

function Ornament() {
  return (
    <div className="divider-ornament my-6">
      <Heart className="h-3 w-3" aria-hidden />
    </div>
  );
}

// ---------- Hero (locked) ----------
function Hero({
  lang,
  setLang,
  onUnlock,
  unlocked,
  music,
  toggleMusic,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  onUnlock: () => void;
  unlocked: boolean;
  music: { available: boolean; playing: boolean };
  toggleMusic: () => void;
}) {
  const t = useT(lang);
  return (
    <header
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-foreground/5"
      style={{
        backgroundImage: `url(${wedding.photos.heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background/30" />

      {/* Top bar */}
      <div className="absolute top-4 left-0 right-0 z-10 flex items-center justify-between px-4">
        {music.available ? (
          <button
            onClick={toggleMusic}
            aria-label={t("toggleMusic")}
            className="rounded-full bg-background/70 p-2 backdrop-blur-md shadow-sm"
          >
            {music.playing ? <Music2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        ) : (
          <span />
        )}
        <div className="flex gap-1 rounded-full bg-background/70 p-1 backdrop-blur-md shadow-sm">
          {wedding.language.available.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-2.5 py-1 text-xs uppercase tracking-wider transition ${
                lang === l
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {langLabels[l]}
            </button>
          ))}
        </div>
      </div>

      {/* Heart card */}
      <div
        className={`relative z-10 transition-all duration-700 ${
          unlocked ? "opacity-0 scale-95 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="relative mx-auto flex h-[420px] w-[360px] items-center justify-center sm:h-[520px] sm:w-[460px]">
          <svg
            viewBox="0 0 100 90"
            className="absolute inset-0 h-full w-full drop-shadow-2xl"
            preserveAspectRatio="none"
          >
            <path
              d="M50,82 C20,60 5,42 5,25 C5,12 15,4 28,4 C38,4 46,10 50,18 C54,10 62,4 72,4 C85,4 95,12 95,25 C95,42 80,60 50,82 Z"
              fill="rgba(255,255,255,0.65)"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="0.3"
            />
          </svg>
          <div className="relative z-10 flex flex-col items-center px-10 text-center">
            <Heart className="h-5 w-5 fill-foreground text-foreground" />
            <p className="eyebrow mt-4">{t("invitation")}</p>
            <h1 className="mt-3 font-serif text-3xl sm:text-4xl">
              <span>{wedding.couple.nameA}</span>
              <span className="mx-2 text-primary">&</span>
              <span>{wedding.couple.nameB}</span>
            </h1>
            <button
              onClick={onUnlock}
              aria-label={t("unlockInvitation")}
              className="heartbeat mt-8 rounded-full border border-foreground/30 bg-background/60 p-4 backdrop-blur transition hover:bg-background"
            >
              <Lock className="h-5 w-5" />
            </button>
            <p className="mt-5 max-w-[14rem] text-xs text-muted-foreground">
              {t("unlock")}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

// ---------- Countdown ----------
function useCountdown(iso: string) {
  const target = useMemo(() => new Date(iso).getTime(), [iso]);
  // Start at 0 on both server and client to avoid hydration mismatch.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now === null ? 0 : Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, ready: now !== null };
}

function Countdown({ lang }: { lang: Lang }) {
  const t = useT(lang);
  const c = useCountdown(wedding.date.iso);
  const items: Array<[number, string]> = [
    [c.days, t("days")],
    [c.hours, t("hours")],
    [c.minutes, t("minutes")],
    [c.seconds, t("seconds")],
  ];
  return (
    <Section id="countdown" className="text-center">
      <Eyebrow>{t("countdownTitle")}</Eyebrow>
      <div className="mt-8 flex items-start justify-center gap-3 sm:gap-6">
        {items.map(([v, label], i) => (
          <div key={label} className="flex items-start gap-3 sm:gap-6">
            <div className="flex flex-col items-center">
              <div className="font-serif text-4xl tabular-nums sm:text-6xl">
                {c.ready ? String(v).padStart(2, "0") : "00"}
              </div>
              <div className="eyebrow mt-2">{label}</div>
            </div>
            {i < items.length - 1 && (
              <span className="font-serif text-3xl text-muted-foreground sm:text-5xl">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

// ---------- Greeting ----------
function Greeting({ lang }: { lang: Lang }) {
  const t = useT(lang);
  return (
    <Section className="relative text-center">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `url(${wedding.photos.fabricBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Eyebrow>{t("greetingEyebrow")}</Eyebrow>
      <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
        {wedding.couple.nameA}
        <span className="mx-3 text-primary italic">&amp;</span>
        {wedding.couple.nameB}
      </h2>
      <Ornament />
      <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground">
        {pickText(messages.greeting, lang)}
      </p>
      <p className="mt-6 text-sm italic text-muted-foreground">
        {t("weAreThankful")}
      </p>
    </Section>
  );
}

// ---------- Calendar ----------
function Calendar({ lang }: { lang: Lang }) {
  const t = useT(lang);
  const d = new Date(wedding.date.iso);
  const year = d.getFullYear();
  const month = d.getMonth();
  const wedDay = d.getDate();
  const monthName = `${calendarStrings[lang].months[month]} ${year}`;

  const firstDay = new Date(year, month, 1);
  // Mon=0 ... Sun=6
  const offset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<number | null> = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);
  while (cells.length % 7 !== 0) cells.push(null);

  const weekdays = calendarStrings[lang].weekdays;

  return (
    <Section id="calendar" className="text-center">
      <Eyebrow>{t("calendarTitle")}</Eyebrow>
      <p className="mt-3 font-serif text-2xl">{monthName}</p>
      <div className="mx-auto mt-8 grid max-w-md grid-cols-7 gap-2 text-sm">
        {weekdays.map((w) => (
          <div key={w} className="eyebrow py-2">
            {w}
          </div>
        ))}
        {cells.map((n, i) => {
          const isWed = n === wedDay;
          return (
            <div
              key={i}
              className={`relative flex aspect-square items-center justify-center rounded-md ${
                n ? "text-foreground" : "text-transparent"
              }`}
            >
              {isWed ? (
                <>
                  <Heart
                    className="absolute h-9 w-9 fill-primary text-primary heartbeat"
                    aria-hidden
                  />
                  <span className="relative z-10 text-xs font-medium text-primary-foreground">
                    {n}
                  </span>
                </>
              ) : (
                <span>{n ?? ""}</span>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">{t("calendarNote")}</p>
    </Section>
  );
}

// ---------- Event details ----------
function Details({ lang }: { lang: Lang }) {
  const t = useT(lang);
  const rows = [
    { label: t("address"), value: `${wedding.venue.name}, ${wedding.venue.city}, ${wedding.venue.addressLine}`, link: wedding.venue.mapsGoogle, linkLabel: t("openMap") },
    { label: t("time"), value: `${wedding.date.displayDate} · ${wedding.date.displayTime}`, sub: `${t("doorsOpen")} ${wedding.date.doorsOpenTime}` },
    { label: t("dressCode"), value: pickText(messages.dressCodeValue, lang) },
    { label: t("format"), value: pickText(messages.formatValue, lang) },
  ];
  return (
    <Section id="details">
      <Eyebrow>{t("detailsTitle")}</Eyebrow>
      <h2 className="mt-3 text-center font-serif text-3xl">{t("detailsTitle")}</h2>
      <Ornament />
      <div className="space-y-6">
        {rows.map((r) => (
          <div key={r.label} className="border-b border-border/60 pb-5 last:border-0">
            <div className="eyebrow">{r.label}</div>
            <div className="mt-1 font-serif text-xl">{r.value}</div>
            {r.sub && <div className="mt-1 text-sm text-muted-foreground">{r.sub}</div>}
            {r.link && (
              <a
                href={r.link}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline"
              >
                {r.linkLabel} →
              </a>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

// ---------- Venue photos ----------
function Venue({ lang }: { lang: Lang }) {
  const t = useT(lang);
  const photos = [
    { src: wedding.photos.venueExterior, caption: t("exterior") },
    { src: wedding.photos.venueInterior, caption: t("interior") },
  ];
  return (
    <Section className="text-center">
      <Eyebrow>{t("venueTitle")}</Eyebrow>
      <h2 className="mt-3 font-serif text-3xl">{wedding.venue.name}</h2>
      <Ornament />
      <div className="grid gap-6 sm:grid-cols-2">
        {photos.map((p) => (
          <figure key={p.caption} className="overflow-hidden rounded-md">
            <div className="aspect-square overflow-hidden bg-muted">
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
            <figcaption className="eyebrow mt-3">{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

// ---------- Location ----------
function Location({ lang }: { lang: Lang }) {
  const t = useT(lang);
  return (
    <Section id="location" className="text-center">
      <Eyebrow>{t("locationTitle")}</Eyebrow>
      <h2 className="mt-3 font-serif text-3xl">{t("locationTitle")}</h2>
      <Ornament />
      <p className="mx-auto max-w-md text-base leading-relaxed">
        <strong className="font-serif text-xl">{wedding.venue.name}</strong>
        <br />
        <span className="text-muted-foreground">
          {wedding.venue.city}, {wedding.venue.addressLine}
        </span>
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {[
          { url: wedding.venue.mapsGoogle, label: t("googleMaps") },
          { url: wedding.venue.mapsYandex, label: t("yandexMaps") },
          { url: wedding.venue.route, label: t("buildRoute") },
        ].map((b) => (
          <a
            key={b.label}
            href={b.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-sm transition hover:bg-foreground hover:text-background"
          >
            <MapPin className="h-3.5 w-3.5" /> {b.label}
          </a>
        ))}
      </div>
    </Section>
  );
}

// ---------- RSVP ----------
function RSVP({ lang }: { lang: Lang }) {
  const t = useT(lang);
  const [count, setCount] = useState(1);
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Section id="rsvp">
      <Eyebrow>{t("rsvpEyebrow")}</Eyebrow>
      <h2 className="mt-3 text-center font-serif text-3xl">{t("rsvpTitle")}</h2>
      <Ornament />

      {submitted ? (
        <p className="rounded-md border border-primary/40 bg-primary/5 p-6 text-center text-primary">
          {t("rsvpThanks")}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="eyebrow">{t("guestName")} *</label>
            <input
              required
              name="name"
              className="mt-2 w-full rounded-md border border-input bg-card px-4 py-3 text-base outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="eyebrow">{t("guestCount")}</label>
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCount((c) => Math.max(1, c - 1))}
                className="h-10 w-10 rounded-full border border-input text-xl"
              >
                −
              </button>
              <div className="w-10 text-center font-serif text-2xl">{count}</div>
              <button
                type="button"
                onClick={() => setCount((c) => Math.min(5, c + 1))}
                className="h-10 w-10 rounded-full border border-input text-xl"
              >
                +
              </button>
              <span className="ml-2 text-xs text-muted-foreground">
                {t("guestCountRange")}
              </span>
            </div>
          </div>

          <div>
            <label className="eyebrow">{t("attending")} *</label>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {(["yes", "no"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAttending(v)}
                  className={`rounded-md border px-4 py-3 text-sm transition ${
                    attending === v
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input hover:border-foreground/40"
                  }`}
                >
                  {v === "yes" ? `✓ ${t("yes")}` : `✗ ${t("no")}`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="eyebrow">{t("comment")}</label>
            <textarea
              name="comment"
              rows={3}
              className="mt-2 w-full rounded-md border border-input bg-card px-4 py-3 text-base outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={!attending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-foreground py-3.5 text-sm font-medium uppercase tracking-widest text-background transition hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" /> {t("submit")}
          </button>

          <p className="text-center text-xs text-muted-foreground">{t("required")}</p>
        </form>
      )}
    </Section>
  );
}

// ---------- Gifts ----------
function Gifts({ lang }: { lang: Lang }) {
  const t = useT(lang);
  return (
    <Section className="text-center">
      <Eyebrow>{t("giftsTitle")}</Eyebrow>
      <h2 className="mt-3 font-serif text-3xl">{t("giftsTitle")}</h2>
      <Ornament />
      <div className="space-y-5 text-muted-foreground">
        <p>{pickText(messages.gifts.intro, lang)}</p>
        <p>{pickText(messages.gifts.envelope, lang)}</p>
        <p className="italic">{pickText(messages.gifts.danceNote, lang)}</p>
        {messages.gifts.telegramGroupUrl && (
          <a
            href={messages.gifts.telegramGroupUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-full border border-foreground/20 px-5 py-2.5 text-sm text-foreground transition hover:bg-foreground hover:text-background"
          >
            {t("telegramGroup")} →
          </a>
        )}
      </div>
    </Section>
  );
}

// ---------- Closing ----------
function Closing({ lang }: { lang: Lang }) {
  const t = useT(lang);
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center py-32 text-center"
      style={{ backgroundImage: `url(${wedding.photos.closingBg})` }}
    >
      <div className="absolute inset-0 bg-background/70" />
      <div className="reveal relative mx-auto max-w-xl px-6">
        <Heart className="mx-auto h-5 w-5 fill-primary text-primary" />
        <h2 className="mt-6 font-serif text-4xl">{t("closingTitle")}</h2>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          {pickText(messages.closing, lang)}
        </p>
        <p className="mt-10 eyebrow">{t("closingSign")}</p>
        <p className="mt-3 font-serif text-2xl">
          {wedding.couple.nameA} & {wedding.couple.nameB}
        </p>
      </div>
    </section>
  );
}

// ---------- Share ----------
function Share({ lang }: { lang: Lang }) {
  const t = useT(lang);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState(wedding.share.url);

  useEffect(() => {
    if (!wedding.share.url && typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  const text = `${wedding.couple.nameA} & ${wedding.couple.nameB} — ${t("invitationLine")}`;

  return (
    <Section className="text-center">
      <Eyebrow>{t("shareTitle")}</Eyebrow>
      <h2 className="mt-3 font-serif text-3xl">{t("shareTitle")}</h2>
      <Ornament />
      <p className="mx-auto mb-8 max-w-md text-sm text-muted-foreground">{t("shareBody")}</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-foreground/20 px-5 py-2.5 text-sm transition hover:bg-foreground hover:text-background"
        >
          {t("shareTelegram")}
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-foreground/20 px-5 py-2.5 text-sm transition hover:bg-foreground hover:text-background"
        >
          {t("shareWhatsApp")}
        </a>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-sm transition hover:bg-foreground hover:text-background"
        >
          <Copy className="h-3.5 w-3.5" />
          {copied ? t("copied") : t("copy")}
        </button>
      </div>
    </Section>
  );
}

// ---------- Page ----------
const LANG_STORAGE_KEY = "wedding.lang";

export default function Invitation() {
  const [lang, setLangState] = useState<Lang>(wedding.language.default);
  const [unlocked, setUnlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // Restore stored language preference (client-only to avoid hydration mismatch).
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
      if (stored && wedding.language.available.includes(stored)) {
        setLangState(stored);
      }
    } catch {
      /* noop */
    }
  }, []);

  // Sync <html lang> for screen readers and out-of-tree boundaries.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = htmlLang[lang];
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {
      /* noop */
    }
  };

  const musicAvailable = wedding.features.music && !!wedding.music.src;

  const onUnlock = () => {
    setUnlocked(true);
    setTimeout(() => {
      document.getElementById("greeting")?.scrollIntoView({ behavior: "smooth" });
    }, 400);
    if (musicAvailable && audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero
        lang={lang}
        setLang={setLang}
        onUnlock={onUnlock}
        unlocked={unlocked}
        music={{ available: musicAvailable, playing }}
        toggleMusic={toggleMusic}
      />
      {musicAvailable && (
        <audio ref={audioRef} src={wedding.music.src} loop preload="none" />
      )}

      <div id="greeting">
        <Greeting lang={lang} />
      </div>
      {wedding.features.countdown && <Countdown lang={lang} />}
      {wedding.features.calendar && <Calendar lang={lang} />}
      <Details lang={lang} />
      <Venue lang={lang} />
      <Location lang={lang} />
      {wedding.features.rsvp && <RSVP lang={lang} />}
      <Gifts lang={lang} />
      <Closing lang={lang} />
      <Share lang={lang} />
    </main>
  );
}
