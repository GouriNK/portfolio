"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setStatus(null);
  setLoading(true);

  const formEl = e.currentTarget;
  const formData = new FormData(formEl);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setStatus("Message sent!");
      formEl.reset(); 
    } else {
      const data = await res.json().catch(() => null);
      setStatus(data?.error ?? "Failed to send message.");
    }
  } catch (err) {
    console.error(err);
    setStatus("Network error. Try again.");
  } finally {
    setLoading(false);
  }
}


  return (
    <section className="container mx-auto max-w-xl py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Contact Me
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-10">
        Feel free to reach out for collaborations, opportunities, or just to say
        hello!
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            required
            type="text"
            placeholder="Your Name"
            className="bg-white dark:bg-neutral-900"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            required
            type="email"
            placeholder="your@email.com"
            className="bg-white dark:bg-neutral-900"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            required
            placeholder="Your message..."
            rows={5}
            className="bg-white dark:bg-neutral-900"
          />
        </div>

        <Button
          type="submit"
          className="
            w-full
            px-6 py-6 rounded transition
            bg-[var(--color-dark-blue)]
            text-[var(--color-light-body)]
            hover:text-[var(--color-light-blue)]
            dark:bg-[var(--color-light-body)]
            dark:text-[var(--color-dark-blue)]
            dark:hover:text-[var(--color-dark-blue)]
          "
        >
          Send Message
        </Button>
        {status && (
          <p className="text-sm text-gray-600 dark:text-gray-300">{status}</p>
        )}
      </form>
    </section>
  );
}
