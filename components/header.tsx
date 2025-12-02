'use client';
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Rubik_Doodle_Shadow } from "next/font/google";

const rubikDoodle = Rubik_Doodle_Shadow({
  subsets: ["latin"],
  weight: "400",
});

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "_gnCodes", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Interests", href: "/interests" },
];
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const homeLink = navItems[0];
  const centerLinks = navItems.slice(1);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[var(--color-dark-blue)] dark:border-[var(--color-light-body)] bg-[var(--color-dark-blue)] dark:bg-black">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex-1">
          <Link
            href={homeLink.href}
            className={`${rubikDoodle.className} text-[35px] text-[var(--color-light-body)] dark:text-[var(--color-light-body)] hover:text-[var(--color-light-blue)]`}
          >
            {homeLink.label}
          </Link>
        </div>
        <nav className="hidden md:flex flex-1 justify-center space-x-8 text-lg font-medium">
          {centerLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[var(--color-light-body)] dark:text-[var(--color-light-body)] hover:text-[var(--color-light-blue)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1 flex justify-end items-center space-x-3">
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md
              border border-gray-300 dark:border-gray-600
              bg-[var(--color-light-blue)] text-[var(--color-dark-blue)]
              dark:bg-transparent dark:text-gray-300
              hover:opacity-90 transition"
            aria-label="Toggle menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <nav className="container mx-auto px-6 py-3 space-y-2">
            {centerLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-base text-[var(--color-light-body)] dark:text-[var(--color-light-body)] hover:text-[var(--color-light-blue)]"
                
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}