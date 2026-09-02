"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { Copy, Check, Heart } from "lucide-react";
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
  isFavorited?: boolean;
  onFavoriteToggle?: (promptId: string) => void;
}

function PromptCardComponent({ 
  prompt, 
  isFavorited = false,
  onFavoriteToggle 
}: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isFavorited);

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

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    onFavoriteToggle?.(prompt.id);
    toast.success(
      !isFavorite ? "Added to favorites!" : "Removed from favorites",
      {
        duration: 1500,
      }
    );
  };

  return (
    <Card className="group overflow-hidden bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-md animate-in fade-in">
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
        
        {/* Favorite Button */}
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity",
            isFavorite && "opacity-100"
          )}
          onClick={handleFavoriteToggle}
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-all",
              isFavorite && "fill-red-500 text-red-500"
            )}
          />
        </Button>
        
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
        <div className="mb-3 flex items-center justify-between gap-2">
          <Badge variant="secondary" className="text-xs capitalize">
            {prompt.category}
          </Badge>
          {isFavorite && (
            <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
              Favorite
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-card-foreground mb-1 text-balance line-clamp-2">
          {prompt.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {prompt.description}
        </p>
        
        {/* Tags */}
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {prompt.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs bg-background text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
            {prompt.tags.length > 3 && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                +{prompt.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
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

export const PromptCard = memo(PromptCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.prompt.id === nextProps.prompt.id &&
    prevProps.isFavorited === nextProps.isFavorited
  );
});
