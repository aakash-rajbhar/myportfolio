import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "../types.ts";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.2 }}
      className="group"
    >
      <div className="relative overflow-hidden aspect-16/10 bg-zinc-100 dark:bg-zinc-900 rounded-2xl mb-8">
        <motion.img
          style={{ y }}
          src={project.image}
          alt={project.title}
          className="w-full h-[120%] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-110 group-hover:scale-100"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
          <a
            href={project.link}
            target="_blank"
            className="text-white text-xs font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all pointer-events-auto"
          >
            Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              className="text-white text-xs font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all pointer-events-auto"
            >
              Live Demo
            </a>
          )}
        </div>

        <div className="absolute top-6 left-6">
          <span
            className={`px-3 py-1 text-[10px] font-bold tracking-tighter uppercase rounded border border-white/20 bg-black/30 backdrop-blur-sm text-white`}
          >
            {project.category}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-serif">{project.title}</h3>
          <span className="text-zinc-300 dark:text-zinc-700 text-3xl font-serif">
            0{project.id}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 border border-zinc-200 dark:border-zinc-800 rounded text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-zinc-500 dark:text-zinc-400 font-light max-w-sm">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
