"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Search, MapPin, Briefcase, Sparkles, TrendingUp, Shield, Zap, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const floatingJobCards = [
  { title: "Senior React Developer", company: "TechNova", match: "94%", x: "5%", y: "18%", delay: 0, color: "from-[#2563eb] to-[#3b82f6]" },
  { title: "Product Manager", company: "FinEdge", match: "89%", x: "78%", y: "12%", delay: 0.5, color: "from-[#7c3aed] to-[#a855f7]" },
  { title: "UX Designer", company: "Vertex Labs", match: "91%", x: "82%", y: "62%", delay: 1, color: "from-[#06b6d4] to-[#22d3ee]" },
  { title: "Data Scientist", company: "CloudCore", match: "87%", x: "8%", y: "68%", delay: 1.5, color: "from-[#10b981] to-[#34d399]" },
  { title: "DevOps Engineer", company: "Nova Systems", match: "92%", x: "50%", y: "8%", delay: 2, color: "from-[#f59e0b] to-[#fbbf24]" },
]

const quickStats = [
  { icon: Briefcase, label: "Active Jobs", value: "15,000+" },
  { icon: Star, label: "Companies", value: "500+" },
  { icon: Users, label: "Candidates", value: "85,000+" },
  { icon: TrendingUp, label: "Successful Hires", value: "25,000+" },
]

const popularSearches = [
  "Software Developer",
  "Data Analyst",
  "Digital Marketing",
  "UI/UX Designer",
  "Project Manager",
  "HR Manager",
  "Remote Jobs",
  "Internships",
]

