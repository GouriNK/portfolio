import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Epilogue } from 'next/font/google';
import ResumeChatbot from "@/components/resume-chatbot";

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "_gnCodes",
  description: "_gnCodes Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${epilogue.className} min-h-screen flex flex-col bg-[var(--color-light-body)] dark:bg-black`}>
        <Providers>
          <Header/>
          <main className="container mx-auto px-6 py-8 flex-1 pt-35">
            {children}
            <ResumeChatbot />
          </main>
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
