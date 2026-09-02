"use client";

import { useState, useEffect } from "react";
import { type Category, categories } from "@/lib/prompts-data";

export function useScrollCategory() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Get all category sections
      const categoryElements = categories
        .filter((c) => c.id !== "all")
        .map((c) => ({
          id: c.id as Category,
          element: document.getElementById(`category-${c.id}`),
        }))
        .filter((c) => c.element !== null);

      if (categoryElements.length === 0) return;

      // Find which category section is closest to the top of viewport
      let activeCategory: Category | null = null;
      let smallestDistance = Infinity;

      categoryElements.forEach(({ id, element }) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        
        // If element is in view or above it
        if (rect.top <= 200) {
          // Distance from top of viewport
          const distance = Math.abs(rect.top);
          
          if (distance < smallestDistance) {
            smallestDistance = distance;
            activeCategory = id;
          }
        }
      });

      if (activeCategory) {
        setActiveCategory(activeCategory);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Call once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeCategory;
}
