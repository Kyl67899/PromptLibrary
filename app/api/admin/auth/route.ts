import { NextRequest, NextResponse } from "next/server";
import { ADMIN_PASSWORD } from "@/lib/prompts-store";
import { checkRateLimit, securityHeaders } from "@/lib/security";

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

// POST /api/admin/auth – validate the admin password
export async function POST(req: NextRequest) {
  const ip = getClientIP(req);

  // Strict rate limit for auth: 5 attempts per minute to prevent brute force
  const rateLimit = checkRateLimit(`auth-${ip}`, 5, 60000);

  if (!rateLimit.allowed) {
    const response = NextResponse.json(
      {
        error: "Too many login attempts. Please try again later.",
        retryAfter: Math.ceil(rateLimit.resetIn / 1000),
      },
      { status: 429 }
    );
    response.headers.set("Retry-After", String(Math.ceil(rateLimit.resetIn / 1000)));
    return addSecurityHeaders(response);
  }

  const { password } = await req.json();

  // Add slight delay to prevent timing attacks
  await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 100));

  if (password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true, token: ADMIN_PASSWORD });
    return addSecurityHeaders(response);
  }

  const response = NextResponse.json(
    { error: "Invalid password", attemptsRemaining: rateLimit.remaining },
    { status: 401 }
  );
  return addSecurityHeaders(response);
}
