"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type BlogPost = ReturnType<typeof import("@/lib/posts").getAllPosts>[number];

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const unique = new Set<string>();
    posts.forEach((p) => {
      if (p.category) unique.add(p.category);
    });
    return ["All", ...Array.from(unique)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return posts;
    return posts.filter((p) => p.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <section className="container mx-auto px-6 py-16 space-y-12">
      <header className="space-y-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Blog</h1>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = cat === selectedCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition
                  ${isActive
                    ? "border-[var(--color-dark-blue)] bg-[var(--color-dark-blue)] text-white dark:border-white dark:bg-white dark:text-[var(--color-dark-blue)]"
                    : "border-gray-300 text-gray-700 hover:border-[var(--color-dark-blue)]/70 hover:text-[var(--color-dark-blue)] dark:border-gray-600 dark:text-gray-200 dark:hover:border-white/80 dark:hover:text-white"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </header>

      <div className="space-y-14">
        {filteredPosts.map((post, index) => (
          <div key={post.id}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col sm:flex-row gap-6"
            >
              {/* Left image area */}
              <div className="w-full sm:w-48 h-32 sm:h-32 shrink-0 flex items-center justify-center 
                              bg-neutral-200 dark:bg-neutral-800 rounded-xl overflow-hidden">
                {/* Replace this with post.image later */}
                <span className="text-4xl font-bold text-neutral-600 dark:text-neutral-300">
                  {post.title.charAt(0)}
                </span>
              </div>

              {/* Right content area */}
              <div className="flex flex-col flex-1 gap-4">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                  <span className="rounded-full bg-gray-100 dark:bg-neutral-800 
                                   px-3 py-1 text-[11px] font-medium text-gray-800 dark:text-gray-100">
                    {post.category}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-gray-400" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold leading-snug group-hover:underline">
                  {post.title}
                </h2>

                {/* Summary */}
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  {post.summary}
                </p>

                {/* Tags + Read More */}
                <div className="flex items-center justify-between mt-1">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-1 rounded-full 
                                   border border-gray-300 dark:border-gray-600 
                                   text-gray-700 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:underline">
                    Read more →
                  </span>
                </div>
              </div>
            </Link>

            {/* Divider between posts */}
            {index < filteredPosts.length - 1 && (
              <div className="mt-10 border-t-4 border-dashed border-gray-300 dark:border-gray-700" />
            )}
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No posts in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
