"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Prompt } from "@/lib/prompts-data";
import { cn } from "@/lib/utils";
import { IDEShareMenu } from "@/components/ide-share-menu";
import { copyToClipboard } from "@/lib/clipboard";

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(prompt.prompt);
    if (success) {
      setCopied(true);
      toast.success("Prompt copied to clipboard!", {
        description: prompt.title,
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Failed to copy", {
        description: "Please try selecting and copying manually",
        duration: 3000,
      });
    }
  };

  return (
    <Card className="group overflow-hidden bg-card border-border hover:border-accent/50 transition-colors">
      {/* Image Container with Lazy Loading - showcases UI component preview */}
      <div className="relative aspect-4/3 overflow-hidden bg-secondary">
        <div
          className={cn(
            "absolute inset-0 bg-secondary animate-pulse",
            imageLoaded && "hidden"
          )}
        />
        <Image
          src={prompt.image}
          alt={prompt.title}
          fill
          className={cn(
            "object-cover transition-all duration-300 group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Quick Copy Button on Hover */}
        <Button
          size="sm"
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="mr-1 h-3 w-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="mr-1 h-3 w-3" />
              Copy
            </>
          )}
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs capitalize">
            {prompt.category}
          </Badge>
        </div>
        <h3 className="font-semibold text-card-foreground mb-1 text-balance">
          {prompt.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {prompt.description}
        </p>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy Prompt
            </>
          )}
        </Button>
        <IDEShareMenu prompt={prompt} />
      </CardFooter>
    </Card>
  );
}
