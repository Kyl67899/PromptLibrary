import { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Shield,
  Users,
  Globe,
  Code,
  Palette,
  Download,
  Cloud,
  Search,
  Copy,
  Share2,
  Layers,
  Lock,
  Gauge,
  Heart,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SaaSFooter } from "@/components/saas-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Features - Prompt Library",
  description: "Discover all the features that make Prompt Library the best tool for vibe coding.",
};

const mainFeatures = [
  {
    icon: Layers,
    title: "12 Categories",
    description: "Organized prompts for forms, auth, navbars, testimonials, pricing, hero sections, and more.",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Copy,
    title: "One-Click Copy",
    description: "Copy any prompt to your clipboard instantly. Works across all browsers and devices.",
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    icon: Share2,
    title: "IDE Integrations",
    description: "Share directly to v0, Claude, GitHub Copilot, Cursor, Windsurf, and more.",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Find the perfect prompt with powerful search across titles, descriptions, and content.",
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    icon: Palette,
    title: "Visual Previews",
    description: "See what each prompt generates before you use it. No guessing required.",
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    icon: Globe,
    title: "Responsive Design",
    description: "All prompts are optimized for generating responsive, mobile-first components.",
    color: "bg-cyan-500/10 text-cyan-500",
  },
];

const additionalFeatures = [
  {
    icon: Lock,
    title: "Secure by Default",
    description: "Enterprise-grade security with rate limiting, input sanitization, and XSS protection.",
  },
  {
    icon: Gauge,
    title: "Lightning Fast",
    description: "Optimized performance with lazy loading images and efficient pagination.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description: "Join our community of vibe coders sharing tips, tricks, and custom prompts.",
  },
  {
    icon: Cloud,
    title: "Always Updated",
    description: "New prompts added regularly. Subscribe to get notified of updates.",
  },
  {
    icon: Code,
    title: "Clean Output",
    description: "Prompts designed to generate clean, maintainable, and accessible code.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share prompts with your team. Build a shared library of your favorites.",
  },
];

const integrations = [
  { name: "v0 by Vercel", logo: Sparkles },
  { name: "Claude", logo: Sparkles },
  { name: "GitHub Copilot", logo: Code },
  { name: "Cursor", logo: Zap },
  { name: "Windsurf", logo: Globe },
  { name: "Bolt.new", logo: Cloud },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4">
            Features
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Everything You Need for Vibe Coding
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Powerful features designed to help you build beautiful UIs faster than ever.
          </p>
        </div>

        {/* Main Features Grid */}
        <section className="mb-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mainFeatures.map((feature) => (
              <Card key={feature.title} className="bg-card/50 transition-colors hover:bg-card">
                <CardHeader>
                  <div className={`mb-2 flex size-12 items-center justify-center rounded-lg ${feature.color}`}>
                    <feature.icon className="size-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* IDE Integrations */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Works With Your Favorite Tools</h2>
            <p className="text-muted-foreground">
              Seamlessly integrate with the AI coding tools you already use.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {integrations.map((integration) => (
              <Card key={integration.name} className="flex items-center gap-3 bg-card/50 px-6 py-4">
                <integration.logo className="size-5 text-muted-foreground" />
                <span className="font-medium text-foreground">{integration.name}</span>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Features */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground">And Much More</h2>
            <p className="text-muted-foreground">
              Discover all the ways Prompt Library helps you build better.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {additionalFeatures.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4 rounded-lg border border-border bg-card/30 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <feature.icon className="size-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="border-0 bg-gradient-to-r from-secondary to-secondary/50">
            <CardContent className="py-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                Ready to Start Building?
              </h2>
              <p className="mb-6 text-muted-foreground">
                Join thousands of developers who use Prompt Library every day.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/">
                    Browse Prompts
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/docs">View Documentation</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <SaaSFooter />
    </div>
  );
}
