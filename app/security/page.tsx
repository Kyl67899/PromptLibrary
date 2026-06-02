import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Lock,
  Server,
  Eye,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Key,
  Globe,
  Clock,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SaaSFooter } from "@/components/saas-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Security - Prompt Library",
  description: "Learn about our security practices and how we protect your data at Prompt Library.",
};

const securityFeatures = [
  {
    icon: Lock,
    title: "Encryption",
    description: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.",
  },
  {
    icon: Key,
    title: "Authentication",
    description: "Secure authentication with password hashing, session management, and optional 2FA.",
  },
  {
    icon: Shield,
    title: "Rate Limiting",
    description: "API rate limiting prevents abuse and ensures fair usage for all users.",
  },
  {
    icon: Eye,
    title: "Input Validation",
    description: "All user inputs are sanitized and validated to prevent XSS and injection attacks.",
  },
  {
    icon: Server,
    title: "Infrastructure",
    description: "Hosted on Vercel with automatic DDoS protection and global edge network.",
  },
  {
    icon: Clock,
    title: "Monitoring",
    description: "24/7 monitoring and alerting for security events and anomalies.",
  },
];

const securityHeaders = [
  { header: "X-Content-Type-Options", value: "nosniff" },
  { header: "X-Frame-Options", value: "DENY" },
  { header: "X-XSS-Protection", value: "1; mode=block" },
  { header: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { header: "Content-Security-Policy", value: "Configured for strict security" },
  { header: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const compliance = [
  {
    title: "GDPR Compliant",
    description: "We comply with the General Data Protection Regulation for EU users.",
  },
  {
    title: "CCPA Compliant",
    description: "We comply with the California Consumer Privacy Act for California residents.",
  },
  {
    title: "SOC 2 Type II",
    description: "Our infrastructure provider maintains SOC 2 Type II certification.",
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4">
            Security
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Security at Prompt Library
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We take security seriously. Learn about the measures we take to protect your data 
            and ensure a safe experience.
          </p>
        </div>

        {/* Security Features */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-foreground">Security Features</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((feature) => (
              <Card key={feature.title} className="bg-card/50">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-emerald-500/10">
                    <feature.icon className="size-5 text-emerald-500" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Security Headers */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-foreground">Security Headers</h2>
          <Card className="bg-card/50">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Header
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Value
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {securityHeaders.map((item, index) => (
                      <tr
                        key={item.header}
                        className={index !== securityHeaders.length - 1 ? "border-b border-border" : ""}
                      >
                        <td className="px-6 py-4 font-mono text-sm text-foreground">
                          {item.header}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {item.value}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="border-emerald-500/50 text-emerald-500">
                            <CheckCircle className="mr-1 size-3" />
                            Enabled
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Compliance */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-foreground">Compliance</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {compliance.map((item) => (
              <Card key={item.title} className="bg-card/50">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                    <FileCheck className="size-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-foreground">Security Best Practices</h2>
          <Card className="bg-card/50">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">For Users</h3>
                  <ul className="ml-6 list-disc space-y-2 text-sm text-muted-foreground">
                    <li>Use a strong, unique password for your Prompt Library account</li>
                    <li>Enable two-factor authentication when available</li>
                    <li>Never share your account credentials with others</li>
                    <li>Log out from shared or public computers</li>
                    <li>Report any suspicious activity to our security team</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">For API Users</h3>
                  <ul className="ml-6 list-disc space-y-2 text-sm text-muted-foreground">
                    <li>Keep your API keys secure and never expose them in client-side code</li>
                    <li>Rotate API keys regularly</li>
                    <li>Use environment variables to store sensitive credentials</li>
                    <li>Implement proper error handling to avoid information disclosure</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Report Vulnerability */}
        <section>
          <Card className="border-0 bg-secondary/50">
            <CardContent className="py-12 text-center">
              <AlertTriangle className="mx-auto mb-4 size-12 text-amber-500" />
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                Report a Security Vulnerability
              </h2>
              <p className="mb-6 text-muted-foreground">
                Found a security issue? We appreciate responsible disclosure.
              </p>
              <Button asChild size="lg">
                <Link href="mailto:security@promptlibrary.dev">
                  <Shield className="mr-2 size-4" />
                  Contact Security Team
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <SaaSFooter />
    </div>
  );
}
