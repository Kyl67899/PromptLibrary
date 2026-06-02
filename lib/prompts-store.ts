/**
 * In-memory prompts store.
 * On cold-start it seeds from the static prompts-data.ts array.
 * All admin CRUD mutates this module-level array so changes are
 * reflected immediately in the same server process (no DB needed).
 *
 * To persist across deploys, replace `store` with a real database.
 */

import { prompts as seedPrompts, type Prompt } from "@/lib/prompts-data";

// Module-level singleton – shared across all requests in the same process
let store: Prompt[] = [...seedPrompts];
let nextId = seedPrompts.length + 1;

// ── Read ──────────────────────────────────────────────────────────────────────

export function getAllPrompts(): Prompt[] {
  return store;
}

export function getPromptById(id: string): Prompt | undefined {
  return store.find((p) => p.id === id);
}

// ── Create ────────────────────────────────────────────────────────────────────

export function createPrompt(
  data: Omit<Prompt, "id">
): Prompt {
  const prompt: Prompt = { id: String(nextId++), ...data };
  store.push(prompt);
  return prompt;
}

// ── Update ────────────────────────────────────────────────────────────────────

export function updatePrompt(
  id: string,
  data: Partial<Omit<Prompt, "id">>
): Prompt | null {
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return null;
  store[index] = { ...store[index], ...data };
  return store[index];
}

// ── Delete ────────────────────────────────────────────────────────────────────

export function deletePrompt(id: string): boolean {
  const before = store.length;
  store = store.filter((p) => p.id !== id);
  return store.length < before;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

/**
 * Hardcode your admin password here (or swap for env var).
 * The user can change this value manually before deploying.
 */
export const ADMIN_PASSWORD = "admin1234";
