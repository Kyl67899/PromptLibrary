import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  markCampaignSent,
  getCampaignStats,
} from "@/lib/campaigns-store";
import { getActiveSubscribers } from "@/lib/newsletter-store";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Email template wrapper
function wrapInEmailTemplate(content: string, subject: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; }
          h1 { color: #18181b; font-size: 24px; }
          h2 { color: #18181b; font-size: 20px; }
          a { color: #f59e0b; }
          ul { padding-left: 20px; }
          li { margin-bottom: 8px; }
        </style>
      </head>
      <body style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="font-size: 24px; font-weight: bold; color: #18181b;">Prompt Library</span>
          </div>
          
          <div style="margin-bottom: 32px;">
            ${content}
          </div>
          
          <div style="border-top: 1px solid #e4e4e7; padding-top: 24px; text-align: center;">
            <p style="color: #a1a1aa; font-size: 13px; margin: 0 0 8px 0;">
              You received this email because you subscribed to Prompt Library newsletter.
            </p>
            <p style="margin: 0;">
              <a href="https://promptlibrary.dev/unsubscribe" style="color: #71717a; font-size: 13px;">Unsubscribe</a>
              &nbsp;|&nbsp;
              <a href="https://promptlibrary.dev" style="color: #71717a; font-size: 13px;">Visit Prompt Library</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// GET - Get all campaigns or campaign stats
export async function GET(request: NextRequest) {
  const token = request.headers.get("x-admin-token");
  
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const statsOnly = searchParams.get("stats") === "true";
  const id = searchParams.get("id");

  if (statsOnly) {
    return NextResponse.json({ stats: getCampaignStats() });
  }

  if (id) {
    const campaign = getCampaignById(id);
    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }
    return NextResponse.json({ campaign });
  }

  const campaigns = getAllCampaigns();
  const stats = getCampaignStats();
  return NextResponse.json({ campaigns, stats });
}

// POST - Create campaign or send campaign
export async function POST(request: NextRequest) {
  const token = request.headers.get("x-admin-token");
  
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action } = body;

    // Send campaign
    if (action === "send") {
      const { id } = body;
      const campaign = getCampaignById(id);
      
      if (!campaign) {
        return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
      }

      if (campaign.status === "sent") {
        return NextResponse.json({ error: "Campaign already sent" }, { status: 400 });
      }

      const subscribers = getActiveSubscribers();
      
      if (subscribers.length === 0) {
        return NextResponse.json({ error: "No active subscribers" }, { status: 400 });
      }

      if (!resend) {
        // Demo mode - mark as sent without actually sending
        markCampaignSent(id, subscribers.length);
        return NextResponse.json({ 
          success: true, 
          message: `Campaign marked as sent to ${subscribers.length} subscribers (Resend not configured)`,
          demo: true,
        });
      }

      // Send emails via Resend
      const htmlContent = wrapInEmailTemplate(campaign.content, campaign.subject);
      const emails = subscribers.map((s) => s.email);

      // Batch send (Resend supports batch sending)
      try {
        const { error } = await resend.batch.send(
          emails.map((email) => ({
            from: "Prompt Library <newsletter@promptlibrary.dev>",
            to: [email],
            subject: campaign.subject,
            html: htmlContent,
          }))
        );

        if (error) {
          console.error("Resend batch send error:", error);
          updateCampaign(id, { status: "failed" });
          return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
        }

        markCampaignSent(id, subscribers.length);
        return NextResponse.json({ 
          success: true, 
          message: `Campaign sent to ${subscribers.length} subscribers`,
        });
      } catch (sendError) {
        console.error("Send error:", sendError);
        updateCampaign(id, { status: "failed" });
        return NextResponse.json({ error: "Failed to send campaign" }, { status: 500 });
      }
    }

    // Schedule campaign
    if (action === "schedule") {
      const { id, scheduledFor } = body;
      const campaign = getCampaignById(id);
      
      if (!campaign) {
        return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
      }

      updateCampaign(id, { 
        status: "scheduled", 
        scheduledFor: new Date(scheduledFor).toISOString(),
      });

      return NextResponse.json({ 
        success: true, 
        message: "Campaign scheduled",
      });
    }

    // Create new campaign
    const { subject, content, status = "draft", scheduledFor = null } = body;

    if (!subject || !content) {
      return NextResponse.json({ error: "Subject and content are required" }, { status: 400 });
    }

    const campaign = createCampaign({
      subject,
      content,
      status,
      scheduledFor,
    });

    return NextResponse.json({ success: true, campaign });
  } catch (error) {
    console.error("Campaign API error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

// PUT - Update campaign
export async function PUT(request: NextRequest) {
  const token = request.headers.get("x-admin-token");
  
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, subject, content, status, scheduledFor } = body;

    if (!id) {
      return NextResponse.json({ error: "Campaign ID is required" }, { status: 400 });
    }

    const existing = getCampaignById(id);
    if (!existing) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    if (existing.status === "sent") {
      return NextResponse.json({ error: "Cannot edit sent campaign" }, { status: 400 });
    }

    const updated = updateCampaign(id, {
      ...(subject && { subject }),
      ...(content && { content }),
      ...(status && { status }),
      ...(scheduledFor !== undefined && { scheduledFor }),
    });

    return NextResponse.json({ success: true, campaign: updated });
  } catch (error) {
    console.error("Campaign update error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

// DELETE - Delete campaign
export async function DELETE(request: NextRequest) {
  const token = request.headers.get("x-admin-token");
  
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Campaign ID is required" }, { status: 400 });
  }

  const success = deleteCampaign(id);
  if (!success) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
