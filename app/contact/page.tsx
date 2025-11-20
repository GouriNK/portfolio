import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default async function ContactPage() {
     return (
    <section className="container mx-auto max-w-xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Contact Me
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-10">
        Feel free to reach out for collaborations, opportunities, or just to say
        hello 👋
      </p>
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your Name"
            className="bg-white dark:bg-neutral-900"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="bg-white dark:bg-neutral-900"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Your message..."
            rows={5}
            className="bg-white dark:bg-neutral-900"
          />
        </div>

        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    </section>
  );
}