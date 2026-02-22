"use client";
import { motion } from "motion/react";
// import { GraduationCap } from 'lucide-react';
import SectionHeading from "../ui/SectionHeading";
import { RESUME_DATA } from "@/lib/resume-data";

export default function Education() {
  return (
    <section className="py-40 px-8 max-w-7xl mx-auto">
      <SectionHeading number="03">Education</SectionHeading>
      <div className="grid md:grid-cols-2 gap-20">
        <div className="space-y-16">
          {RESUME_DATA.education.map((edu, idx) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8 border-l border-ink/10 group hover:border-ink transition-colors"
            >
              <div className="absolute -left-1.25 top-0 w-2.25 h-2.25 rounded-full bg-ink/20 group-hover:bg-ink transition-colors" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40 mb-4">
                {edu.year}
              </p>
              <h3 className="text-3xl md:text-4xl font-display tracking-tighter uppercase leading-tight mb-4 group-hover:italic transition-all">
                {edu.institution}
              </h3>
              <div className="flex flex-col gap-1">
                <p className="text-xl font-serif italic opacity-60">
                  {edu.degree}
                </p>
                <p className="font-mono text-xs tracking-wider opacity-40">
                  {edu.score}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col justify-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-4xl font-serif italic leading-tight opacity-80 mb-8">
              {RESUME_DATA.education[0].description}
            </p>
            <div className="h-px w-24 bg-ink opacity-20" />
          </motion.div>

          <div className="flex flex-wrap gap-x-8 gap-y-6">
            {[
              "Problem Solving",
              "Analytical Thinking",
              "Software Development",
            ].map((skill, idx) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity cursor-default"
              >
                / {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
