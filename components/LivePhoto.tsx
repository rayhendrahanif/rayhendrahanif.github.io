"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

type LivePhotoProps = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width: number;
  height: number;
  alt: string;
  /** Short muted clip (2–4 s), best as MP4 (H.264) + WebM. When empty the frame still tilts but has no "Live" state. */
  video?: { src: string; type: string }[];
  labels: { play: string; pause: string; hint: string };
  className?: string;
};

// Slow, heavy spring: the frame should drift after the cursor, not snap to it.
const SPRING = { stiffness: 55, damping: 16, mass: 1.4 };

export function LivePhoto({ src, srcSet, sizes, width, height, alt, video, labels, className = "" }: LivePhotoProps) {
  const reduceMotion = useReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imageReady, setImageReady] = useState(false);
  const [wantsPlay, setWantsPlay] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Pointer position inside the frame, normalised to -0.5 … 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);

  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  // The photo slides slightly against the tilt, so the frame reads as a window with depth
  const imageX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const imageY = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const glareX = useTransform(sx, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(sy, [-0.5, 0.5], [10, 90]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.22), transparent 55%)`;

  // Cached images can finish loading before hydration, so check once on mount too
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) setImageReady(true);
  }, []);

  const play = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    setWantsPlay(true);
    el.currentTime = 0;
    el.play().catch(() => setWantsPlay(false));
  }, []);

  const stop = useCallback(() => {
    const el = videoRef.current;
    setWantsPlay(false);
    if (el) el.pause();
  }, []);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && hasVideo && !reduceMotion) play();
  };

  const handleLeave = (e: PointerEvent<HTMLDivElement>) => {
    px.set(0);
    py.set(0);
    if (e.pointerType === "mouse") stop();
  };

  const toggle = () => (wantsPlay ? stop() : play());
  const hasVideo = Boolean(video && video.length);
  const showVideo = hasVideo && wantsPlay && videoPlaying;

  return (
    <div
      className={`relative [perspective:1200px] ${className}`}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      <motion.div
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden border border-rule bg-paper-2 will-change-transform"
      >
        <div className="relative" style={{ aspectRatio: `${width} / ${height}` }}>
          {/* Loading skeleton: a faint sweep and a hairline that fills while the portrait decodes */}
          {!imageReady && (
            <div aria-hidden className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-paper/70 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 h-px overflow-hidden bg-rule">
                <div className="h-full w-1/3 animate-[shimmer_1.2s_linear_infinite] bg-teal" />
              </div>
            </div>
          )}

          <motion.img
            ref={imgRef}
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            width={width}
            height={height}
            alt={alt}
            fetchPriority="high"
            decoding="async"
            onLoad={() => setImageReady(true)}
            style={reduceMotion ? undefined : { x: imageX, y: imageY, scale: 1.06 }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${imageReady ? "opacity-100" : "opacity-0"}`}
          />

          {hasVideo && (
            <motion.video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
              tabIndex={-1}
              onPlaying={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
              style={reduceMotion ? undefined : { x: imageX, y: imageY, scale: 1.06 }}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${showVideo ? "opacity-100" : "opacity-0"}`}
            >
              {video!.map((v) => (
                <source key={v.src} src={v.src} type={v.type} />
              ))}
            </motion.video>
          )}

          {!reduceMotion && (
            <motion.div aria-hidden style={{ backgroundImage: glare }} className="pointer-events-none absolute inset-0 mix-blend-soft-light" />
          )}

          {hasVideo && (
            <button
              type="button"
              onClick={toggle}
              aria-pressed={wantsPlay}
              aria-label={wantsPlay ? labels.pause : labels.play}
              className="absolute top-4 left-4 flex items-center gap-2 bg-paper/85 px-2 py-1 text-[0.6875rem] font-semibold tracking-[0.16em] text-ink uppercase backdrop-blur-sm"
            >
              <LiveGlyph active={showVideo} />
              Live
            </button>
          )}
        </div>
      </motion.div>

      {hasVideo && <p className="mt-4 text-xs text-ink-faint">{labels.hint}</p>}
    </div>
  );
}

/** The concentric "live" mark: a dotted ring that turns while the clip plays. */
function LiveGlyph({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
      <circle cx="8" cy="8" r="2.25" fill="currentColor" />
      <circle cx="8" cy="8" r="4.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle
        cx="8"
        cy="8"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1.2 1.8"
        className={active ? "origin-center animate-[spin_6s_linear_infinite]" : ""}
      />
    </svg>
  );
}
