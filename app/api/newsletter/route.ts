import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { addSubscriber, getAllSubscribers, deleteSubscriber, getSubscriberStats, unsubscribe } from "@/lib/newsletter-store";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Simple in-memory rate limiting for newsletter signup
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // 3 signups per minute per IP

function getRateLimitInfo(ip: string) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Send welcome email via Resend
async function sendWelcomeEmail(email: string): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.log("Resend not configured, skipping welcome email...");
    return { success: true };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Prompt Library <newsletter@promptlibrary.dev>",
      to: [email],
      subject: "Welcome to Prompt Library Newsletter!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Prompt Library</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
            <div style="background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 32px;">
                <div style="display: inline-block; background-color: #18181b; border-radius: 12px; padding: 12px; margin-bottom: 16px;">
                  <span style="font-size: 24px;">✨</span>
                </div>
                <h1 style="color: #18181b; font-size: 28px; margin: 0 0 8px 0;">Welcome to Prompt Library!</h1>
                <p style="color: #6b7280; font-size: 16px; margin: 0;">Your journey to better vibe coding starts here.</p>
              </div>
              
              <div style="background-color: #f4f4f5; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <h2 style="color: #18181b; font-size: 18px; margin: 0 0 16px 0;">What you'll get:</h2>
                <ul style="color: #3f3f46; padding-left: 20px; margin: 0;">
                  <li style="margin-bottom: 12px;">New prompts for UI components every week</li>
                  <li style="margin-bottom: 12px;">Tips for using v0, Claude, Cursor & more</li>
                  <li style="margin-bottom: 12px;">Best practices for vibe coding</li>
                  <li style="margin-bottom: 0;">Early access to new features & updates</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin-bottom: 32px;">
                <a href="https://promptlibrary.dev" style="display: inline-block; background-color: #18181b; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">Browse Prompts</a>
              </div>
              
              <div style="border-top: 1px solid #e4e4e7; padding-top: 24px; text-align: center;">
                <p style="color: #a1a1aa; font-size: 13px; margin: 0 0 8px 0;">You're receiving this email because you subscribed to Prompt Library newsletter.</p>
                <p style="margin: 0;"><a href="https://promptlibrary.dev/unsubscribe" style="color: #71717a; font-size: 13px;">Unsubscribe</a></p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: "Failed to send welcome email" };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Failed to send welcome email" };
  }
}

// POST - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateLimit = getRateLimitInfo(ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, source = "footer" } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Add to local store
    addSubscriber(sanitizedEmail, source);

    // Send welcome email via Resend
    await sendWelcomeEmail(sanitizedEmail);

    return NextResponse.json(
      { 
        success: true, 
        message: "Successfully subscribed! Check your email for confirmation.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// GET - Get all subscribers (admin only)
export async function GET(request: NextRequest) {
  const token = request.headers.get("x-admin-token");
  
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscribers = getAllSubscribers();
  const stats = getSubscriberStats();

  return NextResponse.json({ subscribers, stats });
}

// DELETE - Remove subscriber (admin only) or unsubscribe
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const email = searchParams.get("email");
  const token = request.headers.get("x-admin-token");

  // Admin delete by ID
  if (id && token) {
    const success = deleteSubscriber(id);
    if (!success) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  }

  // User unsubscribe by email
  if (email) {
    const success = unsubscribe(email);
    if (!success) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Successfully unsubscribed" });
  }

  return NextResponse.json({ error: "Missing id or email parameter" }, { status: 400 });
}
