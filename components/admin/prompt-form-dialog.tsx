"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, type Prompt, type Category } from "@/lib/prompts-data";

const CATEGORY_OPTIONS = categories.filter((c) => c.id !== "all");

interface PromptFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Prompt | null;
  onSave: (data: Omit<Prompt, "id"> & { id?: string }) => Promise<void>;
}

const EMPTY: Omit<Prompt, "id"> = {
  title: "",
  description: "",
  category: "forms",
  prompt: "",
  image: "",
};

export function PromptFormDialog({
  open,
  onOpenChange,
  initialData,
  onSave,
}: PromptFormDialogProps) {
  const [form, setForm] = useState<Omit<Prompt, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      const { id: _id, ...rest } = initialData;
      setForm(rest);
    } else {
      setForm(EMPTY);
    }
    setError("");
  }, [initialData, open]);

  const set = (key: keyof typeof EMPTY, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.category || !form.prompt || !form.image) {
      setError("All fields are required.");
      return;
    }
    setSaving(true);
    try {
      await onSave(initialData ? { ...form, id: initialData.id } : form);
      onOpenChange(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Prompt" : "New Prompt"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {/* Title */}
          <div className="grid gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g. Contact Form"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="grid gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Short one-line description"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="grid gap-1.5">
            <Label>Category</Label>
            <Select
              value={form.category}
              onValueChange={(v) => set("category", v as Category)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image URL */}
          <div className="grid gap-1.5">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              placeholder="https://images.unsplash.com/..."
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
            />
          </div>

          {/* Prompt */}
          <div className="grid gap-1.5">
            <Label htmlFor="prompt">Prompt Text</Label>
            <Textarea
              id="prompt"
              placeholder="Write the full prompt here..."
              rows={6}
              value={form.prompt}
              onChange={(e) => set("prompt", e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : initialData ? "Save Changes" : "Create Prompt"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
