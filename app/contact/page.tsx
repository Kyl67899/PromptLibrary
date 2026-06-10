"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  CheckCircle
} from "lucide-react"
import Link from "next/link"
import { FaInstagram, FaFacebook } from "react-icons/fa6";
import { SaaSFooter } from "@/components/saas-footer"
import { PageHeader } from "@/components/page-header"

const contactInfo = [
  {
    icon: Phone,
    label: "Call Us",
    value: "(516) 760-1622",
    subValue: "Mon-Sat, 9am-8pm",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "shuttle876@gmail.com",
    subValue: "I reply within 24 hours",
  },
]

// const hours = [
//   { day: "Monday - Friday", hours: "9:00 AM - 8:00 PM" },
//   { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
//   { day: "Sunday", hours: "11:00 AM - 5:00 PM" },
// ]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitted(true)
    setIsLoading(false)
  }

  return (
    <>
      <PageHeader />
      <main className="pt-24">
        {/* Hero section */}
        <section className="py-16 bg-linear-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Contact Us
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Have questions or want to suggest a prompt?
              We&apos;d love to hear from you! Fill out the form below or reach me through our social media channels.
            </p>
          </div>
        </section>

        {/* Contact content */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact form */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-6">
                  Send Us a Message
                </h2>
                
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                          First Name
                        </label>
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          className="h-12 bg-secondary border-border focus:border-primary"
                          placeholder="Jane"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                          Last Name
                        </label>
                        <Input
                          id="lastName"
                          name="lastName"
                          required
                          className="h-12 bg-secondary border-border focus:border-primary"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="h-12 bg-secondary border-border focus:border-primary"
                        placeholder="jane@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone (Optional)
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="h-12 bg-secondary border-border focus:border-primary"
                        placeholder="(305) 555-0123"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        required
                        className="h-12 bg-secondary border-border focus:border-primary"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="bg-secondary border-border focus:border-primary resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="bg-secondary/30 rounded-2xl p-8 text-center border border-border">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-border hover:bg-secondary"
                    >
                      Send Another Message
                    </Button>
                  </div>
                )}
              </div>

              {/* Contact info */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    {contactInfo.map((item) => (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="shrink-0">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                            <item.icon className="h-5 w-5" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                          <p className="font-medium text-foreground">{item.value}</p>
                          <p className="text-sm text-muted-foreground">{item.subValue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hours */}
                {/* <div className="bg-secondary/30 rounded-2xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Business Hours</h3>
                  </div>
                  <div className="space-y-3">
                    {hours.map((item) => (
                      <div key={item.day} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.day}</span>
                        <span className="font-medium text-foreground">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* Social */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <Link
                      href="https://www.instagram.com/front_cs14"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary hover:bg-primary/10 text-foreground hover:text-primary transition-colors"
                    >
                      <FaInstagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </Link>
                    <Link
                      href="https://kylepprofile.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary hover:bg-primary/10 text-foreground hover:text-primary transition-colors"
                    >
                      <FaFacebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </Link>
                    <Link
                      href="https://www.tiktok.com/@front_cs14"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary hover:bg-primary/10 text-foreground hover:text-primary transition-colors"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                      <span className="sr-only">TikTok</span>
                    </Link>
                  </div>
                </div>

                {/* Quick booking CTA */}
                {/* <div className="bg-primary/10 rounded-2xl p-6">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    Ready to Book?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Skip the wait and book your appointment online 24/7.
                  </p>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link
                      href="https://www.glossgenius.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book Online Now
                    </Link>
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        {/* <section className="py-16 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="bg-foreground/5 rounded-3xl h-80 flex items-center justify-center border border-border">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">123 Sunshine Boulevard</p>
                <p className="text-muted-foreground">Miami, FL 33101</p>
                <Button asChild variant="outline" className="mt-4 border-border hover:bg-secondary">
                  <Link
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      <SaaSFooter />
    </>
  )
}