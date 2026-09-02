"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Star, Zap, Bug, Shield } from "lucide-react";
import { changelogData } from "@/lib/changelog";
import { PageHeader } from "@/components/page-header";
import { SaaSFooter } from "@/components/saas-footer";

const typeConfig = {
  feature: {
    icon: Star,
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  improvement: {
    icon: Zap,
    className: "bg-green-100 text-green-800 border-green-200",
  },
  bugfix: {
    icon: Bug,
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  security: {
    icon: Shield,
    className: "bg-red-100 text-red-800 border-red-200",
  },
  default: {
    icon: Sparkles,
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
} as const;

const getType = (type: string) =>
  typeConfig[type as keyof typeof typeConfig] ?? typeConfig.default;

const ChangelogBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      <main className="container mx-auto px-4 py-10 sm:py-14">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Changelog
          </Badge>

          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            What&apos;s New
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Product updates, improvements, and fixes—written like a blog so you
            can quickly scan what changed.
          </p>
        </div>

        {/* Blog Feed */}
        <div className="max-w-3xl mx-auto space-y-8">
          {changelogData.map((entry, index) => {
            const type = getType(entry.type);
            const Icon = type.icon;

            return (
              <article key={entry.version}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="space-y-3">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-mono text-xs border px-2 py-0.5 rounded">
                        v{entry.version}
                      </span>

                      <span>•</span>
                      <span>{entry.date}</span>

                      {index === 0 && (
                        <>
                          <span>•</span>
                          <Badge className="bg-green-500 text-white text-[10px] px-1.5">
                            Latest
                          </Badge>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <CardTitle className="text-xl leading-snug">
                      {entry.title}
                    </CardTitle>

                    {/* Type + description */}
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className={type.className}>
                        <Icon className="w-4 h-4" />
                        <span className="ml-1 capitalize">{entry.type}</span>
                      </Badge>

                      <p className="text-sm text-muted-foreground">
                        {entry.description}
                      </p>
                    </div>
                  </CardHeader>

                  {/* Content */}
                  <CardContent className="space-y-3">
                    {(entry.items ?? []).map((item, i) => (
                      <div
                        key={i}
                        className="flex gap-3 p-3 rounded-lg border bg-muted/40"
                      >
                        <item.icon className="w-5 h-5 text-primary mt-0.5" />

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium text-sm">{item.title}</p>

                            {item.status && (
                              <Badge
                                className={
                                  item.status === "new"
                                    ? "bg-emerald-500 text-white text-[10px]"
                                    : item.status === "improved"
                                      ? "bg-blue-500 text-white text-[10px]"
                                      : "bg-orange-500 text-white text-[10px]"
                                }
                              >
                                {item.status}
                              </Badge>
                            )}
                          </div>

                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </article>
            );
          })}
        </div>
      </main>

      <SaaSFooter />
    </div>
  );
};

export default ChangelogBlog;
