import { getFeaturedRepos } from "@/lib/github";
import { ProjectsList } from "./projects-list";

export const revalidate = 3600;

export default async function ProjectsPage() {
  const repos = await getFeaturedRepos();

  return (
    <section className="container mx-auto px-6 py-16 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Projects
        </h1>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          A curated selection of my GitHub projects.
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {repos.length} project{repos.length === 1 ? "" : "s"}
        </p>
      </header>
      <ProjectsList repos={repos} />
    </section>
  );
}
