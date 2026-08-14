"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/content";

const LanguageContext = createContext<{ lang: Lang; toggleLang: () => void }>({
  lang: "en",
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "en" || stored === "hi") setLang(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "en" ? "hi" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>{children}</LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
