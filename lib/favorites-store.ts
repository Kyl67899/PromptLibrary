// Favorites store using localStorage
const FAVORITES_KEY = 'prompt-library-favorites';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function isFavorite(promptId: string): boolean {
  return getFavorites().includes(promptId);
}

export function addFavorite(promptId: string): void {
  const favorites = getFavorites();
  if (!favorites.includes(promptId)) {
    favorites.push(promptId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(promptId: string): void {
  const favorites = getFavorites().filter(id => id !== promptId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(promptId: string): boolean {
  if (isFavorite(promptId)) {
    removeFavorite(promptId);
    return false;
  } else {
    addFavorite(promptId);
    return true;
  }
}
