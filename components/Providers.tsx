"use client";

import { useEffect, type ReactNode } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LoaderProvider } from "@/contexts/LoaderContext";
import SmoothScroll from "./SmoothScroll";
import Loader from "./Loader";

export default function Providers({ children }: { children: ReactNode }) {
  // Effects run bottom-up, so by the time this runs the whole page tree has
  // hydrated — the Loader polls this flag as its "components" readiness gate.
  useEffect(() => {
    window.__hydrated = true;
  }, []);

  return (
    <LoaderProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SmoothScroll>
            <Loader />
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </ThemeProvider>
    </LoaderProvider>
  );
}
