import { NextRequest, NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
import { ADMIN_PASSWORD } from "@/lib/prompts-store";

function authorized(request: NextRequest) { return request.headers.get("x-admin-token") === ADMIN_PASSWORD; }

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const client = await getMongoClient();
  if (!client) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  const submissions = await client.db(process.env.MONGODB_DATABASE || "promptlibrary").collection("submissions").find().sort({ createdAt: -1 }).limit(100).toArray();
  return NextResponse.json(submissions);
}

export async function PATCH(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = await request.json();
  if (!id || !["pending", "approved", "rejected"].includes(status)) return NextResponse.json({ error: "Invalid moderation request" }, { status: 400 });
  const client = await getMongoClient();
  if (!client) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  const { ObjectId } = await import("mongodb");
  const result = await client.db(process.env.MONGODB_DATABASE || "promptlibrary").collection("submissions").findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date() } }, { returnDocument: "after" });
  return result ? NextResponse.json(result) : NextResponse.json({ error: "Submission not found" }, { status: 404 });
}
