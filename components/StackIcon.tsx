"use client";

import { Binary, Braces, Boxes, Gauge, Layers, Network, Workflow, Zap } from "lucide-react";
import { FaAws, FaJava } from "react-icons/fa";
import {
  SiCss,
  SiDjango,
  SiDocker,
  SiExpress,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedux,
  SiSentry,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const iconMap: Record<string, React.ElementType> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  Java: FaJava,
  "Next.js": SiNextdotjs,
  "React.js": SiReact,
  HTML: SiHtml5,
  CSS: SiCss,
  "Tailwind CSS": SiTailwindcss,
  Redux: SiRedux,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  Django: SiDjango,
  "REST APIs": Braces,
  JWT: SiJsonwebtokens,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  "Git/GitHub": SiGithub,
  Docker: SiDocker,
  AWS: FaAws,
  "CI/CD": Workflow,
  Prisma: SiPrisma,
  Stripe: SiStripe,
  Sentry: SiSentry,
  Jest: SiJest,
  OOP: Boxes,
  "Data Structures": Network,
  Algorithms: Binary,
  Agile: Zap,
  "Design Patterns": Layers,
  "Web Vitals": Gauge,
};

export function StackIcon({ name, size = 14, className }: { name: string; size?: number; className?: string }) {
  const Icon: React.ElementType = iconMap[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} alt={name} />;
}
