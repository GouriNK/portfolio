// app/blog/page.tsx
import { getAllPosts } from "@/lib/posts";
import { BlogList } from "./blog-list";

export default function BlogPage() {
  const blogPosts = getAllPosts(); // runs on the server

  return <BlogList posts={blogPosts} />;
}
