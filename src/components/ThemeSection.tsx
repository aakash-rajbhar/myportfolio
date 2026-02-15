import React from "react";
import { motion } from "framer-motion";
import { THEME_DETAILS } from "../constants";

const ThemeSection: React.FC = () => {
  return (
    <section className="py-32 border-t border-zinc-200 dark:border-zinc-900 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-zinc-400 mb-2">
              Extension
            </h2>
            <p className="text-5xl font-serif italic mb-6 text-zinc-900 dark:text-zinc-100">
              {THEME_DETAILS.name}
            </p>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-lg">
              {THEME_DETAILS.description}
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href={THEME_DETAILS.url}
              target="_blank"
              className="inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase  bg-zinc-900 dark:bg-zinc-200 hover:bg-blue-700 text-white dark:text-black px-8 py-4 rounded-full transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.706.218L8.55 7.927 4.56 5.34a1.494 1.494 0 0 0-1.706.218L.21 8.192a1.494 1.494 0 0 0 .193 2.193l4.56 3.614-4.56 3.614a1.494 1.494 0 0 0-.193 2.193l2.644 2.635a1.494 1.494 0 0 0 2.193-.193l3.99-3.99 3.99 3.99a1.494 1.494 0 0 0 2.193.193l2.644-2.635a1.494 1.494 0 0 0-.193-2.193l-4.56-3.614 4.56-3.614a1.494 1.494 0 0 0 .193-2.193L23.15 2.587z" />
              </svg>
              Install on VS Code
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group cursor-pointer"
          onClick={() => window.open(THEME_DETAILS.url, "_blank")}
        >
          {/* <div className="absolute inset-0 bg-zinc-600/20 rounded-3xl blur-3xl group-hover:bg-blue-600/30 transition-all"></div> */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 md:shadow-2xl">
            <img
              src={THEME_DETAILS.image}
              alt="SkyCode Dark Preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-8">
              <span className="text-white text-xs font-bold tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                Preview of the SkyCode theme extension
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThemeSection;
