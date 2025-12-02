"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Repo } from "@/lib/github";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";

type ProjectsListProps = {
  repos: Repo[];
};

export function ProjectsList({ repos }: ProjectsListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return repos;

    return repos.filter((repo) => {
      const name = repo.name?.toLowerCase() ?? "";
      const description = repo.description?.toLowerCase() ?? "";
      const language = repo.language?.toLowerCase() ?? "";

      return (
        name.includes(q) ||
        description.includes(q) ||
        language.includes(q)
      );
    });
  }, [query, repos]);

  return (
    <div className="space-y-10">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <Input
            type="text"
            placeholder="Search projects by name, description, or tech..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 text-lg px-5 rounded-md bg-white dark:bg-neutral-900 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((repo) => (
          <article
            key={repo.id}
            className="rounded border border-[var(--color-dark-blue)]/10 dark:border-[#CDCFC9]/30 
                       bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm 
                       p-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">
                <Link
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {repo.name}
                </Link>
              </h2>

              {repo.description && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {repo.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                {repo.language && (
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-gray-500" />
                    {repo.language}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-yellow-500">
                  <Star size={14} className="fill-yellow-500 text-yellow-500" />
                  {repo.stargazers_count}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 text-sm">
              <Link
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:no-underline"
              >
                View on GitHub
              </Link>

              {repo.homepage && (
                <Link
                  href={repo.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:no-underline"
                >
                  Live site
                </Link>
              )}
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-gray-600 dark:text-gray-400">
            No projects found for “{query}”.
          </p>
        )}
      </div>
    </div>
  );
}
