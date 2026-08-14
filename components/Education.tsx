"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { content } from "@/lib/content";
import { Reveal, SectionHeading } from "./Reveal";

export default function Education() {
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <section id="education" className="relative mx-auto max-w-3xl py-20">
      <SectionHeading index="04" title={c.sectionHeadings.education.title} />

      <div className="grid gap-8 sm:grid-cols-2">
        <Reveal>
          <div className="rounded-xl border border-hair bg-surface/50 p-6">
            <h3 className="font-display text-lg font-medium text-fg">{c.education.school}</h3>
            <p className="mt-1.5 text-[14px] text-muted">{c.education.degree}</p>
            <div className="mt-4 flex items-center justify-between border-t border-hair pt-3 font-mono text-xs text-faint">
              <span>{c.education.period}</span>
              <span className="text-muted">{c.education.detail}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-xl border border-hair bg-surface/50 p-6">
            <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
              {c.education.certificationsHeading}
            </h3>
            <ul className="mt-3 space-y-3">
              {c.education.certifications.map((cert) => (
                <li key={cert.name} className="flex items-baseline justify-between gap-3">
                  <span className="text-[14px] text-fg">{cert.name}</span>
                  <span className="shrink-0 font-mono text-[11px] text-faint">{cert.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
