"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { Sidebar } from "@/components/sidebar";
import { SearchBar } from "@/components/search-bar";
import { PromptGrid } from "@/components/prompt-grid";
import { CategorizedGrid } from "@/components/categorized-grid";
import { SaaSFooter } from "@/components/saas-footer";
import { ScrollCategoryIndicator } from "@/components/scroll-category-indicator";
import { useFavorites } from "@/hooks/use-favorites";
import { categories, type Category, type Prompt } from "@/lib/prompts-data";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function PromptLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { favorites, isFavorite, toggleFavorite, isClient } = useFavorites();

  const { data: prompts = [], isLoading } = useSWR<Prompt[]>(
    "/api/admin/prompts",
    fetcher,
    { refreshInterval: 5000 }
  );

  // Calculate prompt counts for each category
  const promptCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      all: prompts.length,
      forms: 0,
      auth: 0,
      testimonials: 0,
      navbars: 0,
      stats: 0,
      blog: 0,
      faq: 0,
      hero: 0,
      pricing: 0,
      footer: 0,
      features: 0,
    };

    prompts.forEach((prompt) => {
      counts[prompt.category]++;
    });

    return counts;
  }, [prompts]);

  // Filter prompts based on category and search
  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const matchesCategory =
        selectedCategory === "all" || prompt.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, prompts]);

  // Reset to page 1 when filters change
  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const currentCategory = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollCategoryIndicator />
      
      <div className="flex flex-1">
        <Sidebar
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          promptCounts={promptCounts}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          {/* Header */}
          <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h1 className="text-xl font-bold text-foreground sm:text-2xl">
                  {currentCategory?.label || "All Prompts"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {filteredPrompts.length} prompt
                  {filteredPrompts.length !== 1 ? "s" : ""} available
                </p>
              </div>
              <SearchBar value={searchQuery} onChange={handleSearchChange} />
            </div>
          </header>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-muted-foreground">Loading prompts...</div>
              </div>
            ) : selectedCategory === "all" && searchQuery === "" ? (
              <CategorizedGrid
                prompts={filteredPrompts}
                favorites={isClient ? favorites : []}
                onFavoriteToggle={toggleFavorite}
              />
            ) : (
              <PromptGrid
                prompts={filteredPrompts}
                searchQuery={searchQuery}
                isLoading={isLoading}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                itemsPerPage={9}
                favorites={isClient ? favorites : []}
                onFavoriteToggle={toggleFavorite}
              />
            )}
          </div>
        </main>
      </div>

      {/* SaaS Footer */}
      <SaaSFooter />
    </div>
  );
}
