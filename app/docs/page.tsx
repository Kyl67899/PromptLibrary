import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Code,
  Copy,
  ExternalLink,
  Zap,
  Terminal,
  Sparkles,
  MessageSquare,
  Search,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SaaSFooter } from "@/components/saas-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Documentation - Prompt Library",
  description: "Learn how to use prompts in v0, Claude, GitHub Copilot, Cursor, and other vibe coding IDEs.",
};

const ideGuides = [
  {
    name: "v0 by Vercel",
    icon: Sparkles,
    color: "bg-foreground text-background",
    description: "AI-powered UI generation with React and Tailwind CSS",
    steps: [
      "Click the 'Share' button on any prompt card",
      "Select 'Open in v0' from the dropdown menu",
      "v0 will open with your prompt pre-filled",
      "Click 'Generate' to create your component",
      "Iterate and refine using natural language",
    ],
    tips: [
      "Be specific about styling preferences",
      "Mention if you want dark mode support",
      "Ask for responsive designs explicitly",
      "Request accessibility features like ARIA labels",
    ],
    link: "https://v0.dev",
  },
  {
    name: "Claude",
    icon: MessageSquare,
    color: "bg-amber-500/10 text-amber-500",
    description: "Anthropic's AI assistant for coding and conversation",
    steps: [
      "Click 'Share' on your chosen prompt card",
      "Select 'Open in Claude' from the menu",
      "Claude will receive your prompt automatically",
      "Add context about your project stack",
      "Ask follow-up questions to refine the code",
    ],
    tips: [
      "Share your existing code for better context",
      "Ask Claude to explain the generated code",
      "Request tests alongside components",
      "Use Claude for complex logic and algorithms",
    ],
    link: "https://claude.ai",
  },
  {
    name: "GitHub Copilot",
    icon: Code,
    color: "bg-emerald-500/10 text-emerald-500",
    description: "AI pair programmer integrated into your IDE",
    steps: [
      "Click 'Share' and select 'Copy for Copilot'",
      "Open your IDE (VS Code, JetBrains, etc.)",
      "Create a new file or navigate to your component",
      "Paste the prompt as a comment at the top",
      "Copilot will suggest completions based on the prompt",
    ],
    tips: [
      "Use JSDoc-style comments for better suggestions",
      "Keep the prompt comment above your code",
      "Tab through suggestions to pick the best one",
      "Use Ctrl+Enter to see multiple suggestions",
    ],
    link: "https://github.com/features/copilot",
  },
  {
    name: "Cursor",
    icon: Terminal,
    color: "bg-blue-500/10 text-blue-500",
    description: "The AI-first code editor built for pair programming",
    steps: [
      "Copy the prompt using the 'Copy Prompt' button",
      "Open Cursor and press Cmd+K (or Ctrl+K)",
      "Paste your prompt in the AI command palette",
      "Press Enter to generate the code",
      "Use Cmd+L for chat to iterate further",
    ],
    tips: [
      "Use @codebase to reference your project",
      "Add @file to include specific files as context",
      "Use Cursor's diff view to review changes",
      "Enable 'Always Show Suggestions' in settings",
    ],
    link: "https://cursor.sh",
  },
  {
    name: "Windsurf",
    icon: Zap,
    color: "bg-purple-500/10 text-purple-500",
    description: "AI-powered development environment by Codeium",
    steps: [
      "Copy the prompt from Prompt Library",
      "Open Windsurf and start a new Cascade flow",
      "Paste your prompt in the Cascade chat",
      "Windsurf will create and edit files automatically",
      "Review changes in the integrated diff viewer",
    ],
    tips: [
      "Use Flows for multi-step development tasks",
      "Let Cascade handle file creation and navigation",
      "Ask for explanations of complex code",
      "Use @mentions to reference specific files",
    ],
    link: "https://codeium.com/windsurf",
  },
  {
    name: "Bolt.new",
    icon: Lightbulb,
    color: "bg-orange-500/10 text-orange-500",
    description: "Full-stack AI development environment in the browser",
    steps: [
      "Copy the prompt or use 'Copy as Markdown'",
      "Go to bolt.new and start a new project",
      "Paste your prompt in the chat interface",
      "Bolt will scaffold the entire component/page",
      "Use the live preview to see results instantly",
    ],
    tips: [
      "Ask for complete pages with routing",
      "Request API integration when needed",
      "Bolt handles dependencies automatically",
      "Use the terminal for custom commands",
    ],
    link: "https://bolt.new",
  },
];

const bestPractices = [
  {
    title: "Be Specific",
    description: "Include details about styling, responsiveness, and interactions you want.",
    icon: Search,
  },
  {
    title: "Add Context",
    description: "Mention your tech stack, existing patterns, and design system preferences.",
    icon: BookOpen,
  },
  {
    title: "Iterate",
    description: "Start with the base prompt, then refine with follow-up requests.",
    icon: Zap,
  },
  {
    title: "Customize",
    description: "Modify prompts to match your brand colors, fonts, and component library.",
    icon: Code,
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4">
            Documentation
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            How to Use Prompts
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Learn how to effectively use our UI prompts across different AI coding tools.
            From v0 to Cursor, we&apos;ve got you covered.
          </p>
        </div>

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Quick Start</h2>
          <Card className="bg-card/50">
            <CardContent className="p-6">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-lg font-bold">1</span>
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Browse Prompts</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore our library of 20+ UI prompts across 12 categories.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Copy or Share</h3>
                  <p className="text-sm text-muted-foreground">
                    Click the copy button or share directly to your favorite IDE.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Generate & Customize</h3>
                  <p className="text-sm text-muted-foreground">
                    Let AI create your component, then iterate to perfection.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Best Practices</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bestPractices.map((practice) => (
              <Card key={practice.title} className="bg-card/50">
                <CardHeader className="pb-2">
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-secondary">
                    <practice.icon className="size-5 text-foreground" />
                  </div>
                  <CardTitle className="text-base">{practice.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{practice.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* IDE Guides */}
        <section className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-foreground">IDE Guides</h2>
          <p className="mb-8 text-muted-foreground">
            Step-by-step instructions for using prompts in popular AI coding tools.
          </p>
          
          <div className="grid gap-8">
            {ideGuides.map((ide) => (
              <Card key={ide.name} className="bg-card/50 overflow-hidden">
                <CardHeader className="border-b border-border bg-secondary/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex size-10 items-center justify-center rounded-lg ${ide.color}`}>
                        <ide.icon className="size-5" />
                      </div>
                      <div>
                        <CardTitle>{ide.name}</CardTitle>
                        <CardDescription>{ide.description}</CardDescription>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={ide.link} target="_blank" rel="noopener noreferrer">
                        Visit
                        <ExternalLink className="ml-2 size-3" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-8 lg:grid-cols-2">
                    {/* Steps */}
                    <div>
                      <h4 className="mb-4 font-semibold text-foreground">Steps</h4>
                      <ol className="space-y-3">
                        {ide.steps.map((step, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                              {index + 1}
                            </span>
                            <span className="text-sm text-muted-foreground">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    {/* Tips */}
                    <div>
                      <h4 className="mb-4 font-semibold text-foreground">Pro Tips</h4>
                      <ul className="space-y-2">
                        {ide.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ArrowRight className="mt-0.5 size-4 shrink-0 text-accent" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-secondary to-secondary/50 border-0">
            <CardContent className="py-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Ready to Start?</h2>
              <p className="mb-6 text-muted-foreground">
                Browse our collection of prompts and start building beautiful UIs today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/">
                    <Copy className="mr-2 size-4" />
                    Browse Prompts
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/community">
                    Join Community
                  </Link>
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
