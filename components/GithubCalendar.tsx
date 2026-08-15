"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { content } from "@/lib/content";

type Day = { date: string; count: number; level: number };

const LEVEL_COLOR = ["bg-hair", "bg-fg/25", "bg-fg/50", "bg-fg/75", "bg-fg"];

export default function GithubCalendar() {
  const { lang } = useLanguage();
  const c = content[lang];

  const [days, setDays] = useState<Day[] | null>(null);
  const [failed, setFailed] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

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
          <div className="flex gap-[3px]">
            {weeks.map((_, wi) => (
              <div
                key={wi}
                className="relative h-4 w-[12px] flex-shrink-0 font-mono text-[11px] text-faint"
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
          <div className="flex gap-[3px]">
            {weeks.map((w, wi) => (
              <div
                key={wi}
                className="flex flex-col gap-[3px]"
              >
                {w.map((day, di) =>
                  day.level === -1 ? (
                    <div
                      key={di}
                      className="h-[12px] w-[12px]"
                    />
                  ) : (
                    <div
                      key={day.date}
                      title={`${day.count} contribution${
                        day.count === 1 ? "" : "s"
                      } on ${day.date}`}
                      className={`h-[12px] w-[12px] ${LEVEL_COLOR[day.level]}`}
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
    </div>
  );
}