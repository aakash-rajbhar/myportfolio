"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { content } from "@/lib/content";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? c.themeToggle.toLight : c.themeToggle.toDark}
      className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-hair bg-surface-hi text-muted transition-colors hover:border-fg/30 hover:text-fg"
    >
      {theme === "dark" ? (
        // sun — shown when dark, click to go light
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path
            strokeLinecap="round"
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
          />
        </svg>
      ) : (
        // moon — shown when light, click to go dark
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
          />
        </svg>
      )}
    </button>
  );
}
