"use client";

import { memo } from "react";
import { PromptCard } from "@/components/prompt-card";
import { categories, type Category, type Prompt } from "@/lib/prompts-data";
import {
  LayoutGrid,
  FileText,
  Lock,
  Quote,
  Menu,
  BarChart3,
  FileQuestion,
  HelpCircle,
  Star,
  DollarSign,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  grid: <LayoutGrid className="h-5 w-5" />,
  form: <FileText className="h-5 w-5" />,
  lock: <Lock className="h-5 w-5" />,
  quote: <Quote className="h-5 w-5" />,
  menu: <Menu className="h-5 w-5" />,
  chart: <BarChart3 className="h-5 w-5" />,
  file: <FileQuestion className="h-5 w-5" />,
  help: <HelpCircle className="h-5 w-5" />,
  star: <Star className="h-5 w-5" />,
  dollar: <DollarSign className="h-5 w-5" />,
  footer: <Sparkles className="h-5 w-5" />,
  sparkles: <Sparkles className="h-5 w-5" />,
};

interface CategorizedGridProps {
  prompts: Prompt[];
  favorites?: string[];
  onFavoriteToggle?: (promptId: string) => void;
}

function CategorizedGridComponent({
  prompts,
  favorites = [],
  onFavoriteToggle,
}: CategorizedGridProps) {
  // Group prompts by category
  const groupedByCategory = prompts.reduce(
    (acc, prompt) => {
      if (!acc[prompt.category]) {
        acc[prompt.category] = [];
      }
      acc[prompt.category].push(prompt);
      return acc;
    },
    {} as Record<string, Prompt[]>
  );

  const nonEmptyCategories = categories.filter(
    (cat) => cat.id !== "all" && groupedByCategory[cat.id as Category]?.length
  );

  if (prompts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 rounded-full bg-secondary p-4">
          <svg
            className="size-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="mb-1 text-lg font-semibold text-foreground">
          No prompts found
        </h3>
        <p className="text-muted-foreground">No prompts available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {nonEmptyCategories.map((category) => {
        const categoryPrompts = groupedByCategory[category.id as Category] || [];
        if (categoryPrompts.length === 0) return null;

        return (
          <section key={category.id} id={`category-${category.id}`}>
            {/* Category Header */}
            <div className="mb-6 flex items-center gap-4 border-b-2 border-accent/20 pb-4 scroll-mt-20">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 text-accent">
                {iconMap[category.icon]}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">
                  {category.label}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {categoryPrompts.length} prompt
                  {categoryPrompts.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* Prompts Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {categoryPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  isFavorited={favorites.includes(prompt.id)}
                  onFavoriteToggle={onFavoriteToggle}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export const CategorizedGrid = memo(CategorizedGridComponent);
