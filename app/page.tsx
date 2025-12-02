import ResumeChatbot from "@/components/resume-chatbot";
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
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
          </p>

          <div className="flex gap-4">
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
              className="px-6 py-3 rounded border border-[var(--color-dark-blue)] dark:border-[var(--color-light-body)] 
                         hover:bg-[var(--color-dark-blue)] hover:text-[var(--color-light-blue)] dark:hover:bg-[var(--color-light-body)] dark:hover:text-[var(--color-dark-blue)] transition"
            >
              Contact Me
            </Link>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <ResumeChatbot />
        </div>

      </div>
    </section>
  );
}
