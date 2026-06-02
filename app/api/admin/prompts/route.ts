import { NextRequest, NextResponse } from "next/server";
import {
  getAllPrompts,
  createPrompt,
  updatePrompt,
  deletePrompt,
  ADMIN_PASSWORD,
} from "@/lib/prompts-store";
import {
  checkRateLimit,
  validatePromptData,
  sanitizeInput,
  securityHeaders,
} from "@/lib/security";

function isAuthorized(req: NextRequest): boolean {
  const token = req.headers.get("x-admin-token");
  return token === ADMIN_PASSWORD;
}

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

// GET /api/admin/prompts – list all prompts (public, used by main library too)
export async function GET(req: NextRequest) {
  // Rate limit: 200 requests per minute for reads
  const ip = getClientIP(req);
  const rateLimit = checkRateLimit(`get-prompts-${ip}`, 200, 60000);

  if (!rateLimit.allowed) {
    const response = NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
    response.headers.set("Retry-After", String(Math.ceil(rateLimit.resetIn / 1000)));
    return addSecurityHeaders(response);
  }

  const response = NextResponse.json(getAllPrompts());
  return addSecurityHeaders(response);
}

// POST /api/admin/prompts – create a new prompt
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return addSecurityHeaders(
      NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    );
  }

  // Rate limit: 30 creates per minute
  const ip = getClientIP(req);
  const rateLimit = checkRateLimit(`create-prompt-${ip}`, 30, 60000);

  if (!rateLimit.allowed) {
    const response = NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
    response.headers.set("Retry-After", String(Math.ceil(rateLimit.resetIn / 1000)));
    return addSecurityHeaders(response);
  }

  const body = await req.json();
  const { title, description, category, prompt, image } = body;

  if (!title || !description || !category || !prompt || !image) {
    return addSecurityHeaders(
      NextResponse.json({ error: "All fields are required" }, { status: 400 })
    );
  }

  // Validate input
  const validation = validatePromptData({ title, description, prompt, image, category });
  if (!validation.valid) {
    return addSecurityHeaders(
      NextResponse.json({ error: validation.errors.join(", ") }, { status: 400 })
    );
  }

  // Sanitize inputs
  const created = createPrompt({
    title: sanitizeInput(title),
    description: sanitizeInput(description),
    category,
    prompt: sanitizeInput(prompt),
    image: sanitizeInput(image),
  });

  return addSecurityHeaders(NextResponse.json(created, { status: 201 }));
}

// PUT /api/admin/prompts – update an existing prompt
export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return addSecurityHeaders(
      NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    );
  }

  // Rate limit: 50 updates per minute
  const ip = getClientIP(req);
  const rateLimit = checkRateLimit(`update-prompt-${ip}`, 50, 60000);

  if (!rateLimit.allowed) {
    const response = NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
    response.headers.set("Retry-After", String(Math.ceil(rateLimit.resetIn / 1000)));
    return addSecurityHeaders(response);
  }

  const body = await req.json();
  const { id, ...data } = body;

  if (!id) {
    return addSecurityHeaders(
      NextResponse.json({ error: "id is required" }, { status: 400 })
    );
  }

  // Validate input
  const validation = validatePromptData(data);
  if (!validation.valid) {
    return addSecurityHeaders(
      NextResponse.json({ error: validation.errors.join(", ") }, { status: 400 })
    );
  }

  // Sanitize inputs
  const sanitizedData: Record<string, string> = {};
  if (data.title) sanitizedData.title = sanitizeInput(data.title);
  if (data.description) sanitizedData.description = sanitizeInput(data.description);
  if (data.prompt) sanitizedData.prompt = sanitizeInput(data.prompt);
  if (data.image) sanitizedData.image = sanitizeInput(data.image);
  if (data.category) sanitizedData.category = data.category;

  const updated = updatePrompt(id, sanitizedData);
  if (!updated) {
    return addSecurityHeaders(
      NextResponse.json({ error: "Prompt not found" }, { status: 404 })
    );
  }

  return addSecurityHeaders(NextResponse.json(updated));
}

// DELETE /api/admin/prompts – delete a prompt
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return addSecurityHeaders(
      NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    );
  }

  // Rate limit: 20 deletes per minute
  const ip = getClientIP(req);
  const rateLimit = checkRateLimit(`delete-prompt-${ip}`, 20, 60000);

  if (!rateLimit.allowed) {
    const response = NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
    response.headers.set("Retry-After", String(Math.ceil(rateLimit.resetIn / 1000)));
    return addSecurityHeaders(response);
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return addSecurityHeaders(
      NextResponse.json({ error: "id is required" }, { status: 400 })
    );
  }

  const deleted = deletePrompt(id);
  if (!deleted) {
    return addSecurityHeaders(
      NextResponse.json({ error: "Prompt not found" }, { status: 404 })
    );
  }

  return addSecurityHeaders(NextResponse.json({ success: true }));
}
