"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { content } from "@/lib/content";
import { Reveal, SectionHeading } from "./Reveal";
import GithubCalendar from "./GithubCalendar";
import { StackIcon } from "./StackIcon";

export default function Stack() {
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <section id="stack" className="relative mx-auto max-w-3xl px-4 py-20">
      <SectionHeading index="03" title={c.sectionHeadings.stack.title} />

      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        {c.stackGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.05}>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
                {group.label}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 rounded-md border border-hair px-2.5 py-1 text-[13px] text-muted transition-colors hover:border-fg/30 hover:text-fg"
                  >
                    <StackIcon name={item} className="shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 border-t border-hair pt-6">
        <GithubCalendar />
      </div>
    </section>
  );
}
