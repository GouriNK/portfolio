import { JSX } from "react";

type SocialLink = {
  name: string;
  href: string;
  icon: JSX.Element;
};

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/your-username",
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.42 7.86 10.96.58.1.79-.25.79-.56 
          0-.28-.01-1.03-.02-2.03-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 
          1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 
          0-1.26.45-2.3 1.2-3.11-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.19A11.2 11.2 0 0 1 12 6.8c.99.01 
          1.99.13 2.92.38 2.22-1.5 3.2-1.19 3.2-1.19.63 1.58.23 2.75.11 3.04.75.81 1.2 1.85 1.2 3.11 
          0 4.43-2.7 5.41-5.28 5.69.42.36.79 1.08.79 2.18 0 1.57-.01 2.84-.01 3.23 
          0 .31.21.67.8.55A10.999 10.999 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/your-profile",
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 
          2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.84-2.2 3.8-2.2 4.06 0 4.81 2.67 
          4.81 6.14V24h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.16V24h-4V8z"
        />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:someone@example.com",
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M12 13.5 1.5 6.75V18c0 .83.67 1.5 1.5 1.5h18c.83 0 1.5-.67 
          1.5-1.5V6.75L12 13.5zM12 10.5l10.5-6H1.5l10.5 6z"
        />
      </svg>
    ),
  },
];

export default function Footer() {
   const year = new Date().getFullYear();
return (
    <footer className="w-full border-t border-black dark:border-[var(--color-light-body)] py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {year} ABC. All rights reserved.
        </p>
        <div className="flex space-x-5 text-gray-700 dark:text-gray-300">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              aria-label={social.name}
              className="hover:text-blue-600"
              target="_blank"
              rel="noreferrer"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}