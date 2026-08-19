"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Briefcase,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  candidates: {
    title: "For Candidates",
    items: [
      { label: "Find Jobs", href: "/jobs" },
      { label: "Saved Jobs", href: "/job-seeker/saved-jobs" },
      { label: "Resume Builder", href: "/job-seeker/resume" },
      { label: "Job Alerts", href: "/jobs" },
      { label: "Career Advice", href: "/blog" },
      { label: "Salary Guide", href: "/blog" },
    ],
  },
  employers: {
    title: "For Employers",
    items: [
      { label: "Post a Job", href: "/employer/jobs/new" },
      { label: "Find Candidates", href: "/candidates" },
      { label: "Resume Database", href: "/candidates" },
      { label: "Pricing Plans", href: "/pricing" },
      { label: "Employer Dashboard", href: "/employer" },
      { label: "Hiring Resources", href: "/blog" },
    ],
  },
  resources: {
    title: "Resources",
    items: [
      { label: "Career Advice", href: "/blog" },
      { label: "Interview Tips", href: "/blog" },
      { label: "Resume Tips", href: "/blog" },
      { label: "Blog", href: "/blog" },
      { label: "Success Stories", href: "/about" },
      { label: "Help Center", href: "/contact" },
    ],
  },
  company: {
    title: "Company",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

const socialLinks = [
  { icon: TwitterIcon, href: "https://twitter.com/jobportal", label: "Twitter" },
  { icon: LinkedinIcon, href: "https://linkedin.com/company/jobportal", label: "LinkedIn" },
  { icon: YoutubeIcon, href: "https://youtube.com/jobportal", label: "YouTube" },
  { icon: InstagramIcon, href: "https://instagram.com/jobportal", label: "Instagram" },
]

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
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="h-11 w-full rounded-xl border border-[#e2e8f0] bg-white pl-10 pr-4 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 dark:border-white/10 dark:bg-[#111118] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-[#818cf8]"
          required
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="shrink-0 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white"
      >
        {submitted ? (
          "Subscribed!"
        ) : (
          <>
            <Send className="h-4 w-4" /> Subscribe
          </>
        )}
      </Button>
    </form>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t border-[#e2e8f0] bg-white dark:border-white/10 dark:bg-[#0a0a0f]">
      {/* Gradient top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2563eb]/50 to-transparent dark:via-[#818cf8]/50" />

      {/* Newsletter Section */}
      <div className="border-b border-[#e2e8f0] dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <div className="max-w-md text-center lg:text-left">
              <h3 className="text-xl font-bold text-[#0f172a] dark:text-white">
                Stay ahead in your career
              </h3>
              <p className="mt-1 text-sm text-[#64748b] dark:text-gray-400">
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
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] to-[#7c3aed] shadow-lg shadow-[#2563eb]/25">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-[#0f172a] dark:text-white">
                Job<span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">Portal</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#64748b] dark:text-gray-400">
              Connecting talent with opportunity. Find your dream job or hire the best talent with our AI-powered career marketplace.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-sm text-[#64748b] dark:text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:support@jobportal.com" className="hover:text-[#2563eb] transition-colors dark:hover:text-[#818cf8]">
                  support@jobportal.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+918045678900" className="hover:text-[#2563eb] transition-colors dark:hover:text-[#818cf8]">
                  +91 80 4567 8900
                </a>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-sm font-bold text-[#0f172a] dark:text-white">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {section.items.map((item) => (
                  <li key={`${item.href}-${item.label}`}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-sm text-[#64748b] transition-colors hover:text-[#2563eb] dark:text-gray-400 dark:hover:text-[#818cf8]"
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#2563eb] transition-transform duration-200 group-hover:scale-x-100 dark:bg-[#818cf8]" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e2e8f0] dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p className="text-xs text-[#94a3b8] dark:text-gray-500">
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
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#94a3b8] transition-colors duration-200 hover:bg-[#f1f5f9] hover:text-[#2563eb] dark:text-gray-500 dark:hover:bg-white/5 dark:hover:text-[#818cf8]"
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
