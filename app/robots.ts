import { MetadataRoute } from "next";

// Next.js auto-serves this at /robots.txt when placed at app/robots.ts
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://aakashrajbhar.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}