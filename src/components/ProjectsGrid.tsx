import React from "react";
// import { motion } from 'framer-motion';
import { PROJECTS } from "../constants";
import ProjectCard from "./ProjectCard.tsx";

const ProjectsGrid: React.FC = () => {
  return (
    <div className="py-20">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-zinc-400 mb-2">
            Featured Work
          </h2>
          <p className="text-4xl font-serif text-zinc-800 dark:text-zinc-200">
            Selected Archives
          </p>
        </div>
        <div className="hidden md:block text-sm text-zinc-500 max-w-50 text-right">
          A selection of projects where engineering meets artistry.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;
