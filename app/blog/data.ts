export type BlogPost = {
  id: number;
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  slug: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building a Portfolio with Next.js and Tailwind",
    slug: "build-nextjs-portfolio",
    date: "2025-11-20",
    category: "Frontend",
    tags: ["Next.js", "Tailwind", "Portfolio"],
    summary: "How I built a modern developer portfolio using Next.js and Tailwind.",
  },
  {
    id: 2,
    title: "State Management in React: A Practical Guide",
    slug: "react-state-management",
    date: "2025-10-12",
    category: "React",
    tags: ["React", "State", "Hooks"],
    summary: "A quick overview of different ways to manage state in React apps.",
  },
  {
    id: 3,
    title: "Designing Dark Mode for Your Web App",
    slug: "design-dark-mode",
    date: "2025-09-05",
    category: "Design",
    tags: ["UI", "Dark Mode", "UX"],
    summary: "Key considerations when adding dark mode to your interface.",
  },
  {
    id: 4,
    title: "Deploying Next.js Apps to Vercel",
    slug: "deploy-nextjs-vercel",
    date: "2025-08-18",
    category: "DevOps",
    tags: ["Next.js", "Vercel", "Deployment"],
    summary: "A straightforward deployment workflow for Next.js projects on Vercel.",
  },
];