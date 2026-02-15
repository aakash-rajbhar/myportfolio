import React from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";

import type { Theme } from "../types.ts";

interface GithubSectionProps {
  theme: Theme;
}

const GithubSection: React.FC<GithubSectionProps> = ({ theme }) => {
  // Custom theme colors for the calendar blocks
  const calendarTheme = {
    light: ["#f4f4f5", "#e4e4e7", "#a1a1aa", "#71717a", "#3f3f46"],
    dark: ["#18181b", "#27272a", "#3f3f46", "#71717a", "#a1a1aa"],
  };

  return (
    <section className="py-20 border-t border-zinc-200 dark:border-zinc-900">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grow w-full bg-zinc-100 dark:bg-zinc-900/30 p-8 md:p-12 rounded-4xl border border-zinc-300 dark:border-zinc-800 overflow-x-auto"
        >
          <div className="min-w-175">
            {GitHubCalendar ? (
              <GitHubCalendar
                className={theme === "dark" ? "text-zinc-100" : "text-zinc-900"}
                username="aakash-rajbhar"
                blockSize={12}
                blockMargin={4}
                fontSize={12}
                theme={calendarTheme}
                colorScheme={theme === "light" ? "light" : "dark"}
                loading={false}
              />
            ) : (
              <div className="h-32 flex items-center justify-center text-zinc-400">
                Loading contribution calendar...
              </div>
            )}
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-zinc-200 dark:border-zinc-800/50">
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
        <div className="max-w-xs">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-zinc-400 mb-2">
            Open Source
          </h2>
          <p className="text-4xl font-serif mb-6 italic text-zinc-900 dark:text-zinc-100">
            Consistency
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
            My daily journey through code, documented in the open-source
            ecosystem.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-950 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                JS
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-950 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                TS
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-950 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                PY
              </div>
            </div>
            <span className="text-xs font-bold tracking-widest uppercase opacity-40 text-zinc-800 dark:text-zinc-200">
              Active Contributor
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubSection;
