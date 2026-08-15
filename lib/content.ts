export type Lang = "en" | "hi";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  period: string;
  stack: string[];
  bullets: string[];
}

interface ProjectItem {
  id: string;
  name: string;
  description: string;
  bullets: string[];
  stack: string[];
  links: { code: string; demo: string };
  labels: { code: string; demo: string };
}

interface StackGroup {
  label: string;
  items: string[];
}

interface CertificationItem {
  name: string;
  issuer: string;
}

interface PaletteCommand {
  id: string;
  label: string;
  hint: string;
}

interface Content {
  name: string;
  role: string;
  tagline: string;
  location: string;
  nav: {
    work: string;
    projects: string;
    stack: string;
    education: string;
    contact: string;
  };
  hero: {
    badge: string;
    diffPlus1: string;
    diffPlus2: string;
    diffMinus: string;
    bioBefore: string;
    bioCompany: string;
    bioAfter: string;
    statsLabels: [string, string, string, string];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  sectionHeadings: {
    work: { title: string; note: string };
    projects: { title: string; note: string };
    stack: { title: string };
    education: { title: string };
  };
  experience: ExperienceItem[];
  projects: ProjectItem[];
  stackGroups: StackGroup[];
  education: {
    school: string;
    degree: string;
    period: string;
    detail: string;
    certificationsHeading: string;
    certifications: CertificationItem[];
  };
  footer: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    copiedLabel: string;
    socialGithub: string;
    socialLinkedin: string;
    creditPrefix: string;
  };
  palette: {
    placeholder: string;
    noMatches: string;
    copiedLabel: string;
    commands: PaletteCommand[];
  };
  githubCalendar: {
    heading: string;
    subtitle: (total: number) => string;
  };
  themeToggle: { toLight: string; toDark: string };
  langToggle: { label: string };
}

