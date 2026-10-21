import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { getMongoClient } from "@/lib/mongodb";

const submissionSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().email().max(160),
  title: z.string().trim().min(3).max(120),
  category: z.string().trim().min(2).max(40),
  description: z.string().trim().min(10).max(240),
  prompt: z.string().trim().min(20).max(8000),
});

export async function POST(request: Request) {
  const parsed = submissionSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please complete every field correctly." }, { status: 400 });

  const client = await getMongoClient();
  if (!client) return NextResponse.json({ error: "Submission service is not configured yet." }, { status: 503 });

  const submission = { ...parsed.data, status: "pending", createdAt: new Date(), updatedAt: new Date() };
  const collection = client.db(process.env.MONGODB_DATABASE || "promptlibrary").collection("submissions");
  const result = await collection.insertOne(submission);

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  const email = resend ? await resend.emails.send({
    from: "Prompt Library <onboarding@resend.dev>",
    to: [parsed.data.email],
    subject: "Your prompt is awaiting review",
    html: `<p>Hi ${parsed.data.name},</p><p>Thanks for sharing <strong>${parsed.data.title}</strong>. We received it and it is now awaiting admin approval.</p><p>We will email you when it is published.</p>`,
  }, { idempotencyKey: `prompt-submission/${result.insertedId.toString()}` }) : null;

  if (email?.error) console.error("[v0] confirmation email failed", email.error.message);
  return NextResponse.json({ id: result.insertedId.toString(), status: "pending" }, { status: 201 });
}
