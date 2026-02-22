"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { RESUME_DATA } from "@/lib/resume-data";
import SectionHeading from "../ui/SectionHeading";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ExperienceItem = ({
  exp,
  idx,
}: {
  exp: (typeof RESUME_DATA.experience)[0];
  idx: number;
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border-t border-ink/10 py-12 grid md:grid-cols-12 gap-8 items-center hover:bg-ink/5 transition-colors px-4 md:pl-12 cursor-none"
    >
      {/* Breakpoint Dot */}
      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-ink/20 group-hover:bg-ink transition-colors hidden md:block" />

      <div className="md:col-span-2 font-mono text-xs opacity-40">
        {exp.period}
      </div>
      <div className="md:col-span-4">
        <h4 className="text-3xl font-display tracking-tighter uppercase">
          {exp.company}
        </h4>
        <p className="font-serif italic opacity-60">{exp.role}</p>
      </div>
      <div className="md:col-span-6 text-sm opacity-80 leading-relaxed">
        {exp.points[0]}
      </div>

      {/* Floating Detail Card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              x: mousePos.x + 20,
              y: mousePos.y - 100,
            }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 200,
              mass: 0.5,
            }}
            className="fixed md:absolute z-100 pointer-events-none w-80 glass p-6 shadow-2xl"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-4">
              Key Contributions
            </p>
            <ul className="space-y-3">
              {exp.points.map((point, pIdx) => (
                <li
                  key={pIdx}
                  className="text-xs leading-relaxed opacity-80 flex gap-2"
                >
                  <span className="opacity-20">—</span> {point}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Work() {
  return (
    <section className="py-40 px-8 max-w-7xl mx-auto">
      <SectionHeading number="01">Selected Work</SectionHeading>

      <div className="grid md:grid-cols-2 gap-x-20 gap-y-32">
        {RESUME_DATA.projects.map((project, idx) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn("group relative", idx % 2 !== 0 ? "md:mt-32" : "")}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-4/3 mb-8">
              <Image
                src={project.image}
                alt={project.name}
                width={900}
                height={600}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-ink/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex gap-4 items-center justify-center">
                <Link
                  href={project.demo}
                  target="_blank"
                  className="bg-bg text-ink px-8 py-4 rounded-full font-display tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  Live Demo <ArrowUpRight size={18} />
                </Link>
                <Link
                  href={project.link}
                  target="_blank"
                  className="bg-(--ink) text-(--bg) px-8 py-4 rounded-full font-display tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  Github <Github size={18} />
                </Link>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-4xl font-display tracking-tighter uppercase leading-none group-hover:italic transition-all duration-300">
                  {project.name}
                </h3>

                <span className="font-serif italic text-2xl opacity-20">
                  0{idx + 1}
                </span>
              </div>

              {/* Description Always Visible (Important UX Choice) */}
              <p className="text-sm opacity-70 leading-relaxed max-w-xl">
                {project.description}
              </p>

              <p className="font-mono text-[10px] opacity-40 uppercase tracking-widest">
                {project.tools.join(" / ")}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-60">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-6xl font-display tracking-tighter uppercase mb-20"
        >
          Experience
        </motion.h3>
        <div className="relative">
          {/* Timeline Bar */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-ink/10 hidden md:block" />

          <div className="space-y-0">
            {RESUME_DATA.experience.map((exp, idx) => (
              <ExperienceItem key={exp.company} exp={exp} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
