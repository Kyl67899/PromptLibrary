"use client";

import { useState, useCallback, useEffect } from "react";
import { getFavorites, addFavorite, removeFavorite } from "@/lib/favorites-store";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setFavorites(getFavorites());
  }, []);

  const isFavorite = useCallback(
    (promptId: string) => favorites.includes(promptId),
    [favorites]
  );

  const toggleFavorite = useCallback((promptId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(promptId)
        ? prev.filter((id) => id !== promptId)
        : [...prev, promptId];

      if (newFavorites.includes(promptId)) {
        addFavorite(promptId);
      } else {
        removeFavorite(promptId);
      }

      return newFavorites;
    });
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    isClient,
  };
}
