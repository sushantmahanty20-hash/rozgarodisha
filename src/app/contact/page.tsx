import { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Twitter,
  Linkedin,
  Github,
  Facebook,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the JobSphere team. We'd love to hear from you.",
};

const contactInfo = [
  {
    title: "Email",
    value: "support@jobsphere.com",
    icon: Mail,
    href: "mailto:support@jobsphere.com",
  },
  {
    title: "Phone",
    value: "+1 (555) 123-4567",
    icon: Phone,
    href: "tel:+15551234567",
  },
  {
    title: "Office",
    value: "123 Tech Street, San Francisco, CA 94105",
    icon: MapPin,
    href: null,
  },
  {
    title: "Hours",
    value: "Mon - Fri, 9:00 AM - 6:00 PM PST",
    icon: Clock,
    href: null,
  },
];

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/jobsphere" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/jobsphere" },
  { name: "GitHub", icon: Github, href: "https://github.com/jobsphere" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/jobsphere" },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        {/* Hero */}
        <div className="border-b bg-background py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Badge variant="secondary" className="mb-4">
              Contact
            </Badge>
            <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
              Get in touch
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a question or feedback? We&apos;d love to hear from you.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <h2 className="font-display text-xl font-bold">Send us a message</h2>
                <form className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="mt-1.5 flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="mt-1.5 flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      className="mt-1.5 flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us more..."
                      className="mt-1.5 flex w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold">Contact Information</h2>
                  <div className="mt-6 space-y-4">
                    {contactInfo.map((info) => (
                      <div key={info.title} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <info.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{info.title}</p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-sm text-muted-foreground hover:text-primary hover:underline"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold">Follow Us</h2>
                  <div className="mt-4 flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background transition-colors hover:bg-muted"
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex h-48 items-center justify-center rounded-xl bg-gradient-to-br from-primary/5 to-primary/10">
                    <div className="text-center">
                      <MapPin className="mx-auto h-8 w-8 text-primary/40" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Interactive map coming soon
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
