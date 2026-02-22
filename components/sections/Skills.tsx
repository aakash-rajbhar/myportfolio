"use client";

import { RESUME_DATA } from "@/lib/resume-data";
import { GitHubCalendar } from "react-github-calendar";
import SectionHeading from "./HeroHeading";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Blocks, Code2, ExternalLink } from "lucide-react";

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
    <section className="py-40 px-8 max-w-7xl mx-auto">
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

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-60"
        >
          <h3 className="text-5xl font-display tracking-tighter uppercase mb-8">
            TOOLS & EXTENSION
          </h3>
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 brutal-border bg-ink/5 font-mono text-[10px] uppercase tracking-widest mb-12">
                <Code2 size={14} /> VS Code Extension
              </div>

              <h3 className="text-6xl md:text-7xl font-display tracking-tighter uppercase leading-[0.9]">
                SkyCode <br />
                <span className="italic font-serif normal-case font-light opacity-40">
                  Dark Theme
                </span>
              </h3>

              <p className="text-xl opacity-60 max-w-md leading-relaxed">
                A meticulously crafted dark theme for VS Code, designed for long
                coding sessions. Focused on high legibility, balanced contrast,
                and a professional aesthetic.
              </p>

              <div className="flex flex-wrap gap-6 pt-4">
                <motion.a
                  href="https://marketplace.visualstudio.com/items?itemName=AakashRajbhar.skycode-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-ink text-bg px-8 py-4 flex items-center gap-3 font-display tracking-widest uppercase text-sm"
                >
                  Install Theme <Blocks size={18} />
                </motion.a>

                <motion.a
                  href="https://github.com/aakash-rajbhar/vs-code-theme.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="brutal-border px-8 py-4 flex items-center gap-3 font-display tracking-widest uppercase text-sm"
                >
                  View Source <ExternalLink size={18} />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video overflow-hidden group bg-ink/5 rounded-xl shadow-xl border border-zinc-300 dark:border-zinc-800"
            >
              {/* Mac Window Header */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-bg/80 backdrop-blur-md border-b border-ink/10 flex items-center px-4 z-10">
                {/* Traffic Light Buttons */}
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              </div>

              {/* Image */}
              <Image
                src="/projects/theme-preview.webp"
                alt="vs-code theme"
                width={1200}
                height={800}
                className="w-full h-full object-cover pt-4 group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
