import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import type { Theme } from "../types.ts";
import { Moon, Sun } from "lucide-react";

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      // Activate blur effect after scrolling 100px
      setIsScrolled(latest > 100);
    });

    return () => unsubscribe();
  }, [scrollY]);

  const navItems = [
    { label: "Work", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center transition-all duration-500 ${
        isScrolled
          ? "bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md shadow-sm"
          : "mix-blend-difference"
      }`}
    >
      <div
        className={`text-xl font-bold tracking-tighter uppercase transition-colors duration-500 ${
          isScrolled ? "text-zinc-900 dark:text-white" : "text-white"
        }`}
      >
        Aakash<span className="text-zinc-500">.</span>
      </div>

      <div className="flex items-center gap-8">
        <div
          className={`hidden md:flex gap-8 text-sm font-medium tracking-wide transition-colors duration-500 ${
            isScrolled ? "text-zinc-700 dark:text-zinc-300" : "text-white"
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:opacity-60 transition-opacity"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={toggleTheme}
          className="relative w-12 h-7 rounded-full bg-zinc-300 dark:bg-zinc-800 transition-colors p-1 flex items-center"
          aria-label="Toggle Theme"
        >
          <motion.div animate={{ x: theme === "dark" ? 20 : 1 }}>
            {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </motion.div>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
