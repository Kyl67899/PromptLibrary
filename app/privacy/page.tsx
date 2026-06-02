import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { SaaSFooter } from "@/components/saas-footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Privacy Policy - Prompt Library",
  description: "Learn how Prompt Library collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            Legal
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: May 31, 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">1. Introduction</h2>
              <p>
                Prompt Library (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our website and services.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">2. Information We Collect</h2>
              <h3 className="mb-2 mt-4 font-medium text-foreground">Personal Information</h3>
              <p className="mb-4">When you create an account or subscribe to our services, we may collect:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Email address</li>
                <li>Name (optional)</li>
                <li>Payment information (processed securely by our payment provider)</li>
                <li>Account preferences and settings</li>
              </ul>

              <h3 className="mb-2 mt-4 font-medium text-foreground">Usage Information</h3>
              <p className="mb-4">We automatically collect certain information when you use our services:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>IP address</li>
                <li>Pages visited and features used</li>
                <li>Time and date of visits</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">4. Information Sharing</h2>
              <p className="mb-4">We do not sell your personal information. We may share information with:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Service providers who assist in operating our services</li>
                <li>Professional advisors (lawyers, accountants, etc.)</li>
                <li>Law enforcement when required by law</li>
                <li>Other parties in connection with a merger or acquisition</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. However, 
                no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">6. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">7. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to collect and track information about 
                your activities on our website. You can instruct your browser to refuse all cookies or 
                to indicate when a cookie is being sent.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">8. Children&apos;s Privacy</h2>
              <p>
                Our services are not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{" "}
                <Link href="mailto:privacy@promptlibrary.dev" className="text-accent hover:underline">
                  privacy@promptlibrary.dev
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
