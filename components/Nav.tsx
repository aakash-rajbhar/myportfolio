"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { content } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import Link from "next/link";

const sectionIds = ["work", "projects", "stack", "education", "contact"] as const;

export default function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { lang } = useLanguage();
  const c = content[lang];
  const [active, setActive] = useState<string>("");
  const [isMac, setIsMac] = useState(true);

  const sections = sectionIds.map((id) => ({ id, label: c.nav[id] }));

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPod|iPad/i.test(navigator.platform ?? navigator.userAgent));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4"
    >
      <div className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-xl border border-hair bg-surface/80 px-4 py-2.5 backdrop-blur-md">
        <Link
          href="/"
          className="shrink-0 font-mono text-[13px] tracking-tight text-fg transition-colors hover:text-fg"
        >
          aakash<span className="text-fg">.</span>rajbhar
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {sections.map((s) => (
            <Link
              key={s.id}
              href={`#${s.id}`}
              className={`relative font-mono text-[12px] uppercase tracking-wide transition-colors ${
                active === s.id ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {s.label}
              {active === s.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-fg"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-1.5 rounded-full border border-hair bg-surface-hi px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-fg/40 hover:text-fg"
            aria-label="Open command palette"
          >
            <span>{isMac ? "⌘" : "Ctrl"}</span>
            <span>K</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
