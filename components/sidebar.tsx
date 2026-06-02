"use client";

import { useState } from "react";
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
  PanelLeftClose,
  PanelLeft,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  footer: <PanelLeftClose className="h-4 w-4" />,
  sparkles: <Sparkles className="h-4 w-4" />,
};

interface SidebarProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  promptCounts: Record<Category, number>;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({
  selectedCategory,
  onCategoryChange,
  promptCounts,
  isOpen,
  onToggle,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 border-r border-sidebar-border bg-sidebar transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <Sparkles className="h-4 w-4 text-accent-foreground" />
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground">
                Prompt Library
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-sidebar-foreground"
              onClick={onToggle}
            >
              <PanelLeftClose className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(category.id);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    selectedCategory === category.id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {iconMap[category.icon]}
                    <span>{category.label}</span>
                  </div>
                  <span
                    className={cn(
                      "text-xs tabular-nums",
                      selectedCategory === category.id
                        ? "text-sidebar-accent-foreground/70"
                        : "text-sidebar-foreground/50"
                    )}
                  >
                    {promptCounts[category.id]}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4 space-y-3">
            <p className="text-xs text-sidebar-foreground/50">
              {promptCounts.all} prompts available
            </p>
            <Link
              href="/admin"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-30 lg:hidden shadow-lg"
        onClick={onToggle}
      >
        <PanelLeft className="h-5 w-5" />
      </Button>
    </>
  );
}
