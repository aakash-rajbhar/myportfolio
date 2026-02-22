import { RESUME_DATA } from "@/lib/resume-data";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-40 px-8 border-t border-ink/10 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-20 items-end">
        <div>
          <h2 className="text-[10vw] font-display tracking-tighter leading-none uppercase mb-12">
            Let&apos;s <br /> Connect
          </h2>
          <div className="flex gap-12 font-mono text-xs tracking-widest opacity-60">
            <Link
              target="_blank"
              href={RESUME_DATA.links.github}
              className="hover:opacity-100 transition-opacity"
            >
              GITHUB
            </Link>
            <Link
              target="_blank"
              href={RESUME_DATA.links.linkedin}
              className="hover:opacity-100 transition-opacity"
            >
              LINKEDIN
            </Link>
            <Link
              target="_blank"
              href={`mailto:${RESUME_DATA.email}`}
              className="hover:opacity-100 transition-opacity"
            >
              EMAIL
            </Link>
          </div>
        </div>
        <div className="text-right">
          <p className="font-serif italic text-2xl mb-4 opacity-40">
            Aakash Rajbhar.
          </p>
          <p className="font-mono text-[10px] opacity-20 uppercase tracking-[0.5em]">
            © 2026 ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
