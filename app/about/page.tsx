import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Heart, Target, Users, Zap, Globe, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SaaSFooter } from "@/components/saas-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: "About Us - Prompt Library",
  description: "Learn about the team behind Prompt Library and our mission to make vibe coding accessible to everyone.",
};

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We build for the community. Every feature we ship is designed to help vibe coders succeed.",
  },
  {
    icon: Target,
    title: "Quality Over Quantity",
    description: "Each prompt is carefully crafted and tested to ensure it generates beautiful, functional code.",
  },
  {
    icon: Zap,
    title: "Speed Matters",
    description: "Time is precious. We help you build faster without sacrificing quality or accessibility.",
  },
  {
    icon: Globe,
    title: "Open & Accessible",
    description: "Great tools should be available to everyone. Our free tier gives you everything you need to start.",
  },
];

const team = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Former engineer at Vercel. Passionate about developer tools and AI.",
    avatar: "/avatars/alex.jpg",
    initials: "AC",
  },
  {
    name: "Sarah Kim",
    role: "Head of Design",
    bio: "Design systems expert. Previously at Figma and Stripe.",
    avatar: "/avatars/sarah.jpg",
    initials: "SK",
  },
  {
    name: "Marcus Johnson",
    role: "Lead Engineer",
    bio: "Full-stack developer. Open source contributor and Next.js enthusiast.",
    avatar: "/avatars/marcus.jpg",
    initials: "MJ",
  },
  {
    name: "Emily Torres",
    role: "Community Manager",
    bio: "Building bridges between developers. Former DevRel at GitHub.",
    avatar: "/avatars/emily.jpg",
    initials: "ET",
  },
];

const stats = [
  { label: "Prompts", value: "20+" },
  { label: "Categories", value: "12" },
  { label: "Active Users", value: "5K+" },
  { label: "Components Generated", value: "100K+" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4">
            About Us
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Making Vibe Coding Accessible
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We&apos;re on a mission to help every developer build beautiful interfaces 
            using AI-powered tools. No design degree required.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-card/50 text-center">
              <CardContent className="py-6">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story */}
        <section className="mb-16">
          <Card className="bg-card/50">
            <CardContent className="p-8 md:p-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Prompt Library started in early 2026 when our founder, Alex, noticed a problem: 
                  AI coding tools were incredibly powerful, but developers were spending more time 
                  crafting the perfect prompt than actually building.
                </p>
                <p>
                  What if there was a library of battle-tested prompts that developers could 
                  just copy and use? What if each prompt came with visual previews so you knew 
                  exactly what you&apos;d get? What if sharing prompts to your favorite IDE was 
                  just one click away?
                </p>
                <p>
                  That&apos;s when Prompt Library was born. We started with 12 categories and 20 
                  prompts, focusing on the UI components developers need most. Today, thousands 
                  of developers use Prompt Library every day to build everything from landing 
                  pages to complex dashboards.
                </p>
                <p>
                  We&apos;re just getting started. Our vision is to become the definitive resource 
                  for AI-assisted UI development, constantly growing our library and supporting 
                  every major AI coding tool.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Our Values</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="bg-card/50 text-center">
                <CardHeader>
                  <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-secondary">
                    <value.icon className="size-6 text-foreground" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Meet the Team</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.name} className="bg-card/50 text-center">
                <CardContent className="pt-6">
                  <Avatar className="mx-auto mb-4 size-20">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-lg">{member.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="mb-2 text-sm text-accent">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="border-0 bg-secondary/50">
            <CardContent className="py-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                Join Our Community
              </h2>
              <p className="mb-6 text-muted-foreground">
                Connect with thousands of vibe coders. Share tips, get help, and grow together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/community">
                    <Users className="mr-2 size-4" />
                    Join Community
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/pricing">View Pricing</Link>
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
