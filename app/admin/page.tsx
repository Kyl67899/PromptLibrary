"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Search,
  ArrowLeft,
  ShieldCheck,
  Mail,
  Users,
  FileText,
  LayoutDashboard,
  TrendingUp,
  ExternalLink,
  Send,
  Clock,
  Calendar,
  Eye,
  MailOpen,
  MousePointerClick,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PromptFormDialog } from "@/components/admin/prompt-form-dialog";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import type { Prompt } from "@/lib/prompts-data";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: "active" | "unsubscribed";
  source: string;
}

interface SubscriberStats {
  total: number;
  active: number;
  unsubscribed: number;
  recentSignups: number;
}

interface Campaign {
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

interface CampaignStats {
  total: number;
  sent: number;
  drafts: number;
  scheduled: number;
  totalRecipients: number;
  avgOpenRate: number;
}

// ── Auth helpers ──────────────────────────────────────────────────────────────

const TOKEN_KEY = "admin_token";

function getToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

function setToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

// ── Login Form ────────────────────────────────────────────────────────────────

function LoginForm({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      onSuccess(data.token);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-accent">
            <ShieldCheck className="size-6 text-accent-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your admin password to continue
            </p>
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-xl border border-border bg-card p-6 space-y-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>

          {error && (
            <p className="text-sm text-destructive font-medium">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            <ArrowLeft className="size-3" />
            Back to library
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Pages Data ────────────────────────────────────────────────────────────────

const sitePages = [
  { name: "Documentation", path: "/docs", description: "IDE usage guides and tutorials" },
  { name: "Features", path: "/features", description: "Product features overview" },
  { name: "Pricing", path: "/pricing", description: "Pricing plans and comparison" },
  { name: "About Us", path: "/about", description: "Team and company info" },
  { name: "Community", path: "/community", description: "Discussion forum for vibe coders" },
  { name: "Help Center", path: "/help", description: "Support articles and FAQs" },
  { name: "Privacy Policy", path: "/privacy", description: "Data privacy information" },
  { name: "Terms of Service", path: "/terms", description: "Usage terms and conditions" },
  { name: "Security", path: "/security", description: "Security practices and compliance" },
];

// ── Campaign Form Dialog ──────────────────────────────────────────────────────

function CampaignFormDialog({
  open,
  onOpenChange,
  campaign,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign | null;
  onSave: (data: { subject: string; content: string; id?: string }) => Promise<void>;
}) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (campaign) {
      setSubject(campaign.subject);
      setContent(campaign.content);
    } else {
      setSubject("");
      setContent("");
    }
  }, [campaign, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave({ subject, content, id: campaign?.id });
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{campaign ? "Edit Campaign" : "Create Campaign"}</DialogTitle>
          <DialogDescription>
            {campaign ? "Update your email campaign" : "Create a new email campaign to send to subscribers"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="subject">Subject Line</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject..."
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="content">Email Content (HTML)</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="<h1>Your newsletter content...</h1>"
              rows={12}
              className="font-mono text-sm"
              required
            />
            <p className="text-xs text-muted-foreground">
              Use HTML tags like &lt;h1&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;a href=&quot;...&quot;&gt; for formatting
            </p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : campaign ? "Update" : "Create Draft"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Schedule Dialog ───────────────────────────────────────────────────────────

function ScheduleDialog({
  open,
  onOpenChange,
  campaign,
  onSchedule,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign | null;
  onSchedule: (id: string, scheduledFor: string) => Promise<void>;
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaign) return;
    setLoading(true);
    try {
      const scheduledFor = new Date(`${date}T${time}`).toISOString();
      await onSchedule(campaign.id, scheduledFor);
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Campaign</DialogTitle>
          <DialogDescription>
            Choose when to send &quot;{campaign?.subject}&quot;
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Scheduling..." : "Schedule"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Preview Dialog ────────────────────────────────────────────────────────────

function PreviewDialog({
  open,
  onOpenChange,
  campaign,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign | null;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Preview: {campaign?.subject}</DialogTitle>
        </DialogHeader>
        <div className="border border-border rounded-lg p-4 bg-white">
          <div
            dangerouslySetInnerHTML={{ __html: campaign?.content || "" }}
            className="prose prose-sm max-w-none"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Send Confirmation Dialog ──────────────────────────────────────────────────

function SendConfirmDialog({
  open,
  onOpenChange,
  campaign,
  subscriberCount,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign | null;
  subscriberCount: number;
  onConfirm: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to send campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Campaign Now?</DialogTitle>
          <DialogDescription>
            This will send &quot;{campaign?.subject}&quot; to {subscriberCount} active subscribers immediately.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={loading}>
            {loading ? "Sending..." : `Send to ${subscriberCount} subscribers`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("prompts");
  
  // Prompts state
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [promptsLoading, setPromptsLoading] = useState(true);
  const [promptSearch, setPromptSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Prompt | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Prompt | null>(null);

  // Newsletter state
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subscriberStats, setSubscriberStats] = useState<SubscriberStats | null>(null);
  const [newsletterLoading, setNewsletterLoading] = useState(true);
  const [subscriberSearch, setSubscriberSearch] = useState("");

  // Campaigns state
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campaignStats, setCampaignStats] = useState<CampaignStats | null>(null);
  const [campaignsLoading, setCampaignsLoading] = useState(true);
  const [campaignFormOpen, setCampaignFormOpen] = useState(false);
  const [editCampaign, setEditCampaign] = useState<Campaign | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleCampaign, setScheduleCampaign] = useState<Campaign | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewCampaign, setPreviewCampaign] = useState<Campaign | null>(null);
  const [sendOpen, setSendOpen] = useState(false);
  const [sendCampaign, setSendCampaign] = useState<Campaign | null>(null);

  // ── Fetch Prompts ──────────────────────────────────────────────────────────

  const fetchPrompts = useCallback(async () => {
    const res = await fetch("/api/admin/prompts");
    const data = await res.json();
    setPrompts(data);
    setPromptsLoading(false);
  }, []);

  // ── Fetch Subscribers ──────────────────────────────────────────────────────

  const fetchSubscribers = useCallback(async () => {
    try {
      const res = await fetch("/api/newsletter", {
        headers: { "x-admin-token": token },
      });
      const data = await res.json();
      setSubscribers(data.subscribers || []);
      setSubscriberStats(data.stats || null);
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    } finally {
      setNewsletterLoading(false);
    }
  }, [token]);

  // ── Fetch Campaigns ────────────────────────────────────────────────────────

  const fetchCampaigns = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/campaigns", {
        headers: { "x-admin-token": token },
      });
      const data = await res.json();
      setCampaigns(data.campaigns || []);
      setCampaignStats(data.stats || null);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    } finally {
      setCampaignsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPrompts();
    fetchSubscribers();
    fetchCampaigns();
  }, [fetchPrompts, fetchSubscribers, fetchCampaigns]);

  // ── Prompt CRUD handlers ───────────────────────────────────────────────────

  const handleSave = async (data: Omit<Prompt, "id"> & { id?: string }) => {
    const method = data.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/prompts", {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Save failed");
    }
    await fetchPrompts();
    toast.success(data.id ? "Prompt updated" : "Prompt created");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await fetch(`/api/admin/prompts?id=${deleteTarget.id}`, {
      method: "DELETE",
      headers: { "x-admin-token": token },
    });
    if (!res.ok) throw new Error("Delete failed");
    await fetchPrompts();
    toast.success("Prompt deleted");
  };

  // ── Subscriber handlers ────────────────────────────────────────────────────

  const handleDeleteSubscriber = async (id: string) => {
    const res = await fetch(`/api/newsletter?id=${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": token },
    });
    if (res.ok) {
      await fetchSubscribers();
      toast.success("Subscriber removed");
    } else {
      toast.error("Failed to remove subscriber");
    }
  };

  // ── Campaign handlers ──────────────────────────────────────────────────────

  const handleSaveCampaign = async (data: { subject: string; content: string; id?: string }) => {
    const method = data.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/campaigns", {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Save failed");
    }
    await fetchCampaigns();
    toast.success(data.id ? "Campaign updated" : "Campaign created");
  };

  const handleScheduleCampaign = async (id: string, scheduledFor: string) => {
    const res = await fetch("/api/admin/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({ action: "schedule", id, scheduledFor }),
    });
    if (!res.ok) throw new Error("Schedule failed");
    await fetchCampaigns();
    toast.success("Campaign scheduled");
  };

  const handleSendCampaign = async () => {
    if (!sendCampaign) return;
    const res = await fetch("/api/admin/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({ action: "send", id: sendCampaign.id }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Send failed");
    await fetchCampaigns();
    toast.success(data.message);
  };

  const handleDeleteCampaign = async (id: string) => {
    const res = await fetch(`/api/admin/campaigns?id=${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": token },
    });
    if (res.ok) {
      await fetchCampaigns();
      toast.success("Campaign deleted");
    } else {
      toast.error("Failed to delete campaign");
    }
  };

  // ── Filter data ────────────────────────────────────────────────────────────

  const filteredPrompts = prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(promptSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(promptSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(promptSearch.toLowerCase())
  );

  const filteredSubscribers = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(subscriberSearch.toLowerCase()) ||
      s.source.toLowerCase().includes(subscriberSearch.toLowerCase())
  );

  const activeSubscriberCount = subscriberStats?.active ?? 0;

  // ── Status badge helper ────────────────────────────────────────────────────

  const getStatusBadge = (status: Campaign["status"]) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Scheduled</Badge>;
      case "sent":
        return <Badge variant="default">Sent</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline text-sm">Library</span>
            </Link>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-accent">
                <LayoutDashboard className="size-3.5 text-accent-foreground" />
              </div>
              <span className="font-semibold text-foreground">Admin Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground gap-2"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="prompts" className="gap-2">
              <Sparkles className="size-4" />
              <span className="hidden sm:inline">Prompts</span>
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="gap-2">
              <Send className="size-4" />
              <span className="hidden sm:inline">Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="gap-2">
              <Users className="size-4" />
              <span className="hidden sm:inline">Subscribers</span>
            </TabsTrigger>
            <TabsTrigger value="pages" className="gap-2">
              <FileText className="size-4" />
              <span className="hidden sm:inline">Pages</span>
            </TabsTrigger>
          </TabsList>

          {/* ── Prompts Tab ────────────────────────────────────────────────── */}
          <TabsContent value="prompts" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Total Prompts", value: prompts.length },
                { label: "Categories", value: new Set(prompts.map((p) => p.category)).size },
                { label: "Forms", value: prompts.filter((p) => p.category === "forms").length },
                { label: "Auth", value: prompts.filter((p) => p.category === "auth").length },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search prompts..."
                  value={promptSearch}
                  onChange={(e) => setPromptSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                onClick={() => {
                  setEditTarget(null);
                  setFormOpen(true);
                }}
                className="gap-2"
              >
                <Plus className="size-4" />
                New Prompt
              </Button>
            </div>

            {/* Prompts Table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {promptsLoading ? (
                <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">
                  Loading prompts...
                </div>
              ) : filteredPrompts.length === 0 ? (
                <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">
                  No prompts found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="w-16">Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="w-24 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPrompts.map((prompt) => (
                        <TableRow key={prompt.id} className="border-border">
                          <TableCell>
                            <div className="relative h-10 w-16 rounded overflow-hidden bg-secondary">
                              <Image
                                src={prompt.image}
                                alt={prompt.title}
                                fill
                                className="object-cover"
                                loading="lazy"
                                sizes="64px"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-foreground max-w-[180px]">
                            <span className="line-clamp-1">{prompt.title}</span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground text-sm max-w-[280px]">
                            <span className="line-clamp-1">{prompt.description}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize text-xs">
                              {prompt.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 text-muted-foreground hover:text-foreground"
                                onClick={() => {
                                  setEditTarget(prompt);
                                  setFormOpen(true);
                                }}
                              >
                                <Pencil className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 text-muted-foreground hover:text-destructive"
                                onClick={() => {
                                  setDeleteTarget(prompt);
                                  setDeleteOpen(true);
                                }}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ── Campaigns Tab ──────────────────────────────────────────────── */}
          <TabsContent value="campaigns" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Total Campaigns", value: campaignStats?.total ?? 0, icon: Mail },
                { label: "Sent", value: campaignStats?.sent ?? 0, icon: Send },
                { label: "Drafts", value: campaignStats?.drafts ?? 0, icon: FileText },
                { label: "Avg Open Rate", value: `${(campaignStats?.avgOpenRate ?? 0).toFixed(1)}%`, icon: MailOpen },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <stat.icon className="size-3.5" />
                    <p className="text-xs">{stat.label}</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Create and send email newsletters to {activeSubscriberCount} active subscribers
              </p>
              <Button
                onClick={() => {
                  setEditCampaign(null);
                  setCampaignFormOpen(true);
                }}
                className="gap-2"
              >
                <Plus className="size-4" />
                New Campaign
              </Button>
            </div>

            {/* Campaigns Table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {campaignsLoading ? (
                <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">
                  Loading campaigns...
                </div>
              ) : campaigns.length === 0 ? (
                <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">
                  No campaigns yet. Create your first one!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Recipients</TableHead>
                        <TableHead className="hidden lg:table-cell">Open Rate</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="w-32 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaigns.map((campaign) => (
                        <TableRow key={campaign.id} className="border-border">
                          <TableCell className="font-medium text-foreground max-w-[250px]">
                            <span className="line-clamp-1">{campaign.subject}</span>
                          </TableCell>
                          <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">
                            {campaign.status === "sent" ? campaign.recipientCount : "-"}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-muted-foreground">
                            {campaign.status === "sent" ? `${campaign.openRate}%` : "-"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                            {campaign.sentAt
                              ? new Date(campaign.sentAt).toLocaleDateString()
                              : campaign.scheduledFor
                              ? `Scheduled: ${new Date(campaign.scheduledFor).toLocaleDateString()}`
                              : new Date(campaign.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 text-muted-foreground hover:text-foreground"
                                onClick={() => {
                                  setPreviewCampaign(campaign);
                                  setPreviewOpen(true);
                                }}
                                title="Preview"
                              >
                                <Eye className="size-4" />
                              </Button>
                              {campaign.status !== "sent" && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-8 text-muted-foreground hover:text-foreground"
                                    onClick={() => {
                                      setEditCampaign(campaign);
                                      setCampaignFormOpen(true);
                                    }}
                                    title="Edit"
                                  >
                                    <Pencil className="size-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-8 text-muted-foreground hover:text-amber-500"
                                    onClick={() => {
                                      setScheduleCampaign(campaign);
                                      setScheduleOpen(true);
                                    }}
                                    title="Schedule"
                                  >
                                    <Calendar className="size-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-8 text-muted-foreground hover:text-primary"
                                    onClick={() => {
                                      setSendCampaign(campaign);
                                      setSendOpen(true);
                                    }}
                                    title="Send Now"
                                  >
                                    <Send className="size-4" />
                                  </Button>
                                </>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 text-muted-foreground hover:text-destructive"
                                onClick={() => handleDeleteCampaign(campaign.id)}
                                title="Delete"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>

            {/* Resend Info */}
            <div className="rounded-xl border border-dashed border-border bg-card/50 p-4">
              <div className="flex items-start gap-3">
                <Mail className="size-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium text-foreground">Powered by Resend</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Emails are sent via Resend. Make sure your RESEND_API_KEY environment variable is configured.
                    {!process.env.RESEND_API_KEY && " (Currently in demo mode - emails won't actually send)"}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── Subscribers Tab ────────────────────────────────────────────── */}
          <TabsContent value="subscribers" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Total Subscribers", value: subscriberStats?.total ?? 0, icon: Users },
                { label: "Active", value: subscriberStats?.active ?? 0, icon: Mail },
                { label: "Unsubscribed", value: subscriberStats?.unsubscribed ?? 0, icon: Trash2 },
                { label: "This Week", value: subscriberStats?.recentSignups ?? 0, icon: TrendingUp },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <stat.icon className="size-3.5" />
                    <p className="text-xs">{stat.label}</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search subscribers..."
                value={subscriberSearch}
                onChange={(e) => setSubscriberSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Subscribers Table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {newsletterLoading ? (
                <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">
                  Loading subscribers...
                </div>
              ) : filteredSubscribers.length === 0 ? (
                <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">
                  No subscribers found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Source</TableHead>
                        <TableHead className="hidden md:table-cell">Subscribed</TableHead>
                        <TableHead className="w-16 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubscribers.map((subscriber) => (
                        <TableRow key={subscriber.id} className="border-border">
                          <TableCell className="font-medium text-foreground">
                            {subscriber.email}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={subscriber.status === "active" ? "default" : "secondary"}
                              className="capitalize text-xs"
                            >
                              {subscriber.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground text-sm capitalize">
                            {subscriber.source}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                            {new Date(subscriber.subscribedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 text-muted-foreground hover:text-destructive"
                              onClick={() => handleDeleteSubscriber(subscriber.id)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ── Pages Tab ──────────────────────────────────────────────────── */}
          <TabsContent value="pages" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Site Pages</h2>
                <p className="text-sm text-muted-foreground">
                  View and manage your site pages. Click to preview.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sitePages.map((page) => (
                <div
                  key={page.path}
                  className="rounded-xl border border-border bg-card p-4 hover:border-accent transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{page.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {page.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 font-mono">
                        {page.path}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="size-8" asChild>
                        <Link href={page.path} target="_blank">
                          <ExternalLink className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-dashed border-border bg-card/50 p-6 text-center">
              <FileText className="size-8 mx-auto text-muted-foreground mb-3" />
              <h3 className="font-medium text-foreground mb-1">Page Editor Coming Soon</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Full page content editing with rich text, images, and more will be available in the next update.
                For now, pages are edited directly in the codebase.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Dialogs */}
      <PromptFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        initialData={editTarget}
        onSave={handleSave}
      />
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        promptTitle={deleteTarget?.title ?? ""}
        onConfirm={handleDelete}
      />
      <CampaignFormDialog
        open={campaignFormOpen}
        onOpenChange={setCampaignFormOpen}
        campaign={editCampaign}
        onSave={handleSaveCampaign}
      />
      <ScheduleDialog
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        campaign={scheduleCampaign}
        onSchedule={handleScheduleCampaign}
      />
      <PreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        campaign={previewCampaign}
      />
      <SendConfirmDialog
        open={sendOpen}
        onOpenChange={setSendOpen}
        campaign={sendCampaign}
        subscriberCount={activeSubscriberCount}
        onConfirm={handleSendCampaign}
      />
    </div>
  );
}

// ── Page Shell ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [token, setTokenState] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTokenState(getToken());
    setChecked(true);
  }, []);

  const handleLoginSuccess = (t: string) => {
    setToken(t);
    setTokenState(t);
  };

  const handleLogout = () => {
    clearToken();
    setTokenState(null);
    router.push("/admin");
  };

  if (!checked) return null;

  if (!token) return <LoginForm onSuccess={handleLoginSuccess} />;

  return <Dashboard token={token} onLogout={handleLogout} />;
}
