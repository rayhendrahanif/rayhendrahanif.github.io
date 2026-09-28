import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { LivePhoto } from "@/components/LivePhoto";
import { person, type Dictionary } from "@/content/site";

type Props = { hero: Dictionary["hero"]; ui: Dictionary["ui"]; facts: Dictionary["facts"] };

export function Hero({ hero, ui, facts }: Props) {
  return (
    <section id="top" aria-labelledby="hero-name" className="relative pt-24 sm:pt-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Left: type-led column */}
        <div className="lg:col-span-7 lg:pt-16">
          <p className="rise text-xs font-semibold tracking-[0.2em] text-teal-ink uppercase">{hero.kicker}</p>

          <h1
            id="hero-name"
            className="rise mt-8 font-serif text-[clamp(3.5rem,11vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.03em] text-ink [animation-delay:80ms]"
          >
            Rayhendra
            <br />
            <span className="ml-[0.6em] italic">Hanif</span>
          </h1>

          <p className="rise mt-8 max-w-md font-serif text-2xl leading-snug text-ink italic [animation-delay:160ms]">
            {hero.title}
          </p>

          <p className="rise mt-8 max-w-xl text-base leading-relaxed text-ink-soft [animation-delay:240ms] sm:text-lg">
            {hero.summary}
          </p>

          <div className="rise mt-12 flex flex-wrap items-center gap-8 [animation-delay:320ms]">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-teal-ink px-6 py-4 text-sm font-semibold text-paper transition-colors hover:bg-ink"
            >
              {ui.contact}
              <ArrowDownRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href={person.cv}
              download="CV-Rayhendra-Hanif.pdf"
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink transition-colors hover:border-teal-ink hover:text-teal-ink"
            >
              {ui.downloadCv}
              <ArrowUpRight size={16} strokeWidth={2} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <p className="rise mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-ink-soft [animation-delay:400ms]">
            <span>{hero.based}</span>
            <span aria-hidden className="hidden h-4 w-px bg-rule-strong sm:block" />
            <span className="tracking-wide">{hero.credentials}</span>
          </p>
        </div>

        {/* Right: the live photo, pushed down and off-axis */}
        <figure className="rise relative mx-auto w-full max-w-sm [animation-delay:200ms] lg:col-span-5 lg:mt-32 lg:ml-8 lg:max-w-none">
          <div className="relative mr-4 sm:mr-8">
            <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 border border-rule-strong sm:translate-x-8 sm:translate-y-8" />
            <LivePhoto
            src={person.portrait.src}
            srcSet={person.portrait.srcSet}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 384px, 90vw"
            width={person.portrait.width}
            height={person.portrait.height}
            alt={hero.figureAlt}
            video={person.liveVideo}
            labels={{ play: ui.livePlay, pause: ui.livePause, hint: ui.liveHint }}
            />
          </div>
          <figcaption className="mt-12 flex gap-4 text-xs leading-relaxed text-ink-faint sm:mt-16">
            <span className="font-semibold tracking-[0.16em] text-teal-ink uppercase">Fig. 1</span>
            <span className="max-w-64">{hero.figureCaption}</span>
          </figcaption>
        </figure>
      </div>

      {/* Key figures, set as a ruled row rather than cards */}
      <div className="mx-auto mt-24 max-w-6xl px-4 sm:px-8">
        <dl className="grid grid-cols-1 border-t border-ink sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-row-reverse items-baseline justify-end gap-4 border-b border-rule py-8 sm:border-b-0 sm:pr-8">
              <dt className="max-w-48 text-sm leading-snug text-ink-soft">{f.label}</dt>
              <dd className="figures-tabular font-serif text-5xl text-teal-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
