"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useLoader } from "@/contexts/LoaderContext";

declare global {
  interface Window {
    __hydrated?: boolean;
  }
}

const BOOT_LINES = ["fonts", "assets", "components", "render"];

// The curtain lift duration, kept in sync with the exit transition below so
// content animations start exactly once the loader is fully gone.
const EXIT_MS = 700;
const MIN_MS = 900; // minimum display floor so the loader never flashes
const GATE_MS = 3000; // per-gate timeout so one hang can't stall the show
const FAILSAFE_MS = 5000;

// Resolve when the promise settles, but no later than `ms` — a slow or blocked
// resource (e.g. Google Fonts) must not block the whole loader.
function withTimeout(p: Promise<unknown>, ms: number) {
  return new Promise<void>((resolve) => {
    const t = setTimeout(resolve, ms);
    p.finally(() => {
      clearTimeout(t);
      resolve();
    });
  });
}

// Real "assets" gate: wait for images that actually block first paint —
// eager images, plus lazy ones already inside the viewport. Off-screen lazy
// images load only on scroll and must not stall the loader.
function waitForImages() {
  return new Promise<void>((resolve) => {
    const pending = Array.from(document.images).filter((img) => {
      if (img.complete) return false;
      if (img.getAttribute("loading") !== "lazy") return true;
      const rect = img.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    if (pending.length === 0) return resolve();
    let remaining = pending.length;
    const done = () => {
      if (--remaining === 0) resolve();
    };
    pending.forEach((img) => {
      if (img.complete) return done();
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
    });
  });
}

// Real "components" gate: a top-level effect in Providers sets __hydrated once
// every component has mounted (effects run bottom-up, so that flag means the
// whole page tree has hydrated).
function waitForHydration() {
  return new Promise<void>((resolve) => {
    if (window.__hydrated) return resolve();
    const poll = () => {
      if (window.__hydrated) resolve();
      else setTimeout(poll, 100);
    };
    poll();
  });
}

// Real "render" gate: a double-rAF guarantees the browser has produced a frame
// (layout + paint) after the hydrated UI was committed.
function waitForRender() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [checked, setChecked] = useState(0);
  const [done, setDone] = useState(false);
  const [hide, setHide] = useState(false);
  const lenis = useLenis();
  const { markReady } = useLoader();
  const targetRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    const reduceMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minMs = reduceMotion ? 200 : MIN_MS;
    const start = performance.now();

    const gates = [
      () => withTimeout(document.fonts.ready, GATE_MS),
      waitForImages,
      waitForHydration,
      waitForRender,
    ];

    let completed = 0;
    let floorTimer: ReturnType<typeof setTimeout> | undefined;

    function gateDone() {
      if (cancelled) return;
      completed += 1;
      targetRef.current = (completed / gates.length) * 100;
      setChecked(completed);
      maybeFinish();
    }

    function finish() {
      if (cancelled) return;
      targetRef.current = 100;
      setChecked(BOOT_LINES.length);
      setDone(true);
    }

    // Finish only once every gate is real AND the minimum display floor has
    // elapsed, so a fast, cached page still gets a readable boot animation.
    function maybeFinish() {
      if (completed !== gates.length) return;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minMs - elapsed);
      clearTimeout(floorTimer);
      floorTimer = setTimeout(finish, wait + 400);
    }

    gates.forEach((g) => g().then(gateDone));

    const failsafe = setTimeout(finish, FAILSAFE_MS);

    return () => {
      cancelled = true;
      clearTimeout(floorTimer);
      clearTimeout(failsafe);
    };
  }, []);

  // Smoothly ease the visible number toward the real gate progress so the bar
  // reads as organic rather than jumping between quarter steps.
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setProgress((p) => {
        const t = targetRef.current;
        if (t === 100 && p > 99.5) return 100;
        if (t === 0) return 0;
        return p + (t - p) * 0.12;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setHide(true), 350);
    return () => clearTimeout(t);
  }, [done]);

  // Signal readiness once the curtain has fully lifted, so nav/hero entrance
  // animations play in view. The exit motion.div is unmounted from React's
  // tree when hide flips, so its onAnimationComplete would see a stale
  // closure — a plain timer keyed to the exit duration is reliable instead.
  useEffect(() => {
    if (!hide) return;
    const t = setTimeout(markReady, EXIT_MS);
    return () => clearTimeout(t);
  }, [hide, markReady]);

  // Lock scrolling while the loader is up. Lenis handles the smooth scroll,
  // so body overflow alone is not enough — stop the Lenis instance and also
  // hard-lock the document for touch/keyboard/native scroll.
  useEffect(() => {
    const html = document.documentElement;
    if (hide) {
      lenis?.start();
      html.style.overflow = "";
      document.body.style.overflow = "";
    } else {
      lenis?.stop();
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
    return () => {
      lenis?.start();
      html.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [hide, lenis]);

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8 bg-ink"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
            aakash.rajbhar
          </span>

          <span className="font-display text-5xl font-medium tabular-nums text-fg">
            {Math.floor(progress)}%
          </span>

          <div className="relative h-px w-56 overflow-hidden bg-hair">
            <div
              className="absolute inset-y-0 left-0 bg-fg"
              style={{ width: `${progress}%`, transition: "width 120ms linear" }}
            />
          </div>

          <ul className="space-y-1 font-mono text-[11px]">
            {BOOT_LINES.map((line, i) => (
              <li
                key={line}
                className={i < checked ? "text-muted" : "text-faint/50"}
              >
                <span className="text-fg/70">{i < checked ? "✓" : "·"}</span> {line}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