export const content: Record<Lang, Content> = {
  en: {
    name: "Aakash Rajbhar",
    role: "Full-Stack Web Developer",
    tagline:
      "Building full-stack products with Next.js, React and Node.js — from schema to shipped.",
    location: "Faridabad, Haryana, India",
    nav: {
      work: "Work",
      projects: "Projects",
      stack: "Stack",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      badge: "open to work",
      diffPlus1: "full-stack, end to end — frontend, backend, tests, monitoring",
      diffPlus2: "3 internships, 10+ shipped products, one production migration",
      diffMinus: "yet another unfinished to-do app portfolio",
      bioBefore: "Currently building at ",
      bioCompany: "WhatBytes",
      bioAfter:
        " — Next.js and Django in the same stack, Stripe and AWS in production.",
      statsLabels: ["Internships", "Personal projects", "Tests written", "CGPA"],
      ctaPrimary: "Get in touch",
      ctaSecondary: "Download Resume",
    },
    sectionHeadings: {
      work: { title: "Work", note: "3 roles · reverse-chronological" },
      projects: { title: "Projects", note: "2 shipped" },
      stack: { title: "Stack" },
      education: { title: "Education" },
    },
    experience: [
      {
        id: "whatbytes",
        company: "WhatBytes",
        role: "Web Developer Intern",
        location: "Remote",
        duration: "Current",
        period: "Feb 2026 — Present",
        stack: ["Next.js", "React", "TypeScript", "Django", "PostgreSQL", "AWS", "Stripe"],
        bullets: [
          "Built full-stack features across Next.js, React, TypeScript, Django and PostgreSQL, shipping REST APIs and wiring frontend to backend end to end.",
          "Integrated Stripe to enable secure, end-to-end payment workflows.",
          "Migrated 1 production application and deployed 3+ projects on AWS — EC2, RDS, S3 and Amplify.",
          "Wrote 200+ unit and end-to-end tests with Jest and Playwright, raising release confidence.",
          "Wired up Sentry and PostHog for production monitoring, cutting time-to-detect on live issues.",
        ],
      },
      {
        id: "razorpod",
        company: "Razorpod",
        role: "Web Developer Intern",
        location: "On-site — Gurugram",
        duration: "4 mo",
        period: "Jul 2025 — Oct 2025",
        stack: ["Next.js", "SSR/SSG/ISR", "Strapi CMS", "REST APIs"],
        bullets: [
          "Improved site performance by 35% through component optimization, caching and refactors.",
          "Built responsive UIs in Next.js using SSR, SSG and ISR for faster loads and better SEO.",
          "Integrated REST APIs and Strapi CMS for dynamic, scalable content management.",
          "Picked up Agile, DevOps and CI/CD practice while owning features end to end.",
        ],
      },
      {
        id: "grid",
        company: "GRID R&D",
        role: "MERN Stack Developer Intern",
        location: "Remote",
        duration: "3 mo",
        period: "Jun 2025 — Aug 2025",
        stack: ["React.js", "Node.js", "Express", "PostgreSQL"],
        bullets: [
          "Built and optimized responsive webpages with React, Node.js, Express and PostgreSQL.",
          "Shipped an invite feature for sending and managing invitations, lifting user engagement by 25%.",
          "Diagnosed and resolved 20+ frontend and backend issues, reducing bug reports.",
        ],
      },
    ],
    projects: [
      {
        id: "securekeep",
        name: "SecureKeep",
        description:
          "A secure credential management backend built around AES-256 encryption and JWT auth, with server-side validation and authorization on every route.",
        bullets: [
          "AES-256 encrypted credential storage with JWT-based authentication.",
          "RESTful APIs with server-side validation, authentication and authorization.",
          "OOP and modular design for maintainable, testable backend code.",
        ],
        stack: ["Next.js", "Node.js", "TypeScript", "JWT", "MongoDB", "Tailwind CSS", "Nodemailer"],
        links: { code: "https://github.com/aakash-rajbhar/SecureKeep-Password-Manager", demo: "https://securekeep.vercel.app/" },
        labels: { code: "code", demo: "demo" },
      },
      {
        id: "storely",
        name: "Storely",
        description:
          "A cloud storage platform with file upload, sharing and access control, backed by OTP-based authentication.",
        bullets: [
          "Backend APIs for file upload, sharing and access control.",
          "OTP-based authentication and secure data handling.",
          "Optimized backend performance for reliability under concurrent users.",
        ],
        stack: ["Next.js", "Appwrite", "Tailwind CSS"],
        links: { code: "https://github.com/aakash-rajbhar/Storage-App", demo: "https://storely-web.vercel.app/" },
        labels: { code: "code", demo: "demo" },
      },
    ],
    stackGroups: [
      { label: "Languages", items: ["JavaScript", "TypeScript", "Python", "Java"] },
      { label: "Frontend", items: ["Next.js", "React.js", "HTML", "CSS", "Tailwind CSS", "Redux"] },
      { label: "Backend", items: ["Node.js", "Express.js", "Django", "REST APIs", "JWT"] },
      { label: "Database", items: ["MongoDB", "MySQL", "PostgreSQL"] },
      { label: "Tools", items: ["Git/GitHub", "Docker", "AWS", "CI/CD", "Prisma", "Stripe", "Sentry", "Jest"] },
      { label: "Others", items: ["OOP", "Data Structures", "Algorithms", "Agile", "Design Patterns", "Web Vitals"] },
    ],
    education: {
      school: "Guru Gobind Singh Indraprastha University",
      degree: "B.Tech, Information Technology",
      period: "2022 — 2026",
      detail: "CGPA 9.2 / 10",
      certificationsHeading: "Certifications",
      certifications: [
        { name: "SQL & Relational Databases", issuer: "IBM" },
        { name: "Machine Learning with Python", issuer: "IBM" },
      ],
    },
    footer: {
      eyebrow: "05 / Contact",
      heading: "Open to full-stack roles and interesting builds.",
      paragraph:
        "Based in {location}. Fastest way to reach me is email — I usually reply within a day.",
      copiedLabel: "Copied ✓",
      socialGithub: "GitHub ↗",
      socialLinkedin: "LinkedIn ↗",
      creditPrefix: "Built with Next.js, Tailwind CSS and Motion — ©",
    },
    palette: {
      placeholder: "Type a command…",
      noMatches: "no matches",
      copiedLabel: "Copied ✓",
      commands: [
        { id: "work", label: "Go to Work", hint: "section" },
        { id: "projects", label: "Go to Projects", hint: "section" },
        { id: "stack", label: "Go to Stack", hint: "section" },
        { id: "education", label: "Go to Education", hint: "section" },
        { id: "contact", label: "Go to Contact", hint: "section" },
        { id: "copy-email", label: "Copy email", hint: "clipboard" },
        { id: "github", label: "Open GitHub", hint: "external" },
        { id: "linkedin", label: "Open LinkedIn", hint: "external" },
      ],
    },
    githubCalendar: {
      heading: "GitHub activity",
      subtitle: (total: number) => `${total.toLocaleString()} contributions, last year`,
    },
    themeToggle: { toLight: "Switch to light mode", toDark: "Switch to dark mode" },
    langToggle: { label: "हिंदी" },
  },
  hi: {
    name: "आकाश राजभर",
    role: "फुल-स्टैक वेब डेवलपर",
    tagline:
      "Next.js, React और Node.js के साथ फुल-स्टैक प्रोडक्ट बनाना — स्कीमा से लेकर लॉन्च तक।",
    location: "फरीदाबाद, हरियाणा, भारत",
    nav: {
      work: "अनुभव",
      projects: "प्रोजेक्ट्स",
      stack: "स्टैक",
      education: "शिक्षा",
      contact: "संपर्क",
    },
    hero: {
      badge: "काम के लिए उपलब्ध",
      diffPlus1: "फुल-स्टैक, शुरू से आख़िर तक — फ्रंटएंड, बैकएंड, टेस्ट्स, मॉनिटरिंग",
      diffPlus2: "3 इंटर्नशिप, 2 लॉन्च प्रोडक्ट्स, एक प्रोडक्शन माइग्रेशन",
      diffMinus: "एक और अधूरा टू-डू ऐप पोर्टफोलियो नहीं",
      bioBefore: "फिलहाल काम कर रहा हूं ",
      bioCompany: "WhatBytes",
      bioAfter:
        " में — एक ही स्टैक में Next.js और Django, प्रोडक्शन में Stripe और AWS के साथ।",
      statsLabels: ["इंटर्नशिप", "व्यक्तिगत प्रोजेक्ट्स", "लिखे गए टेस्ट", "सीजीपीए"],
      ctaPrimary: "संपर्क करें",
      ctaSecondary: "रिज़्यूमे डाउनलोड करें",
    },
    sectionHeadings: {
      work: { title: "अनुभव", note: "3 भूमिकाएं · नवीनतम पहले" },
      projects: { title: "प्रोजेक्ट्स", note: "2 लॉन्च" },
      stack: { title: "स्टैक" },
      education: { title: "शिक्षा" },
    },
    experience: [
      {
        id: "whatbytes",
        company: "WhatBytes",
        role: "वेब डेवलपर इंटर्न",
        location: "रिमोट",
        duration: "वर्तमान",
        period: "फ़रवरी 2026 — अभी तक",
        stack: ["Next.js", "React", "TypeScript", "Django", "PostgreSQL", "AWS", "Stripe"],
        bullets: [
          "Next.js, React, TypeScript, Django और PostgreSQL के साथ फुल-स्टैक फीचर बनाए, REST APIs शिप किए और फ्रंटएंड को बैकएंड से पूरी तरह जोड़ा।",
          "सुरक्षित, एंड-टू-एंड पेमेंट वर्कफ़्लो के लिए Stripe इंटीग्रेट किया।",
          "1 प्रोडक्शन एप्लिकेशन माइग्रेट किया और AWS (EC2, RDS, S3, Amplify) पर 3+ प्रोजेक्ट डिप्लॉय किए।",
          "Jest और Playwright के साथ 50+ यूनिट और एंड-टू-एंड टेस्ट लिखे, जिससे रिलीज़ पर भरोसा बढ़ा।",
          "प्रोडक्शन मॉनिटरिंग के लिए Sentry और PostHog सेटअप किया, जिससे लाइव इश्यू जल्दी पकड़ में आते हैं।",
        ],
      },
      {
        id: "razorpod",
        company: "Razorpod",
        role: "वेब डेवलपर इंटर्न",
        location: "ऑनसाइट — गुड़गांव",
        duration: "4 महीने",
        period: "जुलाई 2025 — अक्टूबर 2025",
        stack: ["Next.js", "SSR/SSG/ISR", "Strapi CMS", "REST APIs"],
        bullets: [
          "कॉम्पोनेंट ऑप्टिमाइज़ेशन, कैशिंग और रीफैक्टरिंग से साइट परफॉर्मेंस 35% बेहतर की।",
          "तेज़ लोडिंग और बेहतर SEO के लिए Next.js में SSR, SSG और ISR का उपयोग करके रिस्पॉन्सिव UI बनाए।",
          "डायनामिक, स्केलेबल कंटेंट मैनेजमेंट के लिए REST APIs और Strapi CMS इंटीग्रेट किया।",
          "फीचर्स को शुरू से आख़िर तक खुद संभालते हुए Agile, DevOps और CI/CD की प्रैक्टिस सीखी।",
        ],
      },
      {
        id: "grid",
        company: "GRID R&D",
        role: "MERN स्टैक डेवलपर इंटर्न",
        location: "रिमोट",
        duration: "3 महीने",
        period: "जून 2025 — अगस्त 2025",
        stack: ["React.js", "Node.js", "Express", "PostgreSQL"],
        bullets: [
          "React, Node.js, Express और PostgreSQL के साथ रिस्पॉन्सिव वेबपेज बनाए और ऑप्टिमाइज़ किए।",
          "इनवाइट भेजने और मैनेज करने का फीचर बनाया, जिससे यूज़र एंगेजमेंट 25% बढ़ा।",
          "20+ फ्रंटएंड और बैकएंड इश्यू ढूंढे और ठीक किए, जिससे बग रिपोर्ट्स कम हुईं।",
        ],
      },
    ],
    projects: [
      {
        id: "securekeep",
        name: "SecureKeep",
        description:
          "AES-256 एन्क्रिप्शन और JWT ऑथ पर आधारित एक सुरक्षित क्रेडेंशियल मैनेजमेंट बैकएंड, हर रूट पर सर्वर-साइड वैलिडेशन और ऑथराइज़ेशन के साथ।",
        bullets: [
          "JWT-आधारित ऑथेंटिकेशन के साथ AES-256 एन्क्रिप्टेड क्रेडेंशियल स्टोरेज।",
          "सर्वर-साइड वैलिडेशन, ऑथेंटिकेशन और ऑथराइज़ेशन के साथ RESTful APIs।",
          "मेंटेनेबल और टेस्टेबल बैकएंड कोड के लिए OOP और मॉड्यूलर डिज़ाइन।",
        ],
        stack: ["Next.js", "Node.js", "TypeScript", "JWT", "MongoDB", "Tailwind CSS", "Nodemailer"],
        links: { code: "#", demo: "#" },
        labels: { code: "कोड", demo: "डेमो" },
      },
      {
        id: "storely",
        name: "Storely",
        description:
          "फाइल अपलोड, शेयरिंग और एक्सेस कंट्रोल वाला एक क्लाउड स्टोरेज प्लेटफ़ॉर्म, OTP-आधारित ऑथेंटिकेशन के साथ।",
        bullets: [
          "फाइल अपलोड, शेयरिंग और एक्सेस कंट्रोल के लिए बैकएंड APIs।",
          "OTP-आधारित ऑथेंटिकेशन और सुरक्षित डेटा हैंडलिंग।",
          "एक साथ कई यूज़र्स के लिए बैकएंड परफॉर्मेंस को ऑप्टिमाइज़ किया।",
        ],
        stack: ["Next.js", "Appwrite", "Tailwind CSS"],
        links: { code: "#", demo: "#" },
        labels: { code: "कोड", demo: "डेमो" },
      },
    ],
    stackGroups: [
      { label: "भाषाएं", items: ["JavaScript", "TypeScript", "Python", "Java"] },
      { label: "फ्रंटएंड", items: ["Next.js", "React.js", "HTML", "CSS", "Tailwind CSS", "Redux"] },
      { label: "बैकएंड", items: ["Node.js", "Express.js", "Django", "REST APIs", "JWT"] },
      { label: "डेटाबेस", items: ["MongoDB", "MySQL", "PostgreSQL"] },
      { label: "टूल्स", items: ["Git/GitHub", "Docker", "AWS", "CI/CD", "Prisma", "Stripe", "Sentry", "Jest"] },
      { label: "अन्य", items: ["OOP", "Data Structures", "Algorithms", "Agile", "Design Patterns", "Web Vitals"] },
    ],
    education: {
      school: "गुरु गोबिंद सिंह इंद्रप्रस्थ विश्वविद्यालय",
      degree: "बी.टेक, इंफॉर्मेशन टेक्नोलॉजी",
      period: "2022 — 2026",
      detail: "सीजीपीए 9.2 / 10",
      certificationsHeading: "प्रमाणपत्र",
      certifications: [
        { name: "SQL और रिलेशनल डेटाबेस", issuer: "IBM" },
        { name: "पायथन के साथ मशीन लर्निंग", issuer: "IBM" },
      ],
    },
    footer: {
      eyebrow: "05 / संपर्क",
      heading: "फुल-स्टैक भूमिकाओं और दिलचस्प प्रोजेक्ट्स के लिए उपलब्ध।",
      paragraph:
        "{location} में स्थित हूं। मुझसे संपर्क का सबसे तेज़ तरीका ईमेल है — मैं आमतौर पर एक दिन में जवाब देता हूं।",
      copiedLabel: "कॉपी हो गया ✓",
      socialGithub: "GitHub ↗",
      socialLinkedin: "LinkedIn ↗",
      creditPrefix: "Next.js, Tailwind CSS और Motion के साथ बनाया गया — ©",
    },
    palette: {
      placeholder: "कमांड टाइप करें…",
      noMatches: "कोई नतीजा नहीं",
      copiedLabel: "कॉपी हो गया ✓",
      commands: [
        { id: "work", label: "अनुभव पर जाएं", hint: "सेक्शन" },
        { id: "projects", label: "प्रोजेक्ट्स पर जाएं", hint: "सेक्शन" },
        { id: "stack", label: "स्टैक पर जाएं", hint: "सेक्शन" },
        { id: "education", label: "शिक्षा पर जाएं", hint: "सेक्शन" },
        { id: "contact", label: "संपर्क पर जाएं", hint: "सेक्शन" },
        { id: "copy-email", label: "ईमेल कॉपी करें", hint: "क्लिपबोर्ड" },
        { id: "github", label: "गिटहब खोलें", hint: "बाहरी लिंक" },
        { id: "linkedin", label: "लिंक्डइन खोलें", hint: "बाहरी लिंक" },
      ],
    },
    githubCalendar: {
      heading: "गिटहब गतिविधि",
      subtitle: (total: number) => `${total.toLocaleString()} योगदान, पिछला वर्ष`,
    },
    themeToggle: { toLight: "लाइट मोड में बदलें", toDark: "डार्क मोड में बदलें" },
    langToggle: { label: "EN" },
  },
};
