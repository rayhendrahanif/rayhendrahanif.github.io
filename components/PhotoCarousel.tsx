"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

export type Slide = { src: string; alt: string; width: number; height: number; position?: string; caption: string };

type Props = {
  slides: Slide[];
  labels: { region: string; previous: string; next: string; goTo: string };
  /** Auto-advance interval in ms */
  interval?: number;
};

/**
 * Sliding photo carousel: auto-advances, pauses on hover/focus, arrows, dots and swipe.
 * Auto-advance is off for visitors who prefer reduced motion.
 */
export function PhotoCarousel({ slides, labels, interval = 5000 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const startX = useRef<number | null>(null);
  const count = slides.length;

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, count, interval, index]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") startX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
  };

  const current = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={labels.region}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="mt-8"
    >
      <div
        className="relative touch-pan-y overflow-hidden border border-rule bg-ink"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (startX.current = null)}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={s.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={i !== index}
              className="aspect-[16/10] w-full shrink-0"
            >
              <img
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.height}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                style={{ objectPosition: s.position }}
                className="h-full w-full object-cover select-none"
              />
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label={labels.previous}
              className="absolute top-1/2 left-4 grid h-12 w-12 -translate-y-1/2 place-items-center bg-paper/90 text-ink transition-colors hover:bg-paper"
            >
              <ChevronLeft size={20} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label={labels.next}
              className="absolute top-1/2 right-4 grid h-12 w-12 -translate-y-1/2 place-items-center bg-paper/90 text-ink transition-colors hover:bg-paper"
            >
              <ChevronRight size={20} strokeWidth={1.75} />
            </button>
          </>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-8">
        <p className="text-sm text-ink-soft" aria-live="polite">
          <span className="figures-tabular mr-4 text-xs font-semibold tracking-[0.16em] text-teal-ink">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          {current.caption}
        </p>
        {count > 1 && (
          <div className="flex shrink-0 gap-2 pt-2">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${labels.goTo} ${i + 1}`}
                aria-current={i === index}
                className={`h-1 transition-all duration-300 ${i === index ? "w-8 bg-teal" : "w-4 bg-rule-strong hover:bg-ink-faint"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
