"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { content } from "@/lib/content";
import { Reveal, SectionHeading } from "./Reveal";

export default function Experience() {
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <section id="work" className="relative mx-auto max-w-3xl py-20">
      <SectionHeading
        index="01"
        title={c.sectionHeadings.work.title}
        note={c.sectionHeadings.work.note}
      />

      <div className="relative">
        <div className="absolute bottom-0 left-[7px] top-2 w-px bg-hair sm:left-[7px]" />

        <ol className="space-y-14">
          {c.experience.map((role, i) => (
            <Reveal key={role.id} delay={i * 0.06}>
              <li className="relative pl-8">
                <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-ink bg-fg ring-1 ring-hair" />

                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-lg font-medium text-fg">
                    {role.role} <span className="text-muted">&middot; {role.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-faint">{role.period}</span>
                </div>

                <p className="mt-0.5 font-mono text-xs text-muted">
                  {role.location} — {role.duration}
                </p>

                <ul className="mt-3 space-y-2">
                  {role.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[14.5px] leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-hair" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {role.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-hair px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
