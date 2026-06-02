/**
 * Web Security Utilities
 * Provides input sanitization, rate limiting helpers, and security constants
 */

// HTML entity encoding to prevent XSS
export function escapeHtml(str: string): string {
  const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  return str.replace(/[&<>"'/]/g, (char) => htmlEscapes[char]);
}

// Sanitize user input - removes potentially dangerous characters
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "");
}

// Validate URL to prevent open redirects
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

// Simple in-memory rate limiter (for demo - use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: record.resetTime - now,
    };
  }

  record.count++;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetIn: record.resetTime - now,
  };
}

// Security headers for API responses
export const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

// Content Security Policy directives
export const cspDirectives = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "https:"],
  "font-src": ["'self'"],
  "connect-src": ["'self'"],
  "frame-ancestors": ["'none'"],
};

export function generateCSP(): string {
  return Object.entries(cspDirectives)
    .map(([key, values]) => `${key} ${values.join(" ")}`)
    .join("; ");
}

// Validate prompt data to prevent injection
export function validatePromptData(data: {
  title?: string;
  description?: string;
  prompt?: string;
  image?: string;
  category?: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (data.title && data.title.length > 200) {
    errors.push("Title must be 200 characters or less");
  }

  if (data.description && data.description.length > 500) {
    errors.push("Description must be 500 characters or less");
  }

  if (data.prompt && data.prompt.length > 5000) {
    errors.push("Prompt must be 5000 characters or less");
  }

  if (data.image && !isValidUrl(data.image) && !data.image.startsWith("/")) {
    errors.push("Image must be a valid URL or local path");
  }

  const validCategories = [
    "forms",
    "auth",
    "testimonials",
    "navbars",
    "stats",
    "blog",
    "faq",
    "hero",
    "pricing",
    "footer",
    "features",
  ];

  if (data.category && !validCategories.includes(data.category)) {
    errors.push("Invalid category");
  }

  return { valid: errors.length === 0, errors };
}
