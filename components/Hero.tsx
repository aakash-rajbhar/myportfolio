"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { content } from "@/lib/content";
import { Clock } from "lucide-react";

export default function Hero() {
  const { lang } = useLanguage();
  const c = content[lang];
  const stats = [
    { value: "3", label: c.hero.statsLabels[0] },
    { value: "10+", label: c.hero.statsLabels[1] },
    { value: "200+", label: c.hero.statsLabels[2] },
    { value: "9.2", label: c.hero.statsLabels[3] },
  ];

  const [now, setNow] = useState<Date | null>(null);
  const [scopeHovered, setScopeHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hoveredRef = useRef(false);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    hoveredRef.current = scopeHovered;
  }, [scopeHovered]);

  // matrix rain -- classic falling-glyph effect, drawn on canvas so it
  // can run indefinitely without piling up DOM nodes. Speed/opacity
  // respond to hover, mirroring the old oscilloscope's brighten-on-hover.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const glyphs =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ" +
      "0123456789" +
      "अआइईउऊएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह" +
      "अंअः०१२३४५६७८९" +
      "01" +
      "$#%&*+-=<>{}[]()/\\|~^@!?" +
      "ABCDEFabcdef" +
      ":•▓▒░■□▪▫";
    const fontSize = 14;
    const FRAME_INTERVAL = 1000 / 10; // throttle to a steady ~100fps

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];
    let raf = 0;
    let running = false;
    let lastFrame = 0;
    let lastHover: boolean | null = null;

    // theme colors only change when the `.light` class flips, so watch for
    // that once instead of calling getComputedStyle() on every frame.
    const theme = { fg: "34 197 94", ink: "10 10 10" };
    let trailStyle = "";
    let headStyle = "";
    let tailStyle = "";

    const syncTheme = () => {
      const style = getComputedStyle(document.documentElement);
      theme.fg = style.getPropertyValue("--color-fg").trim() || "34 197 94";
      theme.ink = style.getPropertyValue("--color-ink").trim() || "10 10 10";
      lastHover = null; // restyle on the next frame
      // wipe the buffered pixels right away so the canvas switches at the
      // same instant as the CSS variables everywhere else
      ctx.fillStyle = `rgb(${theme.ink})`;
      ctx.fillRect(0, 0, width, height);
    };
    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    syncTheme();

    const syncStyles = () => {
      const hovered = hoveredRef.current;
      trailStyle = `rgb(${theme.ink} / ${hovered ? 0.08 : 0.12})`;
      headStyle = `rgb(${theme.fg} / ${hovered ? 0.9 : 0.6})`;
      tailStyle = `rgb(${theme.fg} / ${hovered ? 0.28 : 0.16})`;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      // cap DPR lower on touch devices to keep the fill-rate light
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.ceil(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -40);
      ctx.fillStyle = `rgb(${theme.ink})`;
      ctx.fillRect(0, 0, width, height);
    };

    const draw = () => {
      if (lastHover !== hoveredRef.current) {
        lastHover = hoveredRef.current;
        syncStyles();
      }

      ctx.fillStyle = trailStyle;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < columns; i++) {
        const char = glyphs[(Math.random() * glyphs.length) | 0];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // bright leading glyph
        ctx.fillStyle = headStyle;
        ctx.fillText(char, x, y);

        // dimmer trailing glyph just above it for a bit of glow
        if (y - fontSize > 0) {
          ctx.fillStyle = tailStyle;
          ctx.fillText(
            glyphs[(Math.random() * glyphs.length) | 0],
            x,
            y - fontSize
          );
        }

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 1;
      }
    };

    const loop = (time: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (time - lastFrame < FRAME_INTERVAL) return;
      lastFrame = time;
      draw();
    };

    const start = () => {
      if (running) return;
      running = true;
      lastFrame = 0;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // pause the rain entirely when the hero scrolls out of view
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    resize();
    window.addEventListener("resize", resize);

    return () => {
      stop();
      themeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  const clock = now
    ? now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "··:··:··";

  return (
    <section id="top" className="relative pb-20 pt-8 sm:pt-10 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-xl border border-hair bg-surface/50"
        >
          {/* banner -- matrix-rain: falling glyphs on canvas, brightening
              on hover so the "monitor" reads as live rather than static */}
          <div
            className="relative h-28 overflow-hidden bg-surface-hi sm:h-32"
            onMouseEnter={() => setScopeHovered(true)}
            onMouseLeave={() => setScopeHovered(false)}
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
              style={{
                maskImage: "linear-gradient(to bottom, black, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black, transparent)",
              }}
            />

            {/* status bar: same row, opposite corners */}
            <div className="absolute left-7 top-4 flex items-center gap-1.5 rounded-full border border-hair/80 bg-ink/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted backdrop-blur-sm">
              <Clock size={12} /> {clock}
            </div>
            <div className="absolute right-7 top-4 flex items-center gap-1.5 rounded-full border border-hair/80 bg-ink/60 px-2.5 py-1 font-mono text-[10px] text-muted backdrop-blur-sm">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-fg"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              {c.hero.badge}
            </div>
          </div>

          <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-10 sm:-mt-12 relative">
              <div className="z-15 flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border-2 border-ink bg-surface-hi font-display text-2xl font-medium text-fg shadow shadow-black/20 sm:h-24 sm:w-24 sm:text-3xl">
                <Image src="/profile.png" alt={c.name} width={80} height={80} className="h-full w-full" />
              </div>
            </div>

            <div className="mt-4">
              <h1 className="font-display text-2xl font-medium tracking-tight text-fg sm:text-[28px]">
                {c.name}
              </h1>
              <p className="mt-0.5 font-mono text-[13px] text-faint">
                @aakash-rajbhar &middot; {c.location}
              </p>
            </div>

            <div className="mt-6 space-y-1 rounded-lg border border-hair bg-ink/40 px-4 py-3.5 font-mono text-[13px] leading-relaxed sm:text-sm">
              <p className="text-fg">
                <span className="text-faint">+ </span>
                {c.hero.diffPlus1}
              </p>
              <p className="text-fg">
                <span className="text-faint">+ </span>
                {c.hero.diffPlus2}
              </p>
              <p className="text-faint line-through decoration-faint/60">
                <span className="text-faint no-underline">- </span>
                {c.hero.diffMinus}
              </p>
            </div>

            <p className="mt-6 max-w-xl text-balance text-[15px] leading-relaxed text-muted sm:text-base">
              {c.tagline} {c.hero.bioBefore}
              <span className="text-fg">{c.hero.bioCompany}</span>
              {c.hero.bioAfter}
            </p>

            <div className="mt-7 grid grid-cols-4 gap-2 border-y border-hair py-5">
              {stats.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <div className="font-display text-xl font-medium text-fg sm:text-2xl">
                    {s.value}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-faint sm:text-[11px]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="rounded-full bg-fg px-5 py-2.5 font-mono text-[13px] text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                {c.hero.ctaPrimary}
              </a>
              <a
                href="/Aakash_Rajbhar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="rounded-full border border-hair px-5 py-2.5 font-mono text-[13px] text-fg transition-colors hover:border-fg/40"
              >
                {c.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
