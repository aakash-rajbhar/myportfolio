"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { content } from "@/lib/content";
import { Reveal, SectionHeading } from "./Reveal";
import Link from "next/link";

export default function Projects() {
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <section id="projects" className="relative mx-auto max-w-3xl px-6 py-20">
      <SectionHeading
        index="02"
        title={c.sectionHeadings.projects.title}
        note={c.sectionHeadings.projects.note}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {c.projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <article className="group flex h-full flex-col rounded-xl border border-hair bg-surface/50 p-6 transition-colors hover:border-fg/30">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-medium text-fg">{p.name}</h3>
                <div className="flex shrink-0 gap-2 font-mono text-[11px] text-muted">
                  <Link href={p.links.code} target="_blank" className="transition-colors hover:text-fg">
                    {p.labels.code}
                  </Link>
                  <span className="text-hair">/</span>
                  <Link href={p.links.demo} target="_blank" className="transition-colors hover:text-fg">
                    {p.labels.demo}
                  </Link>
                </div>
              </div>

              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{p.description}</p>

              <ul className="mt-4 space-y-2">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-hair" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-hair pt-4">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-surface-hi px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
