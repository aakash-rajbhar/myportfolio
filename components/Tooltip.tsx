"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

type Side = "top" | "bottom" | "left" | "right";

const offset: Record<Side, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

const arrow: Record<Side, string> = {
  top: "left-1/2 top-full -translate-x-1/2 -translate-y-1/2 border-r border-b",
  bottom: "left-1/2 bottom-full -translate-x-1/2 translate-y-1/2 border-l border-t",
  left: "top-1/2 left-full -translate-y-1/2 -translate-x-1/2 border-t border-l",
  right: "top-1/2 right-full -translate-y-1/2 translate-x-1/2 border-b border-r",
};

const initial: Record<Side, Record<string, number | string>> = {
  top: { opacity: 0, y: -4, scale: 0.95 },
  bottom: { opacity: 0, y: 4, scale: 0.95 },
  left: { opacity: 0, x: -4, scale: 0.95 },
  right: { opacity: 0, x: 4, scale: 0.95 },
};

const visible: Record<Side, Record<string, number | string>> = {
  top: { opacity: 1, y: 0, scale: 1 },
  bottom: { opacity: 1, y: 0, scale: 1 },
  left: { opacity: 1, x: 0, scale: 1 },
  right: { opacity: 1, x: 0, scale: 1 },
};

const anchor: Record<Side, (r: DOMRect) => { x: number; y: number; t: string }> = {
  top: (r) => ({ x: r.left + r.width / 2, y: r.top - 8, t: "translate(-50%, -100%)" }),
  bottom: (r) => ({ x: r.left + r.width / 2, y: r.bottom + 8, t: "translate(-50%, 0%)" }),
  left: (r) => ({ x: r.left - 8, y: r.top + r.height / 2, t: "translate(-100%, -50%)" }),
  right: (r) => ({ x: r.right + 8, y: r.top + r.height / 2, t: "translate(0%, -50%)" }),
};

const content =
  "block whitespace-nowrap rounded-md border border-hair bg-surface/95 px-2.5 py-1.5 font-mono text-[11px] text-fg shadow-lg shadow-black/40 backdrop-blur-sm";

export default function Tooltip({
  children,
  label,
  side = "top",
  portal = false,
}: {
  children: ReactNode;
  label: string;
  side?: Side;
  portal?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number; t: string } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const position = (el: Element) => {
    const a = anchor[side](el.getBoundingClientRect());
    setPos({ x: a.x, y: a.y, t: a.t });
  };

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (portal) position(e.currentTarget);
    setOpen(true);
  };

  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (portal) position(e.currentTarget);
    setOpen(true);
  };

  // Hide whenever the window scrolls so the portal tooltip never lingers
  // at stale coordinates.
  useEffect(() => {
    if (!portal || !open) return;
    const hide = () => setOpen(false);
    window.addEventListener("scroll", hide, true);
    return () => window.removeEventListener("scroll", hide, true);
  }, [portal, open]);

  // Keep the portal tooltip inside the viewport.
  useLayoutEffect(() => {
    if (!portal || !open || !pos || !tooltipRef.current) return;
    const el = tooltipRef.current;
    const pad = 8;

    if (side === "top" || side === "bottom") {
      const half = el.getBoundingClientRect().width / 2;
      const left = Math.min(Math.max(pos.x, half + pad), window.innerWidth - half - pad);
      el.style.left = `${left}px`;
    } else {
      const half = el.getBoundingClientRect().height / 2;
      const top = Math.min(Math.max(pos.y, half + pad), window.innerHeight - half - pad);
      el.style.top = `${top}px`;
    }
  }, [portal, open, pos, side]);

  const tooltip = (
    <motion.span
      role="tooltip"
      initial={initial[side]}
      animate={visible[side]}
      exit={initial[side]}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={content}
    >
      {label}
      <span className={`absolute h-1.5 w-1.5 rotate-45 border-hair bg-surface/95 ${arrow[side]}`} />
    </motion.span>
  );

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={handleEnter}
      onMouseLeave={() => setOpen(false)}
      onFocus={handleFocus}
      onBlur={() => setOpen(false)}
    >
      {children}
      {!portal && (
        <AnimatePresence>
          {open && <span className={`pointer-events-none absolute z-50 ${offset[side]}`}>{tooltip}</span>}
        </AnimatePresence>
      )}
      {portal &&
        typeof document !== "undefined" &&
        pos &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div
                ref={tooltipRef}
                style={{ top: pos.y, left: pos.x, transform: pos.t }}
                className="pointer-events-none fixed z-50"
              >
                {tooltip}
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </span>
  );
}
