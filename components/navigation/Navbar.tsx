"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import ScrollProgress from "../ui/ScrollProgress";

const navItems = [
  { name: "INDEX", href: "/" },
  { name: "WORK", href: "/#work" },
  { name: "SKILLS", href: "/#skills" },
  { name: "BLOGS", href: "/blog" },
];

const MotionLink = motion.create(Link);

export function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-500",
        scrolled ? "p-4 md:p-6 glass" : "p-8",
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-display text-2xl tracking-tighter cursor-pointer"
      >
        AAKASH.
      </Link>

      {/* Desktop Navigation */}
      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-12">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href;

            return (
              <MotionLink
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "text-xs font-mono tracking-widest transition-all",
                  isActive
                    ? "opacity-100 underline underline-offset-8"
                    : "opacity-40 hover:opacity-80",
                )}
              >
                {item.name}
              </MotionLink>
            );
          })}
        </div>

        <ThemeToggle />

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 w-screen h-screen bg-bg z-9999 p-8 flex flex-col justify-center items-center gap-12 md:hidden"
          >
            <button
              className="absolute top-8 right-8"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-6xl font-display tracking-tighter"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <ScrollProgress />
    </nav>
  );
}
