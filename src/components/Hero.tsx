import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BIO } from "../constants";
import React from "react";

const Hero: React.FC = () => {
  const words =
    "Building secure, scalable, and user-centric web experiences.".split(" ");

  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col-reverse gap-10 lg:gap-2 lg:flex-row pt-20 items-start">
      {/* Text Section */}
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-zinc-500 font-medium mb-6 flex items-center gap-2"
        >
          <span className="w-10 h-px bg-zinc-300 dark:bg-zinc-700"></span>
          <span>AAKASH RAJBHAR</span>
          <span className="text-zinc-300 dark:text-zinc-800 mx-1">/</span>
          <span className="font-mono text-xs tracking-widest opacity-60 transition-opacity duration-500">
            {time}
          </span>
        </motion.div>

        <h1 className="text-5xl text-zinc-900 dark:text-zinc-200 md:text-8xl font-serif leading-[0.9] tracking-tight mb-12 italic">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.8 }}
              className="inline-block mr-[0.2em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-2xl"
        >
          {BIO}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 flex gap-4"
        >
          <a
            href="/Aakash_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-sm font-semibold tracking-widest uppercase py-4 px-8 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-full hover:scale-105 transition-all duration-300"
          >
            View Resume
          </a>
          <a
            href="https://github.com/aakash-rajbhar"
            target="_blank"
            className="group inline-flex items-center gap-3 text-sm font-semibold tracking-widest uppercase py-4 text-zinc-900 dark:text-white px-8 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-300"
          >
            GitHub
          </a>
        </motion.div>
      </div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        className="flex-1 rounded-3xl overflow-hidden w-full max-w-xl"
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      >
        <img
          src="/profile.jpg"
          alt="profile picture"
          className="w-full h-full object-cover rounded-3xl"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
