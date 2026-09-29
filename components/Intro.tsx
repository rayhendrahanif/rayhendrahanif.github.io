"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { person, type Dictionary, type Media } from "@/content/site";

/**
 * Apple-style opening: a full-screen name, a scroll-driven showcase that grows
 * from a card to full bleed while short lines fade in, then a swipeable
 * highlights row. Always dark, whatever the site theme.
 */
export function Intro({ t }: { t: Dictionary["intro"] }) {
  return (
    <div id="intro" className="bg-[#050a0a] text-[#f5f5f4]">
      <Opening t={t} />
      <Showcase t={t} />
      <Highlights t={t} />
    </div>
  );
}

function Opening({ t }: { t: Dictionary["intro"] }) {
  return (
    <section
      id="top"
      aria-labelledby="intro-title"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-16 text-center sm:px-8"
    >
      {/* one soft teal light, low and off-centre */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/3 left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(47,184,174,0.18),transparent)]"
      />
      <p className="rise text-sm font-semibold tracking-[0.18em] text-[#5fd3c9] uppercase">{t.eyebrow}</p>
      <h1
        id="intro-title"
        className="rise mt-8 font-serif text-[clamp(3.5rem,13vw,11rem)] leading-[0.9] font-medium tracking-[-0.035em] [animation-delay:100ms]"
      >
        Rayhendra <span className="italic">Hanif.</span>
      </h1>
      <p className="rise mt-8 max-w-xl text-xl leading-snug text-[#b9c0bd] [animation-delay:220ms] sm:text-2xl">{t.subtitle}</p>
      <div className="rise mt-12 flex flex-wrap items-center justify-center gap-8 text-lg [animation-delay:340ms]">
        <a href="#contact" className="rounded-full bg-[#f5f5f4] px-6 py-2 font-medium text-[#050a0a] transition-colors hover:bg-white">
          {t.ctaContact}
        </a>
        <a href="#research" className="group inline-flex items-center gap-1 text-[#5fd3c9] hover:underline">
          {t.ctaWork}
          <ChevronRight size={18} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
      <p aria-hidden className="absolute bottom-8 text-xs tracking-[0.2em] text-[#8a918e] uppercase">
        {t.scroll}
        <span className="mx-auto mt-2 block h-8 w-px animate-pulse bg-[#8a918e]" />
      </p>
    </section>
  );
}

function Showcase({ t }: { t: Dictionary["intro"] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Progress through the pinned section, 0 → 1, derived from page scroll.
  // (Computed in JS on purpose: the target-based scroll timeline mis-measures sticky layouts.)
  const { scrollY } = useScroll();
  const [bounds, setBounds] = useState({ top: 0, range: 1 });
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      setBounds({ top, range: Math.max(1, el.offsetHeight - window.innerHeight) });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const scrollYProgress = useTransform(scrollY, (v) => Math.min(1, Math.max(0, (v - bounds.top) / bounds.range)));
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.64, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.4], [32, 0]);
  const shade = useTransform(scrollYProgress, [0.3, 0.5], [0, 0.72]);
  const media = person.introMedia.showcase;

  if (reduce) {
    return (
      <section aria-label={t.lines.join(" ")} className="relative h-[100svh] overflow-hidden">
        <MediaFill media={media} alt={t.showcaseAlt} />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center">
          {t.lines.map((line) => (
            <p key={line} className="font-serif text-4xl sm:text-6xl">
              {line}
            </p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label={t.lines.join(" ")} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <motion.div style={{ scale, borderRadius: radius }} className="relative h-full w-full overflow-hidden will-change-transform">
          <MediaFill media={media} alt={t.showcaseAlt} />
          <motion.div style={{ opacity: shade }} className="absolute inset-0 bg-black" />
        </motion.div>
        {t.lines.map((line, i) => (
          <Line key={line} text={line} index={i} total={t.lines.length} progress={scrollYProgress} />
        ))}
        {/* Without JavaScript nothing drives the fade, so show the lines stacked */}
        <noscript>
          <style>{`.intro-line{opacity:1!important;transform:none!important;position:static!important}.intro-lines-nojs{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:1rem;background:rgba(0,0,0,.7)}`}</style>
        </noscript>
      </div>
    </section>
  );
}

/** Each line gets its own slice of the scroll; the last one stays on screen. */
function Line({ text, index, total, progress }: { text: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = 0.45 + index * 0.16;
  const last = index === total - 1;
  const opacity = useTransform(
    progress,
    last ? [start, start + 0.06] : [start, start + 0.06, start + 0.12, start + 0.16],
    last ? [0, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, start + 0.08], [24, 0]);
  return (
    <motion.p
      style={{ opacity, y }}
      className="intro-line pointer-events-none absolute inset-x-4 text-center font-serif text-[clamp(2.25rem,6vw,5rem)] leading-tight tracking-[-0.02em] [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]"
    >
      {text}
    </motion.p>
  );
}

function Highlights({ t }: { t: Dictionary["intro"] }) {
  const rail = useRef<HTMLUListElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 16), behavior: "smooth" });
  };

  return (
    <section aria-labelledby="highlights-title" className="py-24 sm:py-32">
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-8 px-4 sm:px-8">
        <h2 id="highlights-title" className="font-serif text-5xl tracking-[-0.02em] sm:text-7xl">
          {t.highlightsHeading}
        </h2>
        <div className="hidden gap-4 sm:flex">
          <RoundButton label={t.previous} onClick={() => scrollBy(-1)}>
            <ChevronLeft size={20} strokeWidth={2} />
          </RoundButton>
          <RoundButton label={t.next} onClick={() => scrollBy(1)}>
            <ChevronRight size={20} strokeWidth={2} />
          </RoundButton>
        </div>
      </div>

      <ul
        ref={rail}
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 lg:scroll-px-[max(2rem,calc((100vw-72rem)/2+2rem))] lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))] [&::-webkit-scrollbar]:hidden"
      >
        {t.highlights.map((h, i) => {
          const media = person.introMedia.highlights[i];
          if (!media) return null;
          return (
            <li key={h.title} className="relative aspect-[4/5] w-[80vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-white/5 sm:w-96">
              <MediaFill media={media} alt={h.alt} lazy />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 top-0 p-8">
                <p className="text-2xl font-semibold tracking-tight">{h.title}</p>
                <p className="mt-2 text-sm text-[#d4d8d6]">{h.caption}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function RoundButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-[#f5f5f4] transition-colors hover:bg-white/20"
    >
      {children}
    </button>
  );
}

/** Photo or muted looping video that covers its box. */
function MediaFill({ media, alt, lazy = false }: { media: Media; alt: string; lazy?: boolean }) {
  const cls = "absolute inset-0 h-full w-full object-cover";
  if (media.type === "video") {
    return (
      <video
        className={cls}
        style={{ objectPosition: media.position }}
        src={media.src}
        poster={media.poster}
        muted
        loop
        autoPlay
        playsInline
        preload={lazy ? "none" : "metadata"}
        aria-label={alt}
      />
    );
  }
  return (
    <img
      className={cls}
      style={{ objectPosition: media.position }}
      src={media.src}
      alt={alt}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      draggable={false}
    />
  );
}
