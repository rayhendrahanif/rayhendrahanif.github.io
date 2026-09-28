"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/content/site";

type Props = { locale: Locale; nav: Dictionary["nav"]; ui: Dictionary["ui"] };

const homeFor = (locale: Locale) => (locale === "id" ? "/id/" : "/");

export function SiteHeader({ locale, nav, ui }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pendingTarget = useRef<string | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  const rememberLocale = (l: Locale) => {
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b bg-paper/90 backdrop-blur-md transition-colors duration-300 ${
        scrolled || open ? "border-rule" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-4 sm:px-8">
        <a href={`${homeFor(locale)}#top`} className="mr-auto flex items-baseline gap-2 text-ink">
          <span className="font-serif text-sm text-teal-ink italic">dr.</span>
          <span className="font-serif text-xl">Rayhendra Hanif</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-8 text-sm text-ink-soft">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="underline-offset-8 transition-colors hover:text-ink hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <LocaleSwitch locale={locale} label={ui.langLabel} onPick={rememberLocale} />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? ui.themeToLight : ui.themeToDark}
            className="grid h-8 w-8 place-items-center text-ink-soft transition-colors hover:text-ink"
          >
            {theme === "dark" ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? ui.close : ui.menu}
            className="grid h-8 w-8 place-items-center text-ink md:hidden"
          >
            {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      <AnimatePresence
        onExitComplete={() => {
          const id = pendingTarget.current;
          pendingTarget.current = null;
          if (id) document.getElementById(id)?.scrollIntoView();
        }}
      >
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-rule bg-paper md:hidden"
          >
            <ul className="px-4 py-4 sm:px-8">
              {nav.map((item, i) => (
                <li key={item.id} className="border-b border-rule last:border-b-0">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      // Close first, then scroll: the collapsing menu would otherwise cancel the jump
                      e.preventDefault();
                      setOpen(false);
                      history.replaceState(null, "", `#${item.id}`);
                      pendingTarget.current = item.id;
                    }}
                    className="flex items-baseline gap-4 py-4 font-serif text-2xl text-ink"
                  >
                    <span className="figures-tabular font-sans text-xs text-teal-ink">0{i + 1}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function LocaleSwitch({ locale, label, onPick }: { locale: Locale; label: string; onPick: (l: Locale) => void }) {
  const options: { code: Locale; href: string; name: string }[] = [
    { code: "en", href: "/", name: "English" },
    { code: "id", href: "/id/", name: "Bahasa Indonesia" },
  ];
  return (
    <div role="group" aria-label={label} className="flex items-center text-xs font-semibold tracking-[0.12em]">
      {options.map((o, i) => (
        <span key={o.code} className="flex items-center">
          {i > 0 && <span aria-hidden className="mx-2 h-4 w-px bg-rule-strong" />}
          {o.code === locale ? (
            <span aria-current="true" className="text-ink">
              {o.code.toUpperCase()}
            </span>
          ) : (
            <a
              href={o.href}
              hrefLang={o.code}
              lang={o.code}
              onClick={() => onPick(o.code)}
              aria-label={o.name}
              className="text-ink-faint transition-colors hover:text-teal-ink"
            >
              {o.code.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
