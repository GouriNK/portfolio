import ResumeChatbot from "@/components/resume-chatbot";
import Link from "next/link";

export default function Home() {
   return (
    <section className="container mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    <div className="order-1 md:order-2 flex justify-center md:justify-end">
      <ResumeChatbot />
    </div>
    <div className="order-2 md:order-1 space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
        Hi, I'm <span className="text-[var(--color-your-name)]">Your Name</span>
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        A frontend engineer who builds modern, elegant, and performant web
        experiences using Next.js, React, and TypeScript.
      </p>
      <div className="flex justify-between gap-4 sm:justify-start">
        <Link
          href="/projects"
          className="
            px-6 py-3 rounded transition
            bg-[var(--color-dark-blue)]
            text-[var(--color-light-body)]
            hover:text-[var(--color-light-blue)]
            dark:bg-[var(--color-light-body)]
            dark:text-[var(--color-dark-blue)]
            dark:hover:text-[var(--color-dark-blue)]
          "
        >
          View Projects
        </Link>

        <Link
          href="/contact"
          className="px-6 py-3 rounded border border-[var(--color-dark-blue)]
                     dark:border-[var(--color-light-body)]
                     hover:bg-[var(--color-dark-blue)]
                     hover:text-[var(--color-light-blue)]
                     dark:hover:bg-[var(--color-light-body)]
                     dark:hover:text-[var(--color-dark-blue)]
                     transition"
        >
          Contact Me
        </Link>
      </div>
    </div>

  </div>
</section>
  );
}
