"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { Prompt } from "@/lib/prompts-data";
import { copyToClipboard } from "@/lib/clipboard";

interface IDEShareMenuProps {
  prompt: Prompt;
}

export function IDEShareMenu({ prompt }: IDEShareMenuProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, type: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(type);
      
      if (type === "copilot") {
        toast.success("Copied to clipboard!", {
          description: "Ready to paste in GitHub Copilot",
          duration: 2000,
        });
      } else if (type === "markdown") {
        toast.success("Markdown copied!", {
          description: "Ready to paste in your editor",
          duration: 2000,
        });
      }
      
      setTimeout(() => setCopied(null), 2000);
    } else {
      toast.error("Failed to copy", {
        description: "Please try selecting and copying manually",
        duration: 3000,
      });
    }
  };

  const shareToV0 = () => {
    const text = `Create a component with: ${prompt.prompt}`;
    const encodedText = encodeURIComponent(text);
    toast.success("Opening v0.dev", {
      description: prompt.title,
      duration: 1500,
    });
    window.open(`https://v0.dev?prompt=${encodedText}`, "_blank");
  };

  const shareToCallClaude = () => {
    const text = `Create a component with: ${prompt.prompt}`;
    const encodedText = encodeURIComponent(text);
    toast.success("Opening Claude", {
      description: prompt.title,
      duration: 1500,
    });
    window.open(
      `https://claude.ai?message=${encodedText}`,
      "_blank"
    );
  };

  const shareToGithubCopilot = () => {
    handleCopy(prompt.prompt, "copilot");
  };

  const shareToPerplexity = () => {
    const text = `How to create: ${prompt.prompt}`;
    const encodedText = encodeURIComponent(text);
    toast.success("Opening Perplexity", {
      description: prompt.title,
      duration: 1500,
    });
    window.open(`https://www.perplexity.ai/?q=${encodedText}`, "_blank");
  };

  const formatForMarkdown = () => {
    const markdown = `# ${prompt.title}

**Category:** ${prompt.category}

**Description:** ${prompt.description}

## Prompt
\`\`\`
${prompt.prompt}
\`\`\``;
    handleCopy(markdown, "markdown");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 px-2">
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={shareToV0} className="cursor-pointer">
          <div className="flex flex-1 items-center justify-between">
            <span>Open in v0</span>
            <span className="text-xs text-muted-foreground">↗</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareToCallClaude} className="cursor-pointer">
          <div className="flex flex-1 items-center justify-between">
            <span>Open in Claude</span>
            <span className="text-xs text-muted-foreground">↗</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={shareToGithubCopilot}
          className="cursor-pointer"
        >
          <div className="flex flex-1 items-center justify-between">
            <span>
              {copied === "copilot" ? (
                <>
                  <Check className="mr-2 h-3 w-3 inline" />
                  Copied
                </>
              ) : (
                "GitHub Copilot"
              )}
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={shareToPerplexity}
          className="cursor-pointer"
        >
          <div className="flex flex-1 items-center justify-between">
            <span>Search in Perplexity</span>
            <span className="text-xs text-muted-foreground">↗</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={formatForMarkdown} className="cursor-pointer">
          <div className="flex flex-1 items-center justify-between">
            <span>
              {copied === "markdown" ? (
                <>
                  <Check className="mr-2 h-3 w-3 inline" />
                  Copied
                </>
              ) : (
                "Copy as Markdown"
              )}
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
