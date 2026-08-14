"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SmoothScroll from "./SmoothScroll";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SmoothScroll>
        {children}
        </SmoothScroll>
      </LanguageProvider>
    </ThemeProvider>
  );
}
