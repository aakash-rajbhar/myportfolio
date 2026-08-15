"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  title,
  note,
}: {
  index: string;
  title: string;
  note?: string;
}) {
  return (
    <Reveal className="mb-10 flex items-baseline justify-between border-b border-hair pb-4">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-muted">{index}</span>
        <h2 className="font-display text-2xl font-medium tracking-tight text-fg sm:text-3xl">
          {title}
        </h2>
      </div>
      {note && (
        <span className="hidden font-mono text-xs text-faint sm:inline">{note}</span>
      )}
    </Reveal>
  );
}
