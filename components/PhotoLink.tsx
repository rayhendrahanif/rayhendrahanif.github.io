"use client";

import { X } from "lucide-react";
import { useRef } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
  caption: string;
  labels: { view: string; close: string };
};

/** Thumbnail that opens the full photo in a native <dialog>. Falls back to a plain link without JS. */
export function PhotoLink({ src, alt, width, height, position, caption, labels }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <a
        href={src}
        onClick={(e) => {
          if (!dialogRef.current?.showModal) return;
          e.preventDefault();
          dialogRef.current.showModal();
        }}
        aria-label={`${labels.view}: ${caption}`}
        className="group block overflow-hidden border border-rule bg-paper-2"
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: position }}
          className="aspect-[4/3] w-full object-cover grayscale-[35%] transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </a>

      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        className="m-auto max-h-[92vh] max-w-[92vw] overflow-visible bg-transparent p-0 backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
      >
        <figure className="flex flex-col items-center gap-4">
          <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className="max-h-[80vh] w-auto max-w-[92vw] object-contain" />
          <figcaption className="max-w-xl text-center text-sm text-paper">{caption}</figcaption>
        </figure>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label={labels.close}
          className="fixed top-4 right-4 grid h-12 w-12 place-items-center bg-paper text-ink"
        >
          <X size={20} strokeWidth={1.75} />
        </button>
      </dialog>
    </>
  );
}
