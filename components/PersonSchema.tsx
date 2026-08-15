// components/PersonSchema.tsx
//
// Renders JSON-LD structured data telling Google this page represents
// a specific Person. This helps your name query surface this page with
// higher confidence, and can eventually contribute to a knowledge panel.
//
// Fill in the TODOs below with your real links, then drop this
// component into app/layout.tsx (see usage note at the bottom).

export default function PersonSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aakash Rajbhar",
    url: "https://aakashrajbhar.vercel.app",
    jobTitle: "Full-Stack Web Developer",
    description:
      "Full-stack web developer building products with Next.js, React and Django.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Faridabad",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Django",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Docker",
      "AWS",
      "REST APIs",
      "Web Vitals"
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Guru Gobind Singh Indraprastha University",
    },
    sameAs: [
      // TODO: replace with your real profile URLs
      "https://github.com/aakash-rajbhar",
      "https://linkedin.com/in/aakash-rajbhar",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}