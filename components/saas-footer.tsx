"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ChevronRight, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const changelog = [
  {
    version: "1.3.0",
    date: "May 31, 2026",
    type: "feature" as const,
    title: "IDE Integration",
    description:
      "Share prompts directly to v0, Claude, GitHub Copilot, and Perplexity. Copy prompts as formatted markdown.",
  },
  {
    version: "1.2.0",
    date: "May 28, 2026",
    type: "feature" as const,
    title: "Admin Dashboard",
    description:
      "Full CRUD management for prompts. Create, edit, and delete prompts in real-time from the admin panel.",
  },
  {
    version: "1.1.0",
    date: "May 25, 2026",
    type: "improvement" as const,
    title: "Enhanced Security",
    description:
      "Added rate limiting, input sanitization, XSS protection, and security headers for all API endpoints.",
  },
  {
    version: "1.0.0",
    date: "May 20, 2026",
    type: "release" as const,
    title: "Initial Launch",
    description:
      "Launch of Prompt Library with 20+ UI prompts across 12 categories. Includes search, filtering, and responsive design.",
  },
];

const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "#changelog" },
    { label: "Documentation", href: "/docs" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "/help" },
  ],
  resources: [
    { label: "Community", href: "/community" },
    { label: "Help Center", href: "/help" },
    { label: "Partners", href: "#" },
    { label: "Status", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
  ],
};

const socialLinks = [
  { icon: Tiktok, href: "#", label: "Tiktok" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "#", label: "Email" },
];

function ChangelogDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Sparkles className="size-4" />
          <span>Changelog</span>
          <Badge variant="secondary" className="ml-1">
            v1.3.0
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="size-5" />
            Changelog
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          {changelog.map((item, index) => (
            <div key={item.version}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex size-8 items-center justify-center rounded-full text-xs font-bold ${
                      item.type === "release"
                        ? "bg-primary text-primary-foreground"
                        : item.type === "feature"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {item.version.split(".")[0]}
                  </div>
                  {index < changelog.length - 1 && (
                    <div className="mt-2 h-full w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {item.title}
                    </span>
                    <Badge
                      variant={
                        item.type === "release"
                          ? "default"
                          : item.type === "feature"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {item.type}
                    </Badge>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {item.date} · v{item.version}
                  </p>
                  <p className="text-sm text-foreground/80">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function SaaSFooter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to subscribe");
        return;
      }

      toast.success("Successfully subscribed!", {
        description: "Check your email for confirmation.",
      });
      setEmail("");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="border-t border-border bg-card/50">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="size-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">
                Prompt Library
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              A curated collection of UI prompts for vibe coding. Build beautiful
              interfaces faster with AI-powered tools.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-foreground">
                Subscribe to updates
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                />
                <Button type="submit" size="sm" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <ChevronRight className="size-4" />
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Product
              </h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Company
              </h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Resources
              </h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Prompt Library. All rights reserved.
            </p>
            <ChangelogDialog />
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
                asChild
                className="size-8"
              >
                <Link href={social.href} aria-label={social.label}>
                  <social.icon className="size-4" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
