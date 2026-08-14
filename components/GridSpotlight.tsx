"use client";

import { useEffect, useRef } from "react";

/**
 * A faint schematic grid that sits behind the whole page, with a soft
 * bright spotlight that tracks the cursor — like a blueprint lit by a
 * hand torch. Pure CSS custom-property updates on rAF, no re-renders.
 */
export default function GridSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let x = 50;
    let y = 30;
    let targetX = x;
    let targetY = y;

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const tick = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      ref.current?.style.setProperty("--spot-x", `${x}%`);
      ref.current?.style.setProperty("--spot-y", `${y}%`);
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* faint always-on base grid */}
      <div className="absolute inset-0 bg-grid-schema bg-[size:44px_44px] opacity-30" />
      {/* brighter grid, revealed only inside the cursor spotlight */}
      <div
        ref={ref}
        className="absolute inset-0 bg-grid-schema bg-[size:44px_44px]"
        style={
          {
            "--spot-x": "50%",
            "--spot-y": "30%",
            maskImage:
              "radial-gradient(560px circle at var(--spot-x) var(--spot-y), black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(560px circle at var(--spot-x) var(--spot-y), black, transparent 75%)",
            filter: "brightness(2.4)",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
