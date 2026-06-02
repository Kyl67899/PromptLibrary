// Newsletter campaigns store
// In production, this would be stored in a database

export interface Campaign {
  id: string;
  subject: string;
  content: string;
  status: "draft" | "scheduled" | "sent" | "failed";
  scheduledFor: string | null;
  sentAt: string | null;
  recipientCount: number;
  openRate: number;
  clickRate: number;
  createdAt: string;
  updatedAt: string;
}

// In-memory store (replace with database in production)
let campaigns: Campaign[] = [
  {
    id: "1",
    subject: "Welcome to Prompt Library - New Prompts Inside!",
    content: `<h1>Welcome to Prompt Library!</h1>
<p>We're excited to have you join our community of vibe coders. This week, we've added 10 new prompts for building amazing UIs.</p>
<h2>Featured Prompts This Week:</h2>
<ul>
  <li>Modern Login Form with Social Auth</li>
  <li>Animated Hero Section with Particles</li>
  <li>Responsive Pricing Cards</li>
</ul>
<p>Check them out and start building!</p>`,
    status: "sent",
    scheduledFor: null,
    sentAt: "2024-01-20T14:00:00Z",
    recipientCount: 156,
    openRate: 42.3,
    clickRate: 18.7,
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-20T14:00:00Z",
  },
  {
    id: "2",
    subject: "New Feature: IDE Integration Guide",
    content: `<h1>Share Prompts Directly to Your IDE!</h1>
<p>We've added one-click sharing to v0, Claude, Cursor, and more. Learn how to use these integrations in our new documentation.</p>`,
    status: "draft",
    scheduledFor: null,
    sentAt: null,
    recipientCount: 0,
    openRate: 0,
    clickRate: 0,
    createdAt: "2024-01-25T09:00:00Z",
    updatedAt: "2024-01-25T09:00:00Z",
  },
];

export function getAllCampaigns(): Campaign[] {
  return [...campaigns].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getCampaignById(id: string): Campaign | undefined {
  return campaigns.find((c) => c.id === id);
}

export function createCampaign(data: Omit<Campaign, "id" | "createdAt" | "updatedAt" | "sentAt" | "recipientCount" | "openRate" | "clickRate">): Campaign {
  const newCampaign: Campaign = {
    ...data,
    id: crypto.randomUUID(),
    sentAt: null,
    recipientCount: 0,
    openRate: 0,
    clickRate: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  campaigns.push(newCampaign);
  return newCampaign;
}

export function updateCampaign(id: string, data: Partial<Omit<Campaign, "id" | "createdAt">>): Campaign | null {
  const index = campaigns.findIndex((c) => c.id === id);
  if (index === -1) return null;
  
  campaigns[index] = {
    ...campaigns[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return campaigns[index];
}

export function deleteCampaign(id: string): boolean {
  const index = campaigns.findIndex((c) => c.id === id);
  if (index === -1) return false;
  campaigns.splice(index, 1);
  return true;
}

export function markCampaignSent(id: string, recipientCount: number): Campaign | null {
  const campaign = campaigns.find((c) => c.id === id);
  if (!campaign) return null;
  
  campaign.status = "sent";
  campaign.sentAt = new Date().toISOString();
  campaign.recipientCount = recipientCount;
  campaign.updatedAt = new Date().toISOString();
  return campaign;
}

export function getCampaignStats() {
  const total = campaigns.length;
  const sent = campaigns.filter((c) => c.status === "sent").length;
  const drafts = campaigns.filter((c) => c.status === "draft").length;
  const scheduled = campaigns.filter((c) => c.status === "scheduled").length;
  const totalRecipients = campaigns.reduce((sum, c) => sum + c.recipientCount, 0);
  const avgOpenRate = sent > 0
    ? campaigns.filter((c) => c.status === "sent").reduce((sum, c) => sum + c.openRate, 0) / sent
    : 0;

  return { total, sent, drafts, scheduled, totalRecipients, avgOpenRate };
}
