// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content", "posts");

// Metadata used for listing on /blog
export type BlogPostMeta = {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  tags: string[];
};

// Full post (for detail page)
export type BlogPostFull = BlogPostMeta & {
  content: string;
};

// internal helper
function getPostFiles(): string[] {
  return fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
}

// 👉 used in app/blog/page.tsx
export function getAllPosts(): BlogPostMeta[] {
  const files = getPostFiles();
  const posts: BlogPostMeta[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(postsDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);

    posts.push({
      id: slug,
      slug,
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString(),
      category: data.category ?? "General",
      summary: data.summary ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
    });
  }

  // sort newest first
  posts.sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return db - da;
  });

  return posts;
}

// 👉 used in app/blog/[slug]/page.tsx
export function getPostBySlug(slug: string): BlogPostFull | null {
  const fullPath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    id: slug,
    slug,
    title: data.title ?? slug,
    date: data.date ?? new Date().toISOString(),
    category: data.category ?? "General",
    summary: data.summary ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    content,
  };
}

// 👉 used in generateStaticParams
export function getAllSlugs(): string[] {
  return getPostFiles().map((f) => f.replace(/\.md$/, ""));
}
