// TODO: make this page dynamic and fetch real discussions from the database, also add pagination and sorting options.
// TODO: Make this a full fledged forum with categories, tags, user profiles, and more. This is just a static mockup for now to get the design right before implementing the backend.

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Users,
  TrendingUp,
  Lightbulb,
  Heart,
  MessageCircle,
  Clock,
  ChevronUp,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SaaSFooter } from "@/components/saas-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { id: "all", label: "All Topics", count: 24 },
  { id: "prompts", label: "Prompt Sharing", count: 8 },
  { id: "tips", label: "Tips & Tricks", count: 6 },
  { id: "showcase", label: "Showcase", count: 5 },
  { id: "help", label: "Help & Support", count: 3 },
  { id: "feedback", label: "Feature Requests", count: 2 },
];

const discussions = [
  {
    id: 1,
    title: "Best practices for generating responsive navbars with v0?",
    author: "devmaster42",
    authorAvatar: "",
    authorInitials: "DM",
    category: "tips",
    replies: 12,
    likes: 34,
    views: 256,
    createdAt: "2 hours ago",
    isPinned: true,
    tags: ["v0", "navbar", "responsive"],
  },
  {
    id: 2,
    title: "Sharing my custom prompt for animated hero sections",
    author: "uiqueen",
    authorAvatar: "",
    authorInitials: "UQ",
    category: "prompts",
    replies: 8,
    likes: 45,
    views: 189,
    createdAt: "5 hours ago",
    isPinned: false,
    tags: ["hero", "animation", "custom"],
  },
  {
    id: 3,
    title: "Showcase: Built a full dashboard using only Prompt Library prompts",
    author: "buildfast",
    authorAvatar: "",
    authorInitials: "BF",
    category: "showcase",
    replies: 23,
    likes: 89,
    views: 512,
    createdAt: "1 day ago",
    isPinned: false,
    tags: ["dashboard", "showcase", "full-stack"],
  },
  {
    id: 4,
    title: "How to get better results with Claude for form validation?",
    author: "formwizard",
    authorAvatar: "",
    authorInitials: "FW",
    category: "help",
    replies: 6,
    likes: 12,
    views: 98,
    createdAt: "1 day ago",
    isPinned: false,
    tags: ["claude", "forms", "validation"],
  },
  {
    id: 5,
    title: "Feature Request: Add prompts for data visualization components",
    author: "chartlover",
    authorAvatar: "",
    authorInitials: "CL",
    category: "feedback",
    replies: 15,
    likes: 67,
    views: 234,
    createdAt: "2 days ago",
    isPinned: false,
    tags: ["charts", "feature-request", "data-viz"],
  },
  {
    id: 6,
    title: "My workflow for combining multiple prompts into full pages",
    author: "pagebuilder",
    authorAvatar: "",
    authorInitials: "PB",
    category: "tips",
    replies: 19,
    likes: 78,
    views: 421,
    createdAt: "3 days ago",
    isPinned: false,
    tags: ["workflow", "pages", "tips"],
  },
];

const topContributors = [
  { name: "uiqueen", points: 1250, initials: "UQ" },
  { name: "devmaster42", points: 980, initials: "DM" },
  { name: "buildfast", points: 875, initials: "BF" },
  { name: "promptpro", points: 720, initials: "PP" },
  { name: "codeartist", points: 650, initials: "CA" },
];

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const filteredDiscussions = discussions.filter((d) => {
    const matchesCategory = selectedCategory === "all" || d.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Community
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Vibe Coders Community
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Connect with fellow developers, share prompts, get help, and showcase your work.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button size="lg">
              <Plus className="mr-2 size-4" />
              Start Discussion
            </Button>
            <Button variant="outline" size="lg">
              <Lightbulb className="mr-2 size-4" />
              Share a Prompt
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <Card className="mb-6 bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Categories</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <Badge variant="secondary" className="text-xs">
                        {cat.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card className="bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="size-4" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-3">
                  {topContributors.map((user, index) => (
                    <div key={user.name} className="flex items-center gap-3">
                      <span className="w-4 text-sm text-muted-foreground">{index + 1}</span>
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.points} points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="replies">Most Replies</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <Card
                  key={discussion.id}
                  className={`bg-card/50 transition-colors hover:bg-card ${
                    discussion.isPinned ? "border-accent" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Vote */}
                      <div className="flex flex-col items-center gap-1">
                        <Button variant="ghost" size="icon" className="size-8">
                          <ChevronUp className="size-4" />
                        </Button>
                        <span className="text-sm font-medium text-foreground">
                          {discussion.likes}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          {discussion.isPinned && (
                            <Badge variant="default" className="text-xs">
                              Pinned
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {categories.find((c) => c.id === discussion.category)?.label}
                          </Badge>
                        </div>
                        <h3 className="mb-2 font-semibold text-foreground hover:text-accent">
                          <Link href="#">{discussion.title}</Link>
                        </h3>
                        <div className="mb-3 flex flex-wrap gap-2">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Avatar className="size-5">
                              <AvatarFallback className="text-[10px]">
                                {discussion.authorInitials}
                              </AvatarFallback>
                            </Avatar>
                            <span>{discussion.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="size-3" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="size-3" />
                            <span>{discussion.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <Button variant="outline">Load More Discussions</Button>
            </div>
          </div>
        </div>
      </main>

      <SaaSFooter />
    </div>
  );
}
