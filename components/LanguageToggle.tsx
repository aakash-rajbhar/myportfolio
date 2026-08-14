"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { content } from "@/lib/content";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  const c = content[lang];

  return (
    <button
      onClick={toggleLang}
      aria-label="Toggle language / भाषा बदलें"
      className="flex h-[30px] items-center rounded-full border border-hair bg-surface-hi px-2.5 font-mono text-[11px] text-muted transition-colors hover:border-fg/30 hover:text-fg"
    >
      {c.langToggle.label}
    </button>
  );
}
