"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { content } from "@/lib/content";
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkle } from "lucide-react";

type ChatMessage = { role: "user" | "assistant"; content: string };
type Mode = "commands" | "chat";

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

  const [mode, setMode] = useState<Mode>("commands");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const threadRef = useRef<HTMLDivElement | null>(null);

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
    isAi: false as const,
  }));

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const trimmedQuery = query.trim();
  const askAiItem = {
    id: "ask-ai",
    label: trimmedQuery ? c.palette.askAiWithQuery(trimmedQuery) : c.palette.askAi,
    hint: c.palette.aiHint,
    isAi: true as const,
    run: () => askAi(trimmedQuery || undefined),
  };

  // "Ask AI" is always reachable — as a suggestion when nothing matches,
  // or as a standing option at the end of the list otherwise.
  const displayItems = mode === "commands" ? [askAiItem, ...filtered] : [];

  function askAi(initialQuery?: string) {
    setMode("chat");
    setQuery("");
    setActiveIndex(0);
    if (initialQuery) {
      void sendMessage(initialQuery);
    }
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, lang }),
      });
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || c.palette.chatError },
      ]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: c.palette.chatError }]);
    } finally {
      setLoading(false);
    }
  }

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
      if (!open) return;

      if (mode === "chat") {
        if (e.key === "Enter") {
          e.preventDefault();
          void sendMessage(query);
        }
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) =>
          displayItems.length === 0 ? 0 : (i + 1) % displayItems.length
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) =>
          displayItems.length === 0 ? 0 : (i - 1 + displayItems.length) % displayItems.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = displayItems[activeIndex];
        if (item) {
          item.run();
          if (!item.isAi && item.id !== "copy-email") setOpen(false);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen, mode, displayItems, activeIndex, query, loading, messages]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open, mode]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setCopied(false);
      setMode("commands");
      setMessages([]);
      setLoading(false);
      return;
    }

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (mode !== "commands") return;
    const active = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, mode]);

  useEffect(() => {
    if (mode !== "chat") return;
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [mode, messages, loading]);

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
            {mode === "chat" && (
              <div className="flex items-center justify-between border-b border-hair px-4 py-2">
                <button
                  onClick={() => setMode("commands")}
                  className="flex items-center gap-1 font-mono text-[11px] text-muted transition-colors hover:text-fg"
                >
                  <ArrowLeft size={12} className="text-fg" /> {c.palette.backToCommands}
                </button>
                <span className="font-mono text-[10px] uppercase tracking-wide text-faint">
                  {c.palette.aiHint}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 border-b border-hair px-4 py-3">
              <span className="font-mono text-fg">{mode === "chat" ? <Sparkle size={12} className="text-fg"/> : <ChevronRight size={12} className="text-fg" />}</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={mode === "chat" ? c.palette.chatPlaceholder : c.palette.placeholder}
                disabled={mode === "chat" && loading}
                className="w-full bg-transparent font-mono text-sm text-fg placeholder:text-faint focus:outline-none disabled:opacity-60"
              />
              <kbd className="rounded border border-hair px-1.5 py-0.5 font-mono text-[10px] text-faint">
                esc
              </kbd>
            </div>

            {mode === "commands" ? (
              <ul
                ref={listRef}
                data-lenis-prevent
                className="mt-1 flex max-h-72 flex-col gap-1 overflow-y-auto overscroll-contain p-1.5"
              >
                {displayItems.map((item, i) => (
                  <li key={item.id}>
                    <button
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => {
                        item.run();
                        if (!item.isAi && item.id !== "copy-email") setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-hi ${
                        i === activeIndex ? "bg-surface-hi text-fg" : "text-fg/90"
                      } ${item.isAi ? "border border-hair mt-1 pt-3" : ""}`}
                    >
                      <span>
                        {item.id === "copy-email" && copied ? c.palette.copiedLabel : item.label}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wide text-faint">
                        {item.hint}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div
                ref={threadRef}
                data-lenis-prevent
                className="flex max-h-80 flex-col gap-3 overflow-y-auto overscroll-contain p-4"
              >
                {messages.length === 0 && !loading && (
                  <p className="font-mono text-xs leading-relaxed text-faint">
                    {c.palette.chatPlaceholder}
                  </p>
                )}

                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-[13.5px] leading-relaxed ${
                      m.role === "user"
                        ? "self-end bg-fg text-ink"
                        : "self-start bg-surface-hi text-fg/90"
                    }`}
                  >
                    {m.content}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-1 self-start rounded-lg bg-surface-hi px-3 py-2.5">
                    {[0, 0.15, 0.3].map((delay) => (
                      <motion.span
                        key={delay}
                        className="h-1.5 w-1.5 rounded-full bg-muted"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}