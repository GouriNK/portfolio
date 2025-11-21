'use client';

import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Project = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A personal portfolio built with Next.js, Tailwind CSS, and shadcn/ui.",
    thumbnail: "/assets/dummy-project.png",
    tags: ["Next.js", "Tailwind", "shadcn/ui"],
  },
  {
    id: 2,
    title: "Task Manager",
    description:
      "A simple task manager app to track todos and productivity.",
    thumbnail: "/assets/dummy-project.png",
    tags: ["React", "TypeScript", "UI/UX"],
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A dashboard showing live weather data and forecasts for multiple cities.",
    thumbnail: "/assets/dummy-project.png",
    tags: ["API", "Dashboard", "Charts"],
  },
  {
    id: 4,
    title: "E-commerce Store",
    description:
      "A minimal e-commerce storefront with product listing and cart.",
    thumbnail: "/assets/dummy-project.png",
    tags: ["E-commerce", "Next.js", "Stripe"],
  },
  {
    id: 5,
    title: "Blog Platform",
    description:
      "A markdown-based blog platform with categories and search.",
    thumbnail: "/assets/dummy-project.png",
    tags: ["Content", "MDX", "SEO"],
  },
  {
    id: 6,
    title: "Analytics Overview",
    description:
      "An analytics overview page showing key KPIs and charts.",
    thumbnail: "/assets/dummy-project.png",
    tags: ["Analytics", "Dashboard", "Charts"],
  },
  {
    id: 12,
    title: "Portfolio Website",
    description:
      "A personal portfolio built with Next.js, Tailwind CSS, and shadcn/ui.",
    thumbnail: "/assets/dummy-project.png",
    tags: ["Next.js", "Tailwind", "shadcn/ui"],
  },
  {
    id: 22,
    title: "Task Manager",
    description:
      "A simple task manager app to track todos and productivity.",
    thumbnail: "/assets/dummy-project.png",
    tags: ["React", "TypeScript", "UI/UX"],
  },
  {
    id: 32,
    title: "Weather Dashboard",
    description:
      "A dashboard showing live weather data and forecasts for multiple cities.",
    thumbnail: "/assets/dummy-project.png",
    tags: ["API", "Dashboard", "Charts"],
  },
  {
    id: 42,
    title: "E-commerce Store",
    description:
      "A minimal e-commerce storefront with product listing and cart.",
    thumbnail: "/assets/dummy-project.png",
    tags: ["E-commerce", "Next.js", "Stripe"],
  },
  {
    id: 52,
    title: "Blog Platform",
    description:
      "A markdown-based blog platform with categories and search.",
    thumbnail: "/assets/dummy-project.png",
    tags: ["Content", "MDX", "SEO"],
  },
  {
    id: 62,
    title: "Analytics Overview",
    description:
      "An analytics overview page showing key KPIs and charts.",
    thumbnail: "/assets/dummy-project.png",
    tags: ["Analytics", "Dashboard", "Charts"],
  },
];

export default function ProjectsPage() {

  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return projects;

    return projects.filter((project) => {
      const inTitle = project.title.toLowerCase().includes(q);
      const inDescription = project.description.toLowerCase().includes(q);
      const inTags = project.tags.some((tag) =>
        tag.toLowerCase().includes(q)
      );
      return inTitle || inDescription || inTags;
    });
  }, [query]);
    return (
    <section className="container mx-auto space-y-10">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <Input
            type="text"
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-16 rounded-xl bg-white dark:bg-neutral-900 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col overflow-hidden border border-black/10 dark:border-[#CDCFC9]/30"
          >
            <div className="relative h-40 w-full">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            <CardHeader>
              <CardTitle className="text-lg">{project.title}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mt-auto flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredProjects.length === 0 && (
          <p className="col-span-full text-center text-sm text-gray-600 dark:text-gray-400">
            No projects found for “{query}”.
          </p>
        )}
      </div>
    </section>
  );
}