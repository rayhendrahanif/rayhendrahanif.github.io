import { ArrowUp, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { CopyEmail } from "@/components/CopyEmail";
import { Hero } from "@/components/Hero";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { SiteHeader } from "@/components/SiteHeader";
import { dictionaries, person, type Entry, type Locale } from "@/content/site";

export function Site({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    honorificPrefix: "dr.",
    jobTitle: locale === "id" ? "Dokter Umum" : "General Practitioner",
    url: "https://rayhendrahanif.github.io/",
    image: "https://rayhendrahanif.github.io/images/profile.jpg",
    email: `mailto:${person.email}`,
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universitas Andalas" },
    address: { "@type": "PostalAddress", addressLocality: "Jakarta Selatan", addressCountry: "ID" },
    sameAs: person.links.map((l) => l.href),
  };

  return (
    <>
      <a
        href="#main"
        className="fixed top-4 left-4 z-50 -translate-y-32 bg-ink px-4 py-2 text-sm text-paper transition-transform focus:translate-y-0"
      >
        {t.ui.skip}
      </a>
      <SiteHeader locale={locale} nav={t.nav} ui={t.ui} />

      <main id="main">
        <Hero hero={t.hero} ui={t.ui} facts={t.facts} />

        <Section id="profile" number="01" heading={t.profile.heading}>
          <div className="max-w-2xl space-y-8 font-serif text-xl leading-relaxed text-ink sm:text-2xl">
            {t.profile.body.map((p, i) => (
              <p key={i} className={i === 0 ? "text-ink" : "text-ink-soft"}>
                {p}
              </p>
            ))}
          </div>
        </Section>

        <Section id="training" number="02" heading={t.training.heading} intro={t.training.intro}>
          <Group heading={t.training.clinicalHeading}>
            <Entries items={t.training.clinical} />
          </Group>
          <Group heading={t.training.educationHeading}>
            <Entries items={t.training.education} compact />
          </Group>
          <Group heading={t.training.certsHeading}>
            <Entries items={t.training.certs} compact />
          </Group>
        </Section>

        <Section id="research" number="03" heading={t.research.heading} intro={t.research.intro}>
          <Group heading={t.research.rolesHeading}>
            <Entries items={t.research.roles} />
          </Group>

          <Group heading={t.research.presentationsHeading}>
            <PhotoCarousel
              slides={t.research.presentations
                .filter((p) => p.image)
                .map((p) => ({
                  ...p.image!,
                  caption: `${p.outcome ? p.outcome + " — " : ""}${p.format}, ${p.event} (${p.year})`,
                }))}
              labels={{ region: t.ui.carousel, previous: t.ui.previousPhoto, next: t.ui.nextPhoto, goTo: t.ui.showPhoto }}
            />
            <ol className="mt-8 border-t border-rule">
              {t.research.presentations.map((p) => (
                <li
                  key={`${p.year}-${p.event}`}
                  className="grid grid-cols-1 gap-4 border-b border-rule py-8 sm:grid-cols-[8rem_1fr] sm:gap-8"
                >
                  <p className="figures-tabular text-sm text-ink-faint">{p.year}</p>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-teal-ink uppercase">{p.format}</p>
                    {p.title && <h4 className="mt-2 font-serif text-xl leading-snug text-ink">{p.title}</h4>}
                    <p className="mt-2 text-sm text-ink-soft">{p.event}</p>
                    {p.outcome && (
                      <p className="mt-4 inline-block border-l-2 border-teal pl-4 text-sm font-semibold text-ink">{p.outcome}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Group>

          <Group heading={t.research.publicationsHeading}>
            <ol>
              {t.research.publications.map((pub) => (
                <li key={pub.title} className="grid grid-cols-1 gap-4 border-b border-rule py-8 sm:grid-cols-[8rem_1fr] sm:gap-8">
                  <p className="figures-tabular text-sm text-ink-faint">{pub.year}</p>
                  <div>
                    <h4 className="font-serif text-xl leading-snug text-ink" lang="id">
                      {pub.title}
                    </h4>
                    {pub.translation && <p className="mt-2 text-sm text-ink-soft italic">{pub.translation}</p>}
                    <p className="mt-2 text-sm text-ink-soft">
                      <span className="italic">{pub.venue}</span>, {pub.year}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Group>
        </Section>

        <Section id="outreach" number="04" heading={t.outreach.heading} intro={t.outreach.intro}>
          <Group heading={t.outreach.deploymentsHeading}>
            <Entries items={t.outreach.deployments} />
          </Group>
          <Group heading={t.outreach.serviceHeading}>
            <Entries items={t.outreach.service} />
          </Group>
          <Group heading={t.outreach.leadershipHeading}>
            <Entries items={t.outreach.leadership} compact />
          </Group>
        </Section>

        <Section id="honours" number="05" heading={`${t.honors.heading} · ${t.skills.heading}`}>
          <Group heading={t.honors.heading}>
            <ul>
              {t.honors.items.map((h) => (
                <li key={h.title} className="grid grid-cols-1 gap-2 border-b border-rule py-6 sm:grid-cols-[8rem_1fr] sm:gap-8">
                  <p className="figures-tabular text-sm text-ink-faint">{h.year ?? "—"}</p>
                  <div>
                    <p className="font-serif text-xl text-ink">{h.title}</p>
                    <p className="mt-2 text-sm text-ink-soft">{h.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Group>
          <Group heading={t.skills.heading}>
            <dl>
              {t.skills.groups.map((g) => (
                <div key={g.label} className="grid grid-cols-1 gap-2 border-b border-rule py-6 sm:grid-cols-[8rem_1fr] sm:gap-8">
                  <dt className="text-sm text-ink-faint">{g.label}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-x-2 gap-y-2 text-base leading-relaxed text-ink">
                      {g.items.map((item) => (
                        <li key={item} className="after:ml-2 after:text-teal after:content-['/'] last:after:content-none">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </Group>
        </Section>

        <section id="contact" aria-labelledby="contact-title" className="border-t border-ink bg-paper-2">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 py-24 sm:px-8 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <p className="figures-tabular text-xs font-semibold tracking-[0.2em] text-teal-ink">06</p>
              <h2 id="contact-title" className="mt-4 font-serif text-5xl text-ink">
                {t.contactSection.heading}
              </h2>
              <p className="mt-8 max-w-sm text-ink-soft">{t.contactSection.body}</p>
            </div>

            <div className="lg:col-span-8">
              <p className="text-xs font-semibold tracking-[0.16em] text-ink-faint uppercase">{t.contactSection.emailLabel}</p>
              <a
                href={`mailto:${person.email}`}
                className="mt-4 block font-serif text-[clamp(1.75rem,5vw,3.5rem)] leading-tight break-all text-ink underline decoration-rule-strong decoration-1 underline-offset-8 transition-colors hover:text-teal-ink hover:decoration-teal sm:break-normal"
              >
                {person.email}
              </a>
              <div className="mt-4">
                <CopyEmail email={person.email} labels={{ copy: t.ui.copyEmail, copied: t.ui.copied }} />
              </div>

              <ul className="mt-16 border-t border-rule">
                <li className="border-b border-rule">
                  <a href={person.phoneHref} className="group flex items-baseline justify-between gap-4 py-4 text-ink">
                    <span className="text-sm text-ink-faint">{t.contactSection.phoneLabel}</span>
                    <span className="figures-tabular group-hover:text-teal-ink">{person.phoneDisplay}</span>
                  </a>
                </li>
                {person.links.map((l) => (
                  <li key={l.href} className="border-b border-rule">
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-4 py-4 text-ink"
                    >
                      <span className="text-sm text-ink-faint">{l.label}</span>
                      <span className="inline-flex items-center gap-2 group-hover:text-teal-ink">
                        {l.handle}
                        <ArrowUpRight size={16} strokeWidth={1.75} />
                      </span>
                    </a>
                  </li>
                ))}
                <li className="border-b border-rule">
                  <a href={person.cv} download="CV-Rayhendra-Hanif.pdf" className="group flex items-baseline justify-between gap-4 py-4 text-ink">
                    <span className="text-sm text-ink-faint">CV</span>
                    <span className="inline-flex items-center gap-2 group-hover:text-teal-ink">
                      {t.ui.downloadCv} (PDF)
                      <ArrowUpRight size={16} strokeWidth={1.75} />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-xs text-ink-faint sm:px-8">
          <p>
            © {new Date().getFullYear()} {person.name}. {t.ui.footer}
          </p>
          <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-ink">
            {t.ui.backToTop}
            <ArrowUp size={16} strokeWidth={1.75} />
          </a>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

/* Building blocks ---------------------------------------------------------- */

function Section({ id, number, heading, intro, children }: { id: string; number: string; heading: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-8">
        <header className="self-start lg:sticky lg:top-24 lg:col-span-4">
          <p className="figures-tabular text-xs font-semibold tracking-[0.2em] text-teal-ink">{number}</p>
          <h2 id={`${id}-title`} className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            {heading}
          </h2>
          {intro && <p className="mt-8 max-w-xs text-sm leading-relaxed text-ink-soft">{intro}</p>}
        </header>
        <div className="space-y-16 lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

function Group({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="border-b border-ink pb-4 text-xs font-semibold tracking-[0.2em] text-ink uppercase">{heading}</h3>
      {children}
    </div>
  );
}

function Entries({ items, compact = false }: { items: Entry[]; compact?: boolean }) {
  return (
    <ol>
      {items.map((e) => (
        <li
          key={`${e.period}-${e.role}`}
          className={`grid grid-cols-1 gap-2 border-b border-rule sm:grid-cols-[8rem_1fr] sm:gap-8 ${compact ? "py-4" : "py-8"}`}
        >
          <p className="figures-tabular pt-1 text-sm text-ink-faint">{e.period}</p>
          <div>
            <h4 className={`font-serif leading-snug text-ink ${compact ? "text-lg" : "text-2xl"}`}>{e.role}</h4>
            <p className="mt-1 text-sm text-ink-soft">
              {e.org}
              {e.place && <span className="text-ink-faint"> · {e.place}</span>}
            </p>
            {e.points && (
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-ink-soft">
                {e.points.map((pt) => (
                  <li key={pt} className="relative pl-6 before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-4 before:bg-teal">
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
