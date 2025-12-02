import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params
  const post = getPostBySlug(slug);

  if (!post) return notFound();

  return (
   <section className="container mx-auto px-6 py-16 space-y-6 max-w-3xl">
  <h1 className="text-4xl font-bold">{post.title}</h1>
  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
    <div className="flex items-center gap-2">
      <time>{new Date(post.date).toLocaleDateString()}</time>
      <span>•</span>
      <span>{post.category}</span>
    </div>
    <div className="flex flex-wrap gap-2 w-full sm:w-auto sm:ml-2">
      {post.tags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-1 rounded-full text-xs border border-gray-300 dark:border-gray-600"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
  <article className="pt-6 prose prose-base dark:prose-invert">
    <ReactMarkdown>{post.content}</ReactMarkdown>
  </article>
</section>
  );
}
