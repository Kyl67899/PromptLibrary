import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { SaaSFooter } from "@/components/saas-footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Terms of Service - Prompt Library",
  description: "Read our terms of service for using Prompt Library.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            Legal
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last updated: May 31, 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Prompt Library (&quot;Service&quot;), you agree to be bound by these 
                Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not use 
                the Service.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">2. Description of Service</h2>
              <p>
                Prompt Library provides a curated collection of AI prompts designed for UI development 
                and vibe coding. The Service includes access to prompts, IDE integrations, and related 
                features as described on our website.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">3. User Accounts</h2>
              <ul className="ml-6 list-disc space-y-2">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You must notify us immediately of any unauthorized access</li>
                <li>You may not share your account credentials with others</li>
                <li>One person or entity may not maintain more than one free account</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">4. Acceptable Use</h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Use the Service for any illegal purpose</li>
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful code or malware</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with other users&apos; enjoyment of the Service</li>
                <li>Resell or redistribute our prompts without permission</li>
                <li>Scrape or collect data from our Service without consent</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">5. Intellectual Property</h2>
              <p className="mb-4">
                The prompts, website design, logos, and content are owned by Prompt Library and 
                protected by intellectual property laws. You may use prompts according to your 
                subscription plan:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong className="text-foreground">Free Plan:</strong> Personal and commercial use of generated code</li>
                <li><strong className="text-foreground">Pro Plan:</strong> Extended commercial rights and custom prompt creation</li>
                <li><strong className="text-foreground">Team Plan:</strong> Full commercial rights with team sharing capabilities</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">6. Payment and Subscriptions</h2>
              <ul className="ml-6 list-disc space-y-2">
                <li>Paid subscriptions are billed in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable except as required by law or stated in our refund policy</li>
                <li>We may change pricing with 30 days&apos; notice</li>
                <li>You can cancel your subscription at any time through your account settings</li>
                <li>Access continues until the end of your billing period</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">7. Refund Policy</h2>
              <p>
                We offer a 14-day money-back guarantee for first-time subscribers. If you&apos;re not 
                satisfied with your purchase, contact us within 14 days for a full refund. Refunds 
                are not available for renewals or after the 14-day period.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">8. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. 
                WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">9. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, PROMPT LIBRARY SHALL NOT BE LIABLE FOR ANY 
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR 
                USE OF THE SERVICE.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">10. Termination</h2>
              <p>
                We may terminate or suspend your account at any time for violations of these Terms 
                or for any other reason at our sole discretion. Upon termination, your right to use 
                the Service will immediately cease.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">11. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. We will notify you of significant changes via 
                email or through the Service. Continued use after changes constitutes acceptance of 
                the modified Terms.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">12. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of California, United States, 
                without regard to conflict of law provisions.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">13. Contact Information</h2>
              <p>
                For questions about these Terms, please contact us at{" "}
                <Link href="mailto:legal@promptlibrary.dev" className="text-accent hover:underline">
                  legal@promptlibrary.dev
                </Link>
              </p>
            </section>
          </div>
        </div>
      </main>

      <SaaSFooter />
    </div>
  );
}
