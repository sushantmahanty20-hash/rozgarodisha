"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Briefcase,
  Mail,
  MapPin,
  Phone,
  Globe,
  MessageCircle,
  Link2,
  Tv,
  Camera,
  Send,
  Apple,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  about: {
    title: "About",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Press & Media", href: "/press" },
      { label: "Contact Us", href: "/contact" },
      { label: "Partners", href: "/partners" },
    ],
  },
  jobSeekers: {
    title: "Job Seekers",
    items: [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Salary Calculator", href: "/salary" },
      { label: "Career Advice", href: "/advice" },
      { label: "Resume Builder", href: "/resume" },
      { label: "Job Alerts", href: "/jobs/alerts" },
      { label: "Application Tracker", href: "/dashboard/applications" },
    ],
  },
  employers: {
    title: "Employers",
    items: [
      { label: "Post a Job", href: "/employer/jobs/new" },
      { label: "Pricing", href: "/pricing" },
      { label: "Recruiting Solutions", href: "/solutions" },
      { label: "Employer Branding", href: "/branding" },
      { label: "Talent Search", href: "/employer/search" },
      { label: "ATS Integration", href: "/integrations" },
    ],
  },
  company: {
    title: "Company",
    items: [
      { label: "Help Center", href: "/help" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
}

const socialLinks = [
  { icon: MessageCircle, href: "https://twitter.com", label: "Twitter" },
  { icon: Link2, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Globe, href: "https://github.com", label: "GitHub" },
  { icon: Tv, href: "https://youtube.com", label: "YouTube" },
  { icon: Camera, href: "https://instagram.com", label: "Instagram" },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
}

function NewsletterForm() {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="h-11 w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-4 text-sm backdrop-blur-xl placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-white/5 dark:border-white/10"
          required
        />
      </div>
      <Button type="submit" variant="gradient" size="lg" className="shrink-0">
        {submitted ? "Subscribed!" : <><Send className="h-4 w-4" /> Subscribe</>}
      </Button>
    </form>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t bg-background">
      {/* Gradient top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Newsletter Section */}
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <div className="max-w-md text-center lg:text-left">
              <h3 className="text-xl font-bold">Stay ahead in your career</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get weekly job alerts, career tips, and industry insights delivered to your inbox.
              </p>
            </div>
            <div className="w-full max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-xl font-bold text-transparent">
                JobPortal
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Connecting talent with opportunity. Find your dream job or hire the best talent with
              our AI-powered platform.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>San Francisco, CA 94102</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:hello@jobportal.com" className="hover:text-foreground transition-colors">
                  hello@jobportal.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+14155550199" className="hover:text-foreground transition-colors">
                  +1 (415) 555-0199
                </a>
              </div>
            </div>

            {/* App Download */}
            <div className="mt-6 space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Download the app
              </p>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent">
                  <Apple className="h-4 w-4" />
                  <div className="text-left">
                    <p className="leading-none opacity-60">Download on the</p>
                    <p className="font-semibold">App Store</p>
                  </div>
                </button>
                <button className="flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent">
                  <Smartphone className="h-4 w-4" />
                  <div className="text-left">
                    <p className="leading-none opacity-60">Get it on</p>
                    <p className="font-semibold">Google Play</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {(Object.entries(footerLinks) as [keyof typeof footerLinks, { title: string; items: { label: string; href: string }[] }][]).map(
            ([key, section], i) => (
              <motion.div
                key={key}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <h4 className="text-sm font-semibold">{section.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <span className="relative">
                          {item.label}
                          <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
