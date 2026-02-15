// import React from "react";
import { SKILLS } from "../constants";
import { motion } from "framer-motion";

const SkillsSection = () => {
  return (
    <div className="py-20 border-t border-zinc-200 dark:border-zinc-900">
      <h2 className="text-sm font-semibold tracking-widest uppercase text-zinc-400 mb-12">
        Tech Stack
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div key={category}>
            <h4 className="text-xs font-bold uppercase mb-4 opacity-50 tracking-wide text-zinc-900 dark:text-zinc-100">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h4>
            <div className="flex flex-wrap gap-3">
              {items.map((item) => (
                <motion.span
                  whileHover={{ scale: 1.25 }}
                  transition={{ duration: 0.2 }}
                  key={item}
                  className="px-4 py-2 rounded-full text-sm font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-900 hover:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all duration-300 shadow-sm hover:shadow-md  cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
