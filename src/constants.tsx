import type { Project, ExperienceItem } from "./types";

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "SecureKeep",
    category: "Security / Web App",
    image: "/securekeep.png",
    description:
      "A full-stack credential management system featuring AES-256 encryption, JWT authentication with HTTP-only cookies, and CSV export capabilities.",
    link: "https://github.com/aakash-rajbhar/SecureKeep-Password-Manager",
    demo: "https://securekeep.vercel.app",
    tags: ["Next.js", "Node.js", "MongoDB", "AES-256", "JWT"],
    color: "bg-blue-600",
  },
  {
    id: 2,
    title: "Storely",
    category: "Cloud Storage",
    image: "/storely.webp",
    description:
      "A Google Drive-inspired cloud storage platform with OTP-based authentication and multi-format support for images, videos, and documents.",
    link: "https://github.com/aakash-rajbhar/Storage-App",
    demo: "https://storely-web.vercel.app",
    tags: ["Next.js", "Appwrite", "Tailwind CSS", "Auth"],
    color: "bg-zinc-800",
  },
  {
    id: 3,
    title: "Online Code Editor",
    category: "Code Editor",
    image: "/code-editor.webp",
    description:
      "A fully functional web code editor with a live preview and multi language support to quickly run and test your code.",
    link: "https://github.com/aakash-rajbhar/Online-Code-Editor",
    demo: "https://my-online-code-editor.vercel.app/",
    tags: ["React.js", "Monaco Editor", "Tailwind CSS", "Chakra UI"],
    color: "bg-cyan-800",
  },
  {
    id: 4,
    title: "Price Lytic: Price Tracker App",
    category: "Web Scraping",
    image: "/price-tracker.webp",
    description:
      "A price tracker app that allows users to track the price of products on e-commerce websites. Leverages the web scraping technique to get the best price of the product.",
    link: "https://github.com/aakash-rajbhar/E-Commerce-Price-Tracker",
    demo: "https://price-lytic.vercel.app/",
    tags: ["Next.js", "Tailwind CSS", "Bright Data", "Web Scraping"],
    color: "bg-violet-800",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    year: "July — Oct* 2025",
    role: "Web Developer Intern",
    company: "Razorpod",
    location: "Gurugram, India",
    description:
      "Improved performance by 30% through caching and code refactoring. Built responsive UIs using SSR, SSG, and ISR. Integrated Strapi CMS for dynamic scalability.",
  },
  {
    year: "June — Sep 2025",
    role: "MERN Stack Developer Intern",
    company: "GRID R&D",
    location: "Remote",
    description:
      "Developed optimized responsive webpages using PostgreSQL and Node.js. Built an invite feature that increased user engagement by 25%. Resolved 20+ core bugs.",
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Technology in Information Technology",
    institution: "Guru Gobind Singh Indraprastha University",
    year: "2022 — 2026",
    score: "9.2 CGPA",
    description:
      "Specialized in Information Technology and Computer Science. Core coursework included Data Structures, Algorithms, Operating System, Computer Network and Database Management.",
  },
  {
    degree: "High School",
    institution: "Govt. Boys Sr. Secondary School Kalkaji",
    year: "2019 — 2021",
    score: "85%",
    description:
      "Specialized in Physics, Chemistry and Maths with Computer Science and English as other subjects.",
  },
];

export const SKILLS = {
  languages: ["JavaScript", "TypeScript", "Python", "Java"],
  web: ["Next.js", "React.js", "Node.js", "Tailwind CSS", "HTML/CSS"],
  database: ["MongoDB", "PostgreSQL", "MySQL"],
  tools: ["Git/GitHub", "Redux", "Docker", "CI/CD", "Strapi", "Cloudinary"],
  design: ["Figma", "Blender", "Photoshop"],
};

export const THEME_DETAILS = {
  name: "SkyCode Dark",
  url: "https://marketplace.visualstudio.com/items?itemName=AakashRajbhar.skycode-dark",
  image: "/theme-extension.webp", // Placeholder for VS Code Preview
  description:
    "Created a sleek, minimal dark theme for VS Code designed for focused long-term coding sessions with high-contrast pastel syntax highlighting.",
};

export const BIO = `Hi, I'm a Full Stack Developer passionate about creating seamless web experiences. I work with React.js, Next.js, Node.js, MongoDB, and TypeScript to build secure, scalable, and user-friendly applications that solve real problems.`;
