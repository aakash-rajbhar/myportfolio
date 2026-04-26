"use client";

import { DIGITAL_ASSETS } from "@/lib/digital-assets";
import SectionHeading from "./HeroHeading";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Download } from "lucide-react";
import Link from "next/link";

export default function DigitalAssets() {
  return (
    <section id="assets" className="py-40 px-8 max-w-7xl mx-auto">
      <SectionHeading number="03">Digital Assets</SectionHeading>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
        {DIGITAL_ASSETS.map((asset, idx) => (
          <motion.article
            key={asset.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.45, ease: "easeOut" }}
            className="group/card relative aspect-square overflow-hidden rounded-4xl border border-ink/10 bg-bg/80 shadow-[0_24px_90px_-54px_rgba(15,15,15,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
          >
            <div className="absolute inset-0 bg-linear-to-br from-ink/4 via-transparent to-ink/8 opacity-80 transition duration-500 group-hover/card:opacity-100 dark:from-white/5 dark:to-white/8" />
            <div className="absolute inset-px rounded-[calc(2rem-1px)] border border-white/40 opacity-60 transition duration-500 group-hover/card:opacity-100 dark:border-white/10" />

            <div className="relative h-full overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={asset.image}
                  alt={asset.title}
                  width={800}
                  height={500}
                  className="h-full w-full object-cover transition duration-700 group-hover/card:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-ink/55 via-ink/15 to-transparent opacity-95 transition duration-500 group-hover/card:opacity-100 dark:from-[#0f0f0f] dark:via-[#0f0f0f]/35" />
                <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
                  <span className="rounded-full border border-ink/10 bg-bg/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.35em] text-ink/70 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                    {asset.type}
                  </span>

                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 translate-y-[calc(100%-8rem)] bg-linear-to-t from-bg/95 via-bg/78 to-ink/25 p-6 backdrop-blur-xl transition-transform duration-500 ease-out group-hover/card:translate-y-0 dark:border-white/10 dark:from-[#0f0f0f]/98 dark:via-[#0f0f0f]/88 dark:to-[#0f0f0f]/45">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-ink/95 dark:text-white/45">
                      Featured preview
                    </p>
                    <h3 className="mt-1 text-2xl font-display tracking-tight text-ink dark:text-white">
                      {asset.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65 dark:text-white/65">
                      {asset.subtTitle}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <p className="text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    {asset.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {asset.highlights?.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-ink/10 bg-ink/4 px-3 py-1 text-[11px] text-ink/65 dark:border-white/10 dark:bg-white/6 dark:text-white/70"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-1 opacity-0 translate-y-3 transition-all duration-500 group-hover/card:opacity-100 group-hover/card:translate-y-0">
                    {asset.links.primary && (
                      <Link
                        href={asset.links.primary.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-bg transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/20 dark:bg-white dark:text-black"
                      >
                        {asset.links.primary.label}
                        <Download size={14} />
                      </Link>
                    )}

                    {asset.links.secondary && (
                      <Link
                        href={asset.links.secondary.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-bg/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-ink/75 transition duration-300 hover:-translate-y-0.5 hover:border-ink/20 hover:bg-ink/4 dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10"
                      >
                        {asset.links.secondary.label}
                        <ExternalLink size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
