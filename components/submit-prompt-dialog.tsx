"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Plus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const initial = { name: "", email: "", title: "", category: "Hero sections", description: "", prompt: "" };

export function SubmitPromptDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const update = (key: keyof typeof initial, value: string) => setForm((current) => ({ ...current, [key]: value }));

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setStatus("sending");
    const response = await fetch("/api/submissions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setStatus(response.ok ? "success" : "error");
    if (response.ok) setForm(initial);
  }

  return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><Button size="sm" className="rounded-full"><Plus data-icon="inline-start" /> Submit a prompt</Button></DialogTrigger><DialogContent className="max-w-2xl"><DialogHeader><DialogTitle>A good prompt is worth sharing.</DialogTitle><DialogDescription>Share something thoughtful with the library. Every submission is reviewed before it goes live.</DialogDescription></DialogHeader>{status === "success" ? <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3 py-10 text-center"><div className="flex size-12 items-center justify-center rounded-full bg-lime-200 text-lime-900"><Check /></div><h3 className="text-xl font-semibold">Thanks — it&apos;s in review.</h3><p className="max-w-sm text-sm text-muted-foreground">We sent a confirmation to your inbox. We&apos;ll let you know when an admin approves your prompt.</p><Button variant="outline" onClick={() => setOpen(false)}>Close</Button></motion.div> : <form onSubmit={submit} className="grid gap-4"><div className="grid gap-4 sm:grid-cols-2"><div className="grid gap-2"><Label htmlFor="submission-name">Your name</Label><Input id="submission-name" required value={form.name} onChange={(e) => update("name", e.target.value)} /></div><div className="grid gap-2"><Label htmlFor="submission-email">Email</Label><Input id="submission-email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} /></div></div><div className="grid gap-2"><Label htmlFor="submission-title">Prompt title</Label><Input id="submission-title" required placeholder="e.g. Split hero" value={form.title} onChange={(e) => update("title", e.target.value)} /></div><div className="grid gap-2"><Label htmlFor="submission-description">Short description</Label><Input id="submission-description" required value={form.description} onChange={(e) => update("description", e.target.value)} /></div><div className="grid gap-2"><Label htmlFor="submission-prompt">The prompt</Label><Textarea id="submission-prompt" required rows={7} value={form.prompt} onChange={(e) => update("prompt", e.target.value)} /></div>{status === "error" && <p className="text-sm text-destructive">We couldn&apos;t submit that yet. Please try again.</p>}<Button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending for review..." : "Submit for review"}<Send data-icon="inline-end" /></Button></form>}</DialogContent></Dialog>;
}
