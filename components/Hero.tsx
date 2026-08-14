"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { content } from "@/lib/content";
import { Clock } from "lucide-react";

export default function Hero() {
  const { lang } = useLanguage();
  const c = content[lang];
  const stats = [
    { value: "3", label: c.hero.statsLabels[0] },
    { value: "2", label: c.hero.statsLabels[1] },
    { value: "200+", label: c.hero.statsLabels[2] },
    { value: "9.2", label: c.hero.statsLabels[3] },
  ];

  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const clock = now
    ? now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "··:··:··";

  return (
    <section id="top" className="relative px-6 pb-20 pt-28 min-h-screen flex flex-col justify-center">
      <div className="mx-auto w-full max-w-3xl">
        {/* profile card -- banner + avatar, borrowing the shape of a social
            profile header but built entirely from resume facts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-xl border border-hair bg-ink/70"
        >
          {/* banner */}
          <div className="relative h-28 overflow-hidden bg-surface-hi sm:h-32">
            <div
              className="absolute inset-0 bg-grid-schema bg-[size:28px_28px] opacity-60"
              style={{
                maskImage: "linear-gradient(to bottom, black, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
              }}
            />
            <div className="absolute right-8 top-4 flex items-center gap-1 rounded-full border border-hair/80 bg-ink/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted backdrop-blur-sm">
              <Clock size={12} /> {clock}
            </div>
          </div>

          <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            {/* avatar overlapping the banner, like a profile header */}
            <div className="-mt-10 flex items-end justify-between sm:-mt-12">
              <div className="z-10 flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border-2 border-ink bg-surface-hi font-display text-2xl font-medium text-fg shadow-lg shadow-black/40 sm:h-24 sm:w-24 sm:text-3xl">
                <Image src="/profile.png" alt={c.name} width={80} height={80} className="w-full h-full" />
              </div>
              <span className="mb-1 flex items-center gap-1.5 rounded-full border border-hair bg-ink/60 px-2.5 py-1 font-mono text-[10px] text-muted backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-fg" />
                {c.hero.badge}
              </span>
            </div>

            <div className="mt-4">
              <h1 className="font-display text-2xl font-medium tracking-tight text-fg sm:text-[28px]">
                {c.name}
              </h1>
              <p className="mt-0.5 font-mono text-[13px] text-faint">
                @aakash-rajbhar &middot; {c.location}
              </p>
            </div>

            {/* signature: the "diff" -- the site's one real aesthetic risk,
                grounded in the subject's own material (git diffs) instead
                of a generic hero headline */}
            <div className="mt-6 space-y-1 rounded-lg border border-hair bg-ink/40 px-4 py-3.5 font-mono text-[13px] leading-relaxed sm:text-sm">
              <p className="text-fg">
                <span className="text-faint">+ </span>
                {c.hero.diffPlus1}
              </p>
              <p className="text-fg">
                <span className="text-faint">+ </span>
                {c.hero.diffPlus2}
              </p>
              <p className="text-faint line-through decoration-faint/60">
                <span className="text-faint no-underline">- </span>
                {c.hero.diffMinus}
              </p>
            </div>

            <p className="mt-6 max-w-xl text-balance text-[15px] leading-relaxed text-muted sm:text-base">
              {c.tagline} {c.hero.bioBefore}
              <span className="text-fg">{c.hero.bioCompany}</span>
              {c.hero.bioAfter}
            </p>

            {/* stats row -- following/followers, repurposed as real resume facts */}
            <div className="mt-7 grid grid-cols-4 gap-2 border-y border-hair py-5">
              {stats.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <div className="font-display text-xl font-medium text-fg sm:text-2xl">
                    {s.value}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-faint sm:text-[11px]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="rounded-full bg-fg px-5 py-2.5 font-mono text-[13px] text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                {c.hero.ctaPrimary}
              </a>
              <a
                href="/Aakash_Rajbhar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="rounded-full border border-hair px-5 py-2.5 font-mono text-[13px] text-fg transition-colors hover:border-fg/40"
              >
                {c.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
