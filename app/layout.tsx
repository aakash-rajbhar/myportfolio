
import Providers from "@/components/Providers";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import PersonSchema from "@/components/PersonSchema";
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
    // was incorrectly at the top level of `metadata` — Next.js only reads
    // og images from inside `openGraph`, so it was being silently ignored.
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aakash Rajbhar — Full-Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aakash Rajbhar — Full-Stack Web Developer",
    description:
      "Full-stack web developer building products with Next.js, React and Django.",
    images: ["/og-image.png"],
  },
  keywords: [
    "Aakash Rajbhar",
    "Full-Stack Developer",
    "Frontend Developer",
    "JavaScript Developer",
    "Next.js Developer",
    "React Developer",
    "Django Developer",
    "Faridabad Developer",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // TODO: after adding your site in Google Search Console, it'll give you
  // a verification code — paste it below instead of using a separate
  // HTML file for verification.
  // verification: {
  //   google: "PASTE_YOUR_VERIFICATION_CODE_HERE",
  // },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <PersonSchema />
        {/* Poppins covers Devanagari glyphs, so it serves as the fallback font
            wherever Hindi text appears. Loaded via CSS (not next/font) because
            this Next version's Poppins font data only ships latin subsets. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
        />
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
        {/* Blocking script: lock scroll before first paint so the page cannot
            be scrolled until the loader releases it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.style.overflow = 'hidden';`,
          }}
        />
      </head>
      <body className="font-body antialiased selection:bg-fg selection:text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}