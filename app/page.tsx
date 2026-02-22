import CustomCursor from "@/components/navigation/CustomCursor";
import Education from "@/components/sections/Education";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import ChatAI from "@/components/ui/ChatAI";

export default function HomePage() {
  return (
    <div className="selection:bg-ink selection:text-bg">
      <CustomCursor />

      <main className="pt-20">
        <Hero />
        <Work />
        <Skills />
        <Education />
        <ChatAI />
        <Footer />
      </main>
    </div>
  );
}
