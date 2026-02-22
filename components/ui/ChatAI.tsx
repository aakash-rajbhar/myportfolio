"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Bot, User, Loader2, BotMessageSquare } from "lucide-react";

import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

export default function ChatAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "model"; text: string }[]
  >([
    {
      role: "model",
      text: "Hi! I'm Aakash's AI assistant. Ask me anything about his work, skills, or projects!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);

    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
          input: userMessage,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { role: "model", text: data.text }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-100 w-16 h-16 bg-ink text-bg rounded-full flex items-center justify-center shadow-2xl brutal-border"
      >
        {isOpen ? <X size={24} /> : <BotMessageSquare size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-100 w-[90vw] rounded-xl md:w-100 h-125 bg-bg/20 backdrop-blur-3xl border border-zinc-300 dark:border-zinc-800  shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-ink/10 bg-ink/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-ink text-bg rounded-full flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold uppercase tracking-widest">
                    Aakash AI
                  </p>
                  <p className="text-[10px] font-mono opacity-40 uppercase">
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="opacity-40 hover:opacity-100 transition-opacity"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "",
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1",
                      msg.role === "user" ? "bg-ink/10" : "bg-ink text-bg",
                    )}
                  >
                    {msg.role === "user" ? (
                      <User size={12} />
                    ) : (
                      <Bot size={12} />
                    )}
                  </div>
                  <div
                    className={cn(
                      "p-3 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-ink/5 rounded-2xl rounded-tr-none"
                        : "bg-bg border border-ink/10 rounded-2xl rounded-tl-none",
                    )}
                  >
                    <div className="text-xs">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-ink text-bg rounded-full flex items-center justify-center shrink-0">
                    <Bot size={12} />
                  </div>
                  <div className="p-3 bg-bg border border-ink/10 rounded-2xl rounded-tl-none">
                    <Loader2 size={14} className="animate-spin opacity-40" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-ink/10 bg-bg">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about Aakash..."
                  className="w-full bg-ink/5 border-none rounded-full py-3 px-6 pr-12 text-sm focus:ring-1 focus:ring-ink outline-none font-mono"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 bg-ink text-bg rounded-full disabled:opacity-20 transition-opacity"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
