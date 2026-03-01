
export const RESUME_DATA = {
  name: "Aakash Rajbhar",
  role: "Full Stack Developer",
  email: "akash.kumarajbhar@gmail.com",
  location: "Faridabad, Haryana, India",
  links: {
    linkedin: "https://linkedin.com/in/aakash-rajbhar",
    github: "https://github.com/aakash-rajbhar",
    portfolio: "https://aakashrajbhar.netlify.app"
  },
  summary: "Full Stack Developer with expertise in React.js, Next.js, Node.js, MongoDB, and TypeScript. Experienced in building functional, user-friendly web applications using clean, efficient code.",
  experience: [
    {
      company: "Razorpod",
      role: "Web Developer Intern",
      period: "July 2025 – Sep 2025",
      location: "Gurugram",
      points: [
        "Improved website performance by 30% through optimized components, caching, and code refactoring.",
        "Built responsive UIs in Next.js using SSR, SSG, and ISR for faster load times and better SEO.",
        "Integrated REST APIs and Strapi CMS for dynamic content management and scalability.",
        "Learned Agile, DevOps, and CI/CD practices while contributing to end-to-end feature delivery."
      ]
    },
    {
      company: "GRID R&D",
      role: "MERN Stack Developer Intern",
      period: "June 2025 – Sep 2025",
      location: "Remote",
      points: [
        "Developed and optimized responsive webpages using React.js, Node.js, Express, and PostgreSQL.",
        "Built and integrated an invite feature that enabled users to send and manage invitations, boosting user engagement by 25%.",
        "Diagnosed and resolved 20+ frontend and backend issues, reducing bug reports and enhancing application reliability."
      ]
    }
  ],
  projects: [
    {
      name: "SecureKeep",
      image: "/projects/securekeep.png",
      link: "https://github.com/aakash-rajbhar/SecureKeep-Password-Manager",
      demo: "https://securekeep.vercel.app",
      description: "Full-stack web application for secure credential management with AES-256 encryption.",
      tools: ["Next.js", "Node.js", "TypeScript", "JWT", "MongoDB", "Tailwind CSS"],
      points: [
        "Developed full-stack web application for secure credential management with AES-256 encryption.",
        "Implemented JWT authentication with HTTP-only cookies and client-side decryption on demand.",
        "Built responsive UI with search functionality and CSV export capabilities."
      ]
    },
    {
      name: "Storely",
      image: "/projects/storage-app.png",
      link: "https://github.com/aakash-rajbhar/Storage-App",
      demo: "https://storely-web.vercel.app",
      description: "A Google Drive-like cloud storage platform with OTP-based authentication.",
      tools: ["Next.js", "Appwrite", "Tailwind CSS"],
      points: [
        "Built a Google Drive-like cloud storage platform with OTP-based authentication.",
        "Supports file upload and sharing across images, videos, audio, and document formats."
      ]
    },
    {
      name: "Online Code Editor",
      image: "/projects/code-editor.png",
      link: "https://github.com/aakash-rajbhar/Online-Code-Editor",
      demo: "https://my-online-code-editor.vercel.app/",
      description: "A web based code editor with a live preview and multi language support to quickly run and test your code. ",
      tools: ["React.js", "Piston API", "Tailwind CSS", "Chakra UI"],
      points: [
        "Built a web based code editor with a live preview and multi language support to quickly run and test your code.",
        "Integrated Piston API for executing code in 5 programming languages with real-time output display."
      ]
    },
    {
      name: "Price Lytic: Price Tracker App",
      image: "/projects/price-tracker.png",
      link: "https://github.com/aakash-rajbhar/E-Commerce-Price-Tracker",
      demo: "https://price-lytic.vercel.app/",
      description: "A web application that tracks product prices across e-commerce platforms and sends email alerts for price drops.",
      tools: ["Next.js", "Node.js", "Puppeteer", "Nodemailer", "Tailwind CSS"],
      points: [
        "Developed a web application that tracks product prices across e-commerce platforms and sends email alerts for price drops.",
        "Implemented web scraping with Puppeteer to monitor price changes and Nodemailer for automated email notifications."
      ]

    }
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Java"],
    web: ["HTML", "CSS", "Tailwind CSS", "React.js", "Next.js", "Node.js"],
    database: ["MongoDB", "MySQL", "PostgreSQL"],
    tools: ["Git/GitHub", "Docker", "CI/CD", "Agile", "Prisma", "Figma", "Strapi"],
    others: ["Redux", "REST APIs", "Express.js", "JWT", "Cloudinary", "Web vitals"]
  },
  education: [
    {
      degree: "B.Tech in IT",
      institution: "Guru Gobind Singh Indraprastha University",
      year: "2022 — 2026",
      score: "CGPA: 9.1/10",
      description: "Passionate about problem-solving and committed to delivering high-quality software solutions."
    },
    {
      degree: "High School",
      institution: "Govt. Boys Senior Secondary School, Kalkaji",
      year: "2019 — 2021",
      score: "85% (CBSE)",
      description: "Strong foundation in computer science and mathematics, with a focus on programming and software development."
    }
  ]
};