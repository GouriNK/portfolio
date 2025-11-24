const GITHUB_API = "https://api.github.com";

export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
};

export async function getFeaturedRepos(): Promise<Repo[]> {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;
  const FEATURED_REPOS =
    process.env.FEATURED_REPOS?.split(",")
      .map((s) => s.trim().toLowerCase()) ?? [];
  
  const LIVE_URL_OVERRIDES: Record<string, string> = {};
  if (process.env.LIVE_URL_OVERRIDES) {
    process.env.LIVE_URL_OVERRIDES.split(";").forEach((pair) => {
      const [name, url] = pair.split(":");
      if (name && url) LIVE_URL_OVERRIDES[name.trim().toLowerCase()] = url.trim();
    });
  }

  if (!username) {
    throw new Error("GITHUB_USERNAME is not set in .env.local");
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(
    `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`,
    {
      headers,
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    console.error("GitHub API error:", await res.text());
    throw new Error("Failed to fetch GitHub repos");
  }

  const data = (await res.json()) as Repo[];

  return data
    .filter((repo) =>
      FEATURED_REPOS.includes(repo.name.toLowerCase())
    )
    .map((repo) => ({
      ...repo,
      homepage:
        LIVE_URL_OVERRIDES[repo.name.toLowerCase()] ||
        (repo.homepage && repo.homepage.trim() !== ""
          ? repo.homepage
          : null),
    }));
}