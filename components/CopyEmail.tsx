"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyEmail({ email, labels }: { email: string; labels: { copy: string; copied: string } }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={labels.copy}
      className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-ink-faint uppercase transition-colors hover:text-teal-ink"
    >
      {copied ? <Check size={16} strokeWidth={2} /> : <Copy size={16} strokeWidth={1.75} />}
      <span aria-live="polite">{copied ? labels.copied : labels.copy.split(" ")[0]}</span>
    </button>
  );
}
