export interface ChangelogEntry {
  version: string;
  date: string;
  type: "release" | "feature" | "improvement";
  title: string;
  description: string;
}

export const changelogData: ChangelogEntry[] = [
  {
    version: "1.4.0",
    date: "June 6, 2026",
    type: "improvement" as const,
    title: "Fixed bugs and performance optimizations",
    description:
      "Added the contact form with spam and rate limit protection. Resolved several minor bugs and improved overall performance and stability of the application.",
  },
  {
    version: "1.3.0",
    date: "May 31, 2026",
    type: "feature" as const,
    title: "IDE Integration",
    description:
      "Share prompts directly to v0, Claude, GitHub Copilot, and Perplexity. Copy prompts as formatted markdown.",
  },
  {
    version: "1.2.0",
    date: "May 28, 2026",
    type: "feature" as const,
    title: "Admin Dashboard",
    description:
      "Full CRUD management for prompts. Create, edit, and delete prompts in real-time from the admin panel.",
  },
  {
    version: "1.1.0",
    date: "May 25, 2026",
    type: "improvement" as const,
    title: "Enhanced Security",
    description:
      "Added rate limiting, input sanitization, XSS protection, and security headers for all API endpoints.",
  },
  {
    version: "1.0.0",
    date: "May 20, 2026",
    type: "release" as const,
    title: "Initial Launch",
    description:
      "Launch of Prompt Library with 20+ UI prompts across 12 categories. Includes search, filtering, and responsive design.",
  },
];