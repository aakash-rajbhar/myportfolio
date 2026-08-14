"use client";

import { useState } from "react";
import GridSpotlight from "@/components/GridSpotlight";
import Nav from "@/components/Nav";
import CommandPalette from "@/components/CommandPalette";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-ink">
      <GridSpotlight />
      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />

      <div className="relative z-10">
        <ScrollIndicator />
        <Hero />
        <Experience />
        <Projects />
        <Stack />
        <Education />
        <Footer />
      </div>
    </main>
  );
}
