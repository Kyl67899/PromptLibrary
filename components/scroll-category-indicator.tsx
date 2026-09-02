"use client";

import { cn } from "@/lib/utils";
import { categories, type Category } from "@/lib/prompts-data";
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
import { useScrollCategory } from "@/hooks/use-scroll-category";

const iconMap: Record<string, React.ReactNode> = {
  grid: <LayoutGrid className="h-4 w-4" />,
  form: <FileText className="h-4 w-4" />,
  lock: <Lock className="h-4 w-4" />,
  quote: <Quote className="h-4 w-4" />,
  menu: <Menu className="h-4 w-4" />,
  chart: <BarChart3 className="h-4 w-4" />,
  file: <FileQuestion className="h-4 w-4" />,
  help: <HelpCircle className="h-4 w-4" />,
  star: <Star className="h-4 w-4" />,
  dollar: <DollarSign className="h-4 w-4" />,
  footer: <Sparkles className="h-4 w-4" />,
  sparkles: <Sparkles className="h-4 w-4" />,
};

interface ScrollCategoryIndicatorProps {
  visible?: boolean;
}

export function ScrollCategoryIndicator({ visible = true }: ScrollCategoryIndicatorProps) {
  const activeCategory = useScrollCategory();

  if (!activeCategory || activeCategory === "all" || !visible) {
    return null;
  }

  const category = categories.find((c) => c.id === activeCategory);
  if (!category) return null;

  return (
    <div
      className={cn(
        "fixed top-14 right-4 md:right-6 z-40 animate-in fade-in slide-in-from-top-2 duration-300",
        "bg-background/95 backdrop-blur-md border border-border rounded-lg px-4 py-2.5",
        "shadow-md"
      )}
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        {iconMap[category.icon]}
        <span>{category.label}</span>
      </div>
    </div>
  );
}
