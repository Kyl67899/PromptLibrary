import { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles, Zap, Shield, Users, Globe, Code, Palette, Download, Cloud } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SaaSFooter } from "@/components/saas-footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Pricing - Prompt Library",
  description: "Choose the perfect plan for your vibe coding needs. Free, Pro, and Team plans available.",
};

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started with vibe coding",
    price: "$0",
    period: "forever",
    features: [
      "Access to 20+ UI prompts",
      "All 12 categories",
      "Copy to clipboard",
      "Basic IDE integrations",
      "Community support",
    ],
    notIncluded: [
      "Custom prompts",
      "Team collaboration",
      "Priority support",
      "API access",
    ],
    cta: "Get Started",
    ctaLink: "/",
    popular: false,
  },
  {
    name: "Pro",
    description: "For serious vibe coders who want more",
    price: "$12",
    period: "per month",
    features: [
      "Everything in Free",
      "100+ premium prompts",
      "Create custom prompts",
      "Advanced IDE integrations",
      "Prompt history & favorites",
      "Priority email support",
      "Early access to new prompts",
    ],
    notIncluded: [
      "Team collaboration",
      "API access",
    ],
    cta: "Start Free Trial",
    ctaLink: "#",
    popular: true,
  },
  {
    name: "Team",
    description: "For teams building products together",
    price: "$29",
    period: "per user/month",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Shared prompt library",
      "Team analytics",
      "Custom categories",
      "API access",
      "SSO & advanced security",
      "Dedicated support",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    ctaLink: "#",
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 14-day money-back guarantee. If you're not satisfied, contact us for a full refund.",
  },
  {
    question: "Can I switch plans later?",
    answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    question: "Is there a free trial for Pro?",
    answer: "Yes, Pro comes with a 7-day free trial. No credit card required to start.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4">
            Pricing
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Start free and upgrade as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mb-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative flex flex-col ${plan.popular ? "border-primary shadow-lg" : "bg-card/50"}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 opacity-50">
                      <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground line-through">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href={plan.ctaLink}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {faqs.map((faq) => (
                <Card key={faq.question} className="bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="border-0 bg-secondary/50">
            <CardContent className="py-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                Still have questions?
              </h2>
              <p className="mb-6 text-muted-foreground">
                Our team is here to help. Reach out anytime.
              </p>
              <Button asChild>
                <Link href="/help">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <SaaSFooter />
    </div>
  );
}
