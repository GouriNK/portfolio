import Image from "next/image";
import Link from "next/link";

export default function Home() {
   return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            Hi, I'm <span className="text-[var(--color-your-name)]">Your Name</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            A frontend engineer who builds modern, elegant, and performant web
            experiences using Next.js, React, and TypeScript.
          </p>

          <div className="flex gap-4">
            <Link
              href="/projects"
              className="px-6 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black 
                         hover:opacity-80 transition"
            >
              View Projects
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg border border-black dark:border-white 
                         hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
            >
              Contact Me
            </Link>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/assets/your-image.jpg"
            alt="Profile illustration"
            width={400}
            height={400}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>

      </div>
    </section>
  );
}
