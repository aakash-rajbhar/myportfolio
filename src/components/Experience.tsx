import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCE } from "../constants";

const Experience: React.FC = () => {
  return (
    <div className="py-20 border-t border-zinc-200 dark:border-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Header Section */}
        <div className="md:col-span-4 md:sticky top-32 h-fit">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-zinc-400 mb-2">
            History
          </h2>
          <p className="text-4xl font-serif mb-6 italic text-zinc-800 dark:text-zinc-200">
            Experience
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed font-light">
            A journey through engineering, product design, and scalable system
            architecture.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="md:col-span-8 relative">
          {/* Vertical Animated Line - Now visible on mobile too */}
          <div className="absolute left-2 md:left-40 top-4 bottom-4 w-px bg-zinc-100 dark:bg-zinc-800">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ originY: 0 }}
              className="absolute inset-0 bg-zinc-900 dark:bg-zinc-400"
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {EXPERIENCE.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="relative flex flex-row gap-6 md:gap-12"
              >
                {/* Year display - left of line on desktop, hidden on mobile */}
                <div className="hidden md:block md:w-40 shrink-0 text-xs font-bold tracking-widest uppercase text-zinc-400 pt-1">
                  {item.year}
                </div>

                {/* Breakpoint indicator */}
                <div className="absolute left-2 md:left-40 top-1 flex items-center justify-center -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.2 + 0.5,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="w-3 h-3 rounded-full bg-zinc-900 dark:bg-white border-4 border-white dark:border-zinc-950 shadow-sm"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 1 }}
                    whileInView={{ opacity: [0, 0.5, 0], scale: [1, 2.5, 3] }}
                    viewport={{ once: false }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: index * 0.5,
                    }}
                    className="absolute w-3 h-3 rounded-full bg-zinc-400 dark:bg-zinc-600"
                  />
                </div>

                {/* Content - right of line */}
                <div className="grow pl-8 md:pl-10 space-y-4">
                  <div className="flex flex-col">
                    {/* Year display - shown on mobile above role */}
                    <span className="md:hidden text-xs font-bold tracking-widest uppercase text-zinc-400 mb-2">
                      {item.year}
                    </span>

                    <motion.span
                      whileHover={{ x: 5 }}
                      className="text-2xl font-serif italic tracking-tight mb-1 cursor-default text-zinc-900 dark:text-zinc-100"
                    >
                      {item.role}
                    </motion.span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-zinc-500 text-sm font-medium">
                      <span className="text-zinc-900 dark:text-zinc-100">
                        {item.company}
                      </span>
                      <span className="text-zinc-300 dark:text-zinc-800">
                        •
                      </span>
                      <span className="font-light tracking-wide">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="max-w-xl">
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
