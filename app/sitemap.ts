import { MetadataRoute } from "next";

// Next.js auto-serves this at /sitemap.xml when placed at app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aakashrajbhar.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // If you add more routes later (e.g. /projects/[slug]), list them here too.
  ];
}