function HeroVisual() {
  return (
    <div className="relative hidden h-[500px] w-full lg:block xl:h-[560px]">
      {/* Orbital rings */}
      <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2563eb]/10 dark:border-[#818cf8]/10">
        <div className="absolute inset-4 rounded-full border border-[#2563eb]/8 dark:border-[#818cf8]/8">
          <div className="absolute inset-4 rounded-full border border-[#2563eb]/5 dark:border-[#818cf8]/5" />
        </div>
      </div>

      {/* Center 3D element - glass sphere */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-[#2563eb]/20 to-[#7c3aed]/20 backdrop-blur-xl dark:from-[#818cf8]/20 dark:to-[#a78bfa]/20" style={{
          boxShadow: "0 0 60px rgba(37,99,235,0.15), inset 0 0 30px rgba(37,99,235,0.1)"
        }}>
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white/40 to-white/10 dark:from-white/20 dark:to-white/5 backdrop-blur-sm border border-white/30 dark:border-white/15" />
        </div>
      </motion.div>

      {/* Floating job cards */}
      {floatingJobCards.map((card, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: card.x, top: card.y }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, i % 2 === 0 ? 1.5 : -1.5, 0],
          }}
          transition={{ duration: 5 + i * 0.5, repeat: Infinity, delay: card.delay, ease: "easeInOut" }}
        >
          <div className="rounded-xl border border-[#e2e8f0] bg-white/90 px-4 py-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#111118]/90">
            <div className="flex items-center gap-3">
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white text-xs font-bold", card.color)}>
                {card.company[0]}
              </div>
              <div>
                <p className="text-xs font-bold text-[#0f172a] dark:text-white">{card.title}</p>
                <p className="text-[10px] text-[#64748b] dark:text-gray-400">{card.company}</p>
              </div>
              <div className="ml-2 rounded-full bg-[#10b981]/10 px-2 py-0.5 text-[10px] font-bold text-[#10b981]">
                {card.match}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Floating notification cards */}
      <motion.div
        className="absolute right-0 top-[40%]"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      >
        <div className="rounded-xl border border-[#e2e8f0] bg-white/90 px-3 py-2.5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#111118]/90">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#10b981]/10">
              <Sparkles className="h-3.5 w-3.5 text-[#10b981]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#0f172a] dark:text-white">New Job Match</p>
              <p className="text-[9px] text-[#64748b] dark:text-gray-400">92% match found!</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute left-0 top-[35%]"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      >
        <div className="rounded-xl border border-[#e2e8f0] bg-white/90 px-3 py-2.5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#111118]/90">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2563eb]/10">
              <Shield className="h-3.5 w-3.5 text-[#2563eb]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#0f172a] dark:text-white">Profile Viewed</p>
              <p className="text-[9px] text-[#64748b] dark:text-gray-400">8 recruiters this week</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute h-1 w-1 rounded-full bg-[#2563eb]/30 dark:bg-[#818cf8]/30"
          style={{
            left: `${15 + i * 10}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  )
}

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationQuery, setLocationQuery] = useState("")
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e0f2fe] dark:from-[#0a0a0f] dark:via-[#0d1117] dark:to-[#0a0f1a]">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(129,140,248,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(124,58,237,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(167,139,250,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563eb]/20 bg-[#2563eb]/5 px-4 py-2 text-sm font-semibold text-[#2563eb] backdrop-blur-sm dark:border-[#818cf8]/20 dark:bg-[#818cf8]/10 dark:text-[#818cf8]"
            >
              <Zap className="h-4 w-4" />
              AI-Powered Career Marketplace
            </motion.div>

            {/* Headline */}
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0f172a] sm:text-5xl lg:text-6xl dark:text-white">
              Find the Right Job.{" "}
              <span className="bg-gradient-to-r from-[#2563eb] via-[#7c3aed] to-[#06b6d4] bg-clip-text text-transparent">
                Build the Right Future.
              </span>
            </h1>

            <p className="mb-8 max-w-lg text-lg leading-relaxed text-[#64748b] dark:text-gray-400">
              Discover opportunities, connect with top employers and accelerate your career through a smarter, faster and more personalized job marketplace.
            </p>

            {/* Search Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6 rounded-2xl border border-[#e2e8f0] bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#111118]"
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-xl bg-[#f8fafc] px-4 py-3 dark:bg-white/5">
                  <Briefcase className="h-5 w-5 shrink-0 text-[#64748b] dark:text-gray-400" />
                  <input
                    type="text"
                    placeholder="Job title, skill, company or keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm font-medium text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none dark:text-white dark:placeholder:text-gray-500"
                  />
                </div>
                <div className="flex flex-1 items-center gap-3 rounded-xl bg-[#f8fafc] px-4 py-3 dark:bg-white/5">
                  <MapPin className="h-5 w-5 shrink-0 text-[#64748b] dark:text-gray-400" />
                  <input
                    type="text"
                    placeholder="City, state, country or remote"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm font-medium text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none dark:text-white dark:placeholder:text-gray-500"
                  />
                </div>
                <Link href={`/jobs?q=${encodeURIComponent(searchQuery)}&loc=${encodeURIComponent(locationQuery)}`}>
                  <Button className="w-full rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#2563eb]/25 transition-all hover:shadow-xl hover:shadow-[#2563eb]/30 sm:w-auto">
                    <Search className="h-4 w-4" />
                    Search Jobs
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Popular Searches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-10"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#94a3b8] dark:text-gray-500">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <Link
                    key={term}
                    href={`/jobs?q=${encodeURIComponent(term)}`}
                    className="rounded-full border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs font-medium text-[#64748b] transition-all hover:border-[#2563eb]/30 hover:text-[#2563eb] hover:shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:border-[#818cf8]/30 dark:hover:text-[#818cf8]"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {quickStats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563eb]/10 dark:bg-[#818cf8]/10">
                    <stat.icon className="h-4 w-4 text-[#2563eb] dark:text-[#818cf8]" />
                  </div>
                  <p className="text-lg font-extrabold text-[#0f172a] dark:text-white">{stat.value}</p>
                  <p className="text-[11px] font-medium text-[#94a3b8] dark:text-gray-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563eb]/20 to-transparent dark:via-[#818cf8]/20" />
    </section>
  )
}
