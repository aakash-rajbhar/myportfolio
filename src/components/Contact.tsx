import React from "react";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  return (
    <div className="py-32 bg-zinc-900 text-white rounded-[3rem] px-12 text-center overflow-hidden relative ">
      <motion.div
        initial={{ scale: 1.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center text-[12vw] font-serif italic select-none"
      >
        Aakash Rajbhar
      </motion.div>

      <div className="relative z-10">
        <h2 className="text-sm font-semibold tracking-widest uppercase mb-6 opacity-60">
          Get in touch
        </h2>
        <p className="text-4xl md:text-7xl font-serif mb-12 max-w-3xl mx-auto leading-tight">
          Ready to build something creative and scalable?
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
          <a
            href="mailto:akash.kumarajbhar@gmail.com"
            className="text-xl md:text-3xl font-light hover:opacity-50 transition-opacity underline underline-offset-8 decoration-zinc-700"
          >
            akash.kumarajbhar@gmail.com
          </a>
        </div>

        <div className="flex items-center justify-center gap-12 text-xs font-bold tracking-widest uppercase opacity-40">
          <a
            href="https://linkedin.com/in/aakash-rajbhar"
            target="_blank"
            className="hover:opacity-100 transition-opacity"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/aakash-rajbhar"
            target="_blank"
            className="hover:opacity-100 transition-opacity"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/aakashrajbhar25"
            target="_blank"
            className="hover:opacity-100 transition-opacity"
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
