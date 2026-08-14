"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { content } from "@/lib/content";

export default function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const { lang } = useLanguage();
  const c = content[lang];
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLUListElement | null>(null);
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const runners: Record<string, () => void> = useMemo(
    () => ({
      work: () => scrollTo("work"),
      projects: () => scrollTo("projects"),
      stack: () => scrollTo("stack"),
      education: () => scrollTo("education"),
      contact: () => scrollTo("contact"),
      "copy-email": () => {
        navigator.clipboard.writeText(profile.email);
        setCopied(true);
      },
      github: () => window.open(profile.links.github, "_blank"),
      linkedin: () => window.open(profile.links.linkedin, "_blank"),
    }),
    []
  );

  const commands = c.palette.commands.map((cmd) => ({
    ...cmd,
    label: cmd.id === "copy-email" ? `${cmd.label} — ${profile.email}` : cmd.label,
    run: runners[cmd.id],
  }));

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (open) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((i) =>
            filtered.length === 0 ? 0 : (i + 1) % filtered.length
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex((i) =>
            filtered.length === 0
              ? 0
              : (i - 1 + filtered.length) % filtered.length
          );
        } else if (e.key === "Enter") {
          e.preventDefault();
          const cmd = filtered[activeIndex];
          if (cmd) {
            cmd.run();
            if (cmd.id !== "copy-email") setOpen(false);
          }
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen, filtered, activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setCopied(false);
      return;
    }
  
    const prev = document.body.style.overflow;
  
    document.body.style.overflow = "hidden";
  
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const active = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, filtered.length]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/70 px-4 pt-[14vh] pb-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-xl border border-hair bg-surface shadow-2xl shadow-black/50"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-2 border-b border-hair px-4 py-3">
              <span className="font-mono text-fg">{'>'}</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={c.palette.placeholder}
                className="w-full bg-transparent font-mono text-sm text-fg placeholder:text-faint focus:outline-none"
              />
              <kbd className="rounded border border-hair px-1.5 py-0.5 font-mono text-[10px] text-faint">
                esc
              </kbd>
            </div>

            <ul
              ref={listRef}
              data-lenis-prevent
              className="mt-1 flex max-h-72 flex-col gap-1 overflow-y-auto overscroll-contain p-1.5"
            >
              {filtered.length === 0 && (
                <li className="px-3 py-4 text-center font-mono text-xs text-faint">
                  {c.palette.noMatches}
                </li>
              )}
              {filtered.map((cmd, i) => (
                <li key={cmd.id}>
                  <button
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => {
                      cmd.run();
                      if (cmd.id !== "copy-email") setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-hi ${
                      i === activeIndex ? "bg-surface-hi text-fg" : "text-fg/90"
                    }`}
                  >
                    <span>{cmd.id === "copy-email" && copied ? c.palette.copiedLabel : cmd.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wide text-faint">
                      {cmd.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
