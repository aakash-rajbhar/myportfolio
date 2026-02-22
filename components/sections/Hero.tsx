"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

export default function Hero() {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-8 z-10">
          <p className="font-mono text-xs tracking-[0.3em] mb-8 opacity-60">
            BASED IN INDIA / FULL STACK ENGINEER
          </p>

          <h1 className="text-[15vw] md:text-[12vw] font-display leading-[0.85] tracking-tighter uppercase mb-12">
            Digital <br />
            <span className="italic font-serif normal-case font-light opacity-40">
              Architect
            </span>
          </h1>

          <p className="text-xl md:text-2xl max-w-md leading-tight font-light opacity-80 flex gap-12 items-end">
            Building high-performance web applications with a focus on clean
            code and user-centric design.
          </p>
        </div>

        <motion.div
          style={{ y: y1 }}
          className="md:col-span-4 relative aspect-3/4 brutal-border overflow-hidden"
        >
          <Image
            src="/me.png"
            alt="Aakash Rajbhar"
            className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
            referrerPolicy="no-referrer"
            width={800}
            height={1200}
          />

          <div className="absolute bottom-4 left-4 bg-white/30 backdrop-blur-lg dark:bg-black/10 px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest">
            Aakash Rajbhar / 2026
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{ y: y2 }}
        className="absolute -bottom-20 -right-20 text-[20vw] font-display opacity-[0.03] pointer-events-none select-none"
      >
        CREATIVE
      </motion.div>
    </section>
  );
}
