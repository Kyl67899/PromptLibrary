"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  HelpCircle,
  Book,
  MessageSquare,
  Mail,
  ChevronRight,
  ExternalLink,
  FileText,
  Settings,
  CreditCard,
  Users,
  Shield,
  Zap,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SaaSFooter } from "@/components/saas-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const helpCategories = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Learn the basics of using Prompt Library",
    articles: 8,
    href: "/docs",
  },
  {
    icon: Zap,
    title: "IDE Integrations",
    description: "Connect with v0, Claude, Copilot, and more",
    articles: 6,
    href: "/docs#ide-guides",
  },
  {
    icon: CreditCard,
    title: "Billing & Plans",
    description: "Manage your subscription and payments",
    articles: 5,
    href: "/pricing",
  },
  {
    icon: Settings,
    title: "Account Settings",
    description: "Update your profile and preferences",
    articles: 4,
    href: "#",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Add members and manage permissions",
    articles: 3,
    href: "#",
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Learn about our security practices",
    articles: 4,
    href: "/security",
  },
];

const popularArticles = [
  { title: "How to copy prompts to your clipboard", category: "Getting Started" },
  { title: "Using prompts with v0 by Vercel", category: "IDE Integrations" },
  { title: "How to upgrade to Pro plan", category: "Billing & Plans" },
  { title: "Sharing prompts to Claude AI", category: "IDE Integrations" },
  { title: "Understanding prompt categories", category: "Getting Started" },
];

const faqs = [
  {
    question: "How do I copy a prompt?",
    answer: "Click the 'Copy Prompt' button on any prompt card. The prompt will be copied to your clipboard instantly. You can also use the share menu to send it directly to your favorite AI coding tool.",
  },
  {
    question: "Which AI coding tools are supported?",
    answer: "We support v0 by Vercel, Claude, GitHub Copilot, Cursor, Windsurf, Bolt.new, and Perplexity. You can share prompts directly to these tools or copy them to use anywhere.",
  },
  {
    question: "Are the prompts free to use?",
    answer: "Yes! Our Free plan includes access to 20+ prompts across all 12 categories. Pro and Team plans offer additional prompts and features.",
  },
  {
    question: "Can I create my own prompts?",
    answer: "Pro and Team plan users can create and save custom prompts. You can also share your prompts with the community.",
  },
  {
    question: "How often are new prompts added?",
    answer: "We add new prompts regularly based on community feedback and industry trends. Subscribe to our newsletter to get notified of updates.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 14-day money-back guarantee on all paid plans. Contact support if you're not satisfied.",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Help Center
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            How Can We Help?
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Find answers, learn best practices, and get support for Prompt Library.
          </p>
          
          {/* Search */}
          <div className="mx-auto max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-12 text-base"
              />
            </div>
          </div>
        </div>

        {/* Help Categories */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-bold text-foreground">Browse by Category</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {helpCategories.map((category) => (
              <Link key={category.title} href={category.href}>
                <Card className="h-full bg-card/50 transition-colors hover:bg-card">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <category.icon className="size-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 font-semibold text-foreground">{category.title}</h3>
                      <p className="mb-2 text-sm text-muted-foreground">{category.description}</p>
                      <span className="text-xs text-accent">{category.articles} articles</span>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Articles */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-bold text-foreground">Popular Articles</h2>
          <Card className="bg-card/50">
            <CardContent className="p-0">
              {popularArticles.map((article, index) => (
                <Link
                  key={article.title}
                  href="#"
                  className={`flex items-center justify-between p-4 transition-colors hover:bg-secondary/50 ${
                    index !== popularArticles.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="size-4 text-muted-foreground" />
                    <span className="text-foreground">{article.title}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                </Link>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-bold text-foreground">Frequently Asked Questions</h2>
          <Card className="bg-card/50">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Contact Support */}
        <section>
          <Card className="border-0 bg-secondary/50">
            <CardContent className="py-12 text-center">
              <HelpCircle className="mx-auto mb-4 size-12 text-muted-foreground" />
              <h2 className="mb-2 text-2xl font-bold text-foreground">Still Need Help?</h2>
              <p className="mb-6 text-muted-foreground">
                Our support team is here to assist you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg">
                  <Mail className="mr-2 size-4" />
                  Contact Support
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/community">
                    <MessageSquare className="mr-2 size-4" />
                    Ask Community
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
