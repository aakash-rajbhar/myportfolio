"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { content } from "@/lib/content";

type Day = { date: string; count: number; level: number };

const LEVEL_COLOR = ["bg-hair", "bg-fg/25", "bg-fg/50", "bg-fg/75", "bg-fg"];

type Tip = { count: number; dateLabel: string; x: number; y: number };

export default function GithubCalendar() {
  const { lang } = useLanguage();
  const c = content[lang];

  const [days, setDays] = useState<Day[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [tip, setTip] = useState<Tip | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/github-contributions")
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setDays(data.contributions as Day[]);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Scroll to the latest month when the calendar is loaded
  useEffect(() => {
    if (!days || !scrollRef.current) return;

    const container = scrollRef.current;

    requestAnimationFrame(() => {
      container.scrollLeft = container.scrollWidth;
    });
  }, [days]);

  const showTip = (e: React.MouseEvent<HTMLDivElement>, day: Day) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const d = new Date(day.date + "T00:00:00");
    const dateLabel = d.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    setTip({
      count: day.count,
      dateLabel,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  // Hide the tooltip whenever the window or the calendar scrolls, so it never
  // lingers at stale coordinates.
  useEffect(() => {
    if (!tip) return;
    const hide = () => setTip(null);
    window.addEventListener("scroll", hide, true);
    return () => window.removeEventListener("scroll", hide, true);
  }, [tip]);

  // Keep the tooltip inside the viewport (it is centered on the hovered cell).
  useLayoutEffect(() => {
    if (!tip || !tooltipRef.current) return;

    const el = tooltipRef.current;
    const pad = 8;
    const half = el.getBoundingClientRect().width / 2;
    const left = Math.min(
      Math.max(tip.x, half + pad),
      window.innerWidth - half - pad
    );

    el.style.left = `${left}px`;
  }, [tip]);

  const tipText = tip
    ? lang === "hi"
      ? `${tip.count} योगदान · ${tip.dateLabel}`
      : `${tip.count} contribution${tip.count === 1 ? "" : "s"} · ${tip.dateLabel}`
    : "";

  if (failed) return null;

  if (!days) {
    return (
      <div className="h-[92px] w-full animate-pulse rounded-lg bg-surface-hi" />
    );
  }

  // group days into Sun→Sat columns, padding the first partial week
  const weeks: Day[][] = [];
  let week: Day[] = [];

  days.forEach((day, i) => {
    const dow = new Date(day.date).getDay();

    if (i === 0) {
      for (let p = 0; p < dow; p++) {
        week.push({
          date: "",
          count: -1,
          level: -1,
        });
      }
    }

    week.push(day);

    if (dow === 6) {
      weeks.push(week);
      week = [];
    }
  });

  if (week.length) weeks.push(week);

  // Compute month labels
  let lastMonth = -1;

  const monthLabels = weeks.map((w) => {
    for (const day of w) {
      if (!day.date) continue;

      const d = new Date(day.date + "T00:00:00");
      const month = d.getMonth();

      if (month !== lastMonth) {
        lastMonth = month;
        return d.toLocaleDateString("en-US", {
          month: "short",
        });
      }
    }

    return null;
  });

  const total = days.reduce((sum, d) => sum + d.count, 0);

  return (
    <div>
      <div className="flex items-baseline justify-between">
          <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
            {c.githubCalendar.heading}
          </h3>
          

        <span className="font-mono text-[11px] text-faint">
          {c.githubCalendar.subtitle(total)}
        </span>
      </div>

      <div
        ref={scrollRef}
        className="mt-3 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-1"
      >
        <div className="inline-flex flex-col gap-1.5">
          {/* Month labels */}
          <div className="flex gap-[2px]">
            {weeks.map((_, wi) => (
              <div
                key={wi}
                className="relative h-[14px] w-[14px] flex-shrink-0 font-mono text-[11px] text-faint"
              >
                {monthLabels[wi] && (
                  <span className="absolute left-0 top-0 whitespace-nowrap">
                    {monthLabels[wi]}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Calendar */}
          <div className="flex gap-[2px]">
            {weeks.map((w, wi) => (
              <div
                key={wi}
                className="flex flex-col gap-[2px]"
              >
                {w.map((day, di) =>
                  day.level === -1 ? (
                    <div
                      key={di}
                      className="h-[14px] w-[14px]"
                    />
                  ) : (
                    <div
                      key={day.date}
                      onMouseEnter={(e) => showTip(e, day)}
                      onMouseLeave={() => setTip(null)}
                      className={`h-[14px] w-[14px] cursor-pointer ${LEVEL_COLOR[day.level]}`}
                    />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 mt-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-faint">
          Low
        </span>
      
        <div className="flex items-center gap-[2px]">
          {LEVEL_COLOR.map((color, index) => (
            <span
              key={index}
              className={`h-[10px] w-[10px] ${color}`}
            />
          ))}
        </div>
      
        <span className="font-mono text-[9px] uppercase tracking-wider text-faint">
          High
        </span>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {tip && (
              <div
                ref={tooltipRef}
                style={{
                  top: tip.y,
                  left: tip.x,
                  transform: "translate(-50%, -100%)",
                }}
                className="pointer-events-none fixed z-50"
              >
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="relative whitespace-nowrap rounded-md border border-hair bg-surface/95 px-2.5 py-1.5 font-mono text-[11px] text-fg shadow-lg shadow-black/40 backdrop-blur-sm">
                    {tipText}
                    <span className="absolute -bottom-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 border-b border-r border-hair bg-surface/95" />
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}