"use client";

import { RESUME_DATA } from "@/lib/resume-data";
import { GitHubCalendar } from "react-github-calendar";
import SectionHeading from "./HeroHeading";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Skills() {
  const [isDark, setIsDark] = useState(
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false,
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const calendarTheme = {
    light: ["#f4f4f5", "#e4e4e7", "#a1a1aa", "#71717a", "#3f3f46"],
    dark: ["#18181b", "#27272a", "#3f3f46", "#71717a", "#a1a1aa"],
  };

  return (
    <section id="skills" className="py-40 px-8 max-w-7xl mx-auto">
      <SectionHeading number="02">Technical Stack</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20">
        {Object.entries(RESUME_DATA.skills).map(([category, items], catIdx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIdx * 0.1 }}
          >
            <h4 className="font-mono text-xs uppercase tracking-[0.3em] opacity-40 mb-12">
              {category}
            </h4>
            <div className="flex flex-wrap gap-4">
              {items.map((item, itemIdx) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.1,
                    color: "var(--ink)",
                    rotate: [0, -2, 2, 0],
                    transition: { duration: 0.2 },
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.1 + itemIdx * 0.05 }}
                  className="text-2xl font-display tracking-tighter uppercase border-b border-ink/10 pb-1 cursor-default hover:border-ink transition-colors"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-60 grid grid-cols-1 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-5xl font-display tracking-tighter uppercase mb-8">
            GitHub Activity
          </h3>
          <p className="text-lg opacity-60 mb-12 max-w-md">
            Consistent contributions and open-source involvement. Tracking
            growth through code.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -200, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-8 bg-ink/5 overflow-x-auto flex flex-col items-center justify-center rounded-4xl border brutal-border"
        >
          <GitHubCalendar
            username="aakash-rajbhar"
            theme={calendarTheme}
            colorScheme={isDark ? "dark" : "light"}
            fontSize={14}
            blockSize={14}
            blockMargin={6}
          />

          <div className="w-full mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-zinc-200 dark:border-zinc-800/50">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-1">
                Status
              </p>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                Available for Hire
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-1">
                GitHub
              </p>
              <a
                href="https://github.com/aakash-rajbhar"
                target="_blank"
                className="text-sm font-medium hover:underline underline-offset-4 text-zinc-600 dark:text-zinc-300"
              >
                @aakash-rajbhar
              </a>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-1">
                Region
              </p>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                India / Remote
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-1">
                Commitment
              </p>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                Full Stack & Security
              </p>
            </div>
          </div>
        </motion.div>

        {/* vs code extension  */}
      </div>
    </section>
  );
}
