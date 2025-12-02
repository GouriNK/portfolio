"use client";

import Image from "next/image";
import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STARTER_PROMPTS = [
  "What experience does AG have with BESS?",
  "Summarize AG’s frontend skills.",
  "What cloud technologies has AG used?",
];

export default function ResumeChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      const data = await res.json();

      if (data.answer) {
        const botMessage: Message = {
          role: "assistant",
          content: data.answer,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, something went wrong.",
          },
        ]);
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error contacting the server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSend() {
    if (!input.trim()) return;
    await sendMessage(input);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  function handleStarterClick(prompt: string) {
    void sendMessage(prompt);
  }

  return (
    <>
      {/* Profile image with blinking "Live Chat!" dot */}
      <div className="flex justify-center md:justify-end mb-6">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open live chat"
          className="relative inline-block focus:outline-none"
        >
          <Image
            src="/assets/your-image.jpg"
            alt="Profile illustration"
            width={400}
            height={400}
            className="rounded shadow-lg object-cover"
          />

          {/* Blinking green dot + label in top-right corner */}
          <div className="absolute top-3 right-3 flex items-center gap-2 bg-white text-green-600 
              px-3 py-1 rounded-full shadow-md border border-green-500 cursor-pointer">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wide">
              Live Chat!
            </span>
          </div>
        </button>
      </div>

      {/* Floating chat button (keep or remove as you like) */}
      {/* <div className="fixed bottom-4 right-4 z-50">
        <Button
          size="icon"
          className="rounded-full shadow-lg h-12 w-12"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Open AG Chatbot"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>*/}

      {/* Chat window */}
      {isOpen && (
       <div
              className="
                fixed z-50
                bottom-4 inset-x-4           /* mobile: centered, margin on both sides */
                h-[70vh]
                md:bottom-20 md:right-4      /* from md up: move to bottom-right */
                md:left-auto                 /* ignore inset-x on md+ */
                md:w-[26rem] lg:w-[30rem]    /* fixed width on larger screens */
              "
            >
          <Card className="shadow-xl border rounded-xl flex flex-col h-full overflow-hidden">
            <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold text-[var(--color-dark-blue)] dark:text-[var(--color-light-body)]">
                Ask about AG&apos;s experience
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="px-3 py-2 flex-1 flex flex-col gap-2 min-h-0">
              {/* Starter prompts */}
              {messages.length === 0 && (
                <div className="mb-2 space-y-2">
                  <p className="text-[11px] text-muted-foreground">
                    Try one of these starter questions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {STARTER_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleStarterClick(prompt)}
                        className="text-[11px] px-2 py-1 rounded-full border bg-muted hover:bg-muted/80 transition"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              <ScrollArea className="flex-1 h-full pr-1">
                <div className="flex flex-col gap-2 pb-2">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        m.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                          m.role === "user"
                            ? "bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] rounded-br-sm"
                            : "bg-gray-100 text-gray-900 rounded-bl-sm"
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="text-[11px] text-muted-foreground">
                        Thinking…
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>

            <CardFooter className="border-t px-3 py-2">
              <div className="flex w-full gap-2 items-center">
                <Input
                  className="h-8 text-xs"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about skills, projects, or experience..."
                />
                <Button
                  size="sm"
                  className="h-8 text-xs px-3"
                  onClick={handleSend}
                  disabled={loading}
                >
                  Send
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
