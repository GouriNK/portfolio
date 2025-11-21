import Link from "next/link";
import { blogPosts } from "./data";

export default function BlogPage() {
  return (
    <section className="container mx-auto px-6 py-16 space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Blog</h1>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Thoughts, notes, and write-ups on development and design.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block border border-black/10 dark:border-white/20 
                       rounded-xl p-5 bg-white/80 dark:bg-neutral-900/80 
                       backdrop-blur-sm hover:shadow-md transition"
          >
            <article className="flex flex-col gap-3">
              <header className="space-y-1">
                <h2 className="text-lg font-semibold leading-snug group-hover:underline">
                  {post.title}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                  <span className="h-1 w-1 rounded-full bg-gray-400" />
                  <span className="uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>
              </header>

              <p className="text-sm text-gray-800 dark:text-gray-200">
                {post.summary}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
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
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
