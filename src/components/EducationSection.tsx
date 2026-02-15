import React from "react";
import { motion } from "framer-motion";
import { EDUCATION } from "../constants.tsx";

const EducationSection: React.FC = () => {
  return (
    <div className="py-20 border-t border-zinc-200 dark:border-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 md:sticky top-32 h-fit">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-zinc-400 mb-2">
            Academics
          </h2>
          <p className="text-4xl font-serif mb-6 italic text-zinc-900 dark:text-zinc-100">
            Education
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed font-light">
            Foundational knowledge and academic excellence in computer science.
          </p>
        </div>

        <div className="md:col-span-8 space-y-16">
          {EDUCATION.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif italic text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-500 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                    {edu.institution}
                  </p>
                </div>
                <div className="flex flex-col gap-1 md:items-end">
                  <div className="text-xs font-bold tracking-widest uppercase text-zinc-400 pt-2">
                    {edu.year}
                  </div>
                  <div className="text-xs font-bold tracking-widest uppercase text-zinc-400 pt-2 text-nowrap">
                    score:{" "}
                    <span className="text-sm dark:text-zinc-100 text-zinc-900">
                      {edu.score}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light max-w-2xl">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
