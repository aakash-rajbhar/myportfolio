"use client";

import { useState } from "react";
import { profile } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { content } from "@/lib/content";
import { Reveal } from "./Reveal";
import GithubCalendar from "./GithubCalendar";
import Link from "next/link";

export default function Footer() {
  const { lang } = useLanguage();
  const c = content[lang];
  const [copied, setCopied] = useState(false);

  const paragraph = c.footer.paragraph.replace("{location}", c.location);

  return (
    <section id="contact" className="relative mx-auto max-w-3xl py-20">
      <Reveal>
        <div className="rounded-2xl border border-hair bg-surface/50 p-8 sm:p-12">
          <span className="font-mono text-xs text-muted">{c.footer.eyebrow}</span>
          <h2 className="mt-3 text-balance font-display text-3xl font-medium tracking-tight text-fg sm:text-4xl">
            {c.footer.heading}
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">{paragraph}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(profile.email);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              }}
              className="rounded-full bg-fg px-5 py-2.5 font-mono text-[13px] text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              {copied ? c.footer.copiedLabel : profile.email}
            </button>
            <Link
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              target="_blank"
              className="rounded-full border border-hair px-5 py-2.5 font-mono text-[13px] text-fg transition-colors hover:border-fg/40"
            >
              {profile.phone}
            </Link>
          </div>

          {/*<div className="mt-10 border-t border-hair pt-6">
            <GithubCalendar />
          </div>*/}

          <div className="mt-8 flex flex-wrap gap-5 border-t border-hair pt-6 font-mono text-xs text-muted">
            <Link href={profile.links.github} target="_blank" className="transition-colors hover:text-fg">
              {c.footer.socialGithub}
            </Link>
            <Link href={profile.links.linkedin} target="_blank" className="transition-colors hover:text-fg">
              {c.footer.socialLinkedin}
            </Link>
            {/*<Link href={profile.links.site} target="_blank" className="transition-colors hover:text-fg">
              aakashrajbhar.vercel.app ↗
            </Link>*/}
          </div>
        </div>
      </Reveal>

      <p className="mt-10 text-center font-mono text-[11px] text-faint">
        {c.footer.creditPrefix} {new Date().getFullYear()} {c.name}.
      </p>
    </section>
  );
}
