import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

// Fallback for Devanagari glyphs, which none of the fonts above cover —
// the browser reaches for this automatically wherever Hindi text appears.
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Aakash Rajbhar — Full-Stack Web Developer",
  description:
    "Full-stack web developer working across Next.js, React, TypeScript and Django — building production features, APIs and shipped products.",
  metadataBase: new URL("https://aakashrajbhar.vercel.app"),
  openGraph: {
    title: "Aakash Rajbhar — Full-Stack Web Developer",
    description:
      "Full-stack web developer working across Next.js, React, TypeScript and Django.",
    url: "https://aakashrajbhar.vercel.app",
    siteName: "Aakash Rajbhar",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${devanagari.variable}`}
    >
      <head>
        {/* Blocking script: applies the saved/system theme before paint so
            there's no flash of the wrong theme on load. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try {
  var t = localStorage.getItem('theme');
  if (!t) t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  if (t === 'light') document.documentElement.classList.add('light');
} catch (e) {}`,
          }}
        />
      </head>
      <body className="font-body antialiased selection:bg-fg selection:text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
