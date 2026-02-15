import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import ProjectsGrid from "./components/ProjectsGrid.tsx";
import Experience from "./components/Experience.tsx";
import Contact from "./components/Contact.tsx";
import AIChat from "./components/AIChat.tsx";

import type { Theme } from "./types.ts";
import ThemeSection from "./components/ThemeSection.tsx";
import EducationSection from "./components/EducationSection.tsx";
import GithubSection from "./components/GithubSection.tsx";
import SkillsSection from "./components/SkillsSection.tsx";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";

  const savedTheme = localStorage.getItem("theme") as Theme | null;
  if (savedTheme) return savedTheme;

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-700">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="container mx-auto px-6 lg:px-12 space-y-32 py-24">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Hero />
        </motion.section>

        <section id="projects">
          <ProjectsGrid />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="skills">
          <SkillsSection />
        </section>

        <section id="education">
          <EducationSection />
        </section>

        <section id="github-contributions">
          <GithubSection theme={theme} />
        </section>

        <section id="theme-extension">
          <ThemeSection />
        </section>

        <section
          id="contact"
          className="pt-32 border-t border-zinc-200 dark:border-zinc-900"
        >
          <Contact />
        </section>
      </main>

      <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500">
        <p>
          © {new Date().getFullYear()} Aakash Rajbhar. Crafted with precision.
        </p>
      </footer>

      <AIChat theme={theme} />
    </div>
  );
};

export default App;
