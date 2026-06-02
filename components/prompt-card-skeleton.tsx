"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function PromptCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/50 bg-card/50">
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>

      <CardContent className="p-4">
        {/* Badge skeleton */}
        <div className="mb-2">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        {/* Title skeleton */}
        <Skeleton className="mb-2 h-6 w-3/4" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 px-4 pb-4 pt-0">
        {/* Button skeletons */}
        <Skeleton className="h-9 flex-1 rounded-md" />
        <Skeleton className="size-9 rounded-md" />
      </CardFooter>
    </Card>
  );
}

export function PromptGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <PromptCardSkeleton key={i} />
      ))}
    </div>
  );
}
