
export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  link: string;
  demo?: string;
  tags: string[];
  color: string;
}

export interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  location: string;
  description: string;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
