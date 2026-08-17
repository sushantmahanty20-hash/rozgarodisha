"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Search, MapPin, Briefcase, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const floatingCards = [
  { title: "Senior React Developer", company: "Google", x: "10%", y: "20%", delay: 0 },
  { title: "Product Designer", company: "Apple", x: "80%", y: "15%", delay: 0.5 },
  { title: "Data Scientist", company: "Meta", x: "75%", y: "70%", delay: 1 },
  { title: "DevOps Engineer", company: "Amazon", x: "15%", y: "75%", delay: 1.5 },
]

const stats = [
  { label: "Active Jobs", value: "10K+" },
  { label: "Companies", value: "500+" },
  { label: "Candidates", value: "50K+" },
]

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationQuery, setLocationQuery] = useState("")
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,primary/10,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,accent/10,transparent_50%)]" />

      {floatingCards.map((card, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute hidden xl:block"
          style={{ left: card.x, top: card.y }}
          animate={{ y: [0, -15, 0], rotate: [0, i % 2 === 0 ? 2 : -2, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: card.delay, ease: "easeInOut" }}
        >
          <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-xl shadow-xl dark:bg-white/5 dark:border-white/10">
            <p className="text-sm font-semibold text-foreground">{card.title}</p>
            <p className="text-xs text-muted-foreground">{card.company}</p>
          </div>
        </motion.div>
      ))}

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Job Matching
          </motion.div>

          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Find Your Dream Job
            </span>
            <br />
            <span className="text-foreground">with AI</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Our intelligent platform matches you with perfect opportunities using advanced AI algorithms. Get personalized recommendations tailored to your skills.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mb-8 flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl shadow-2xl dark:bg-white/5 dark:border-white/10 sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-white/60 px-4 py-3 dark:bg-white/10">
              <Briefcase className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-white/60 px-4 py-3 dark:bg-white/10">
              <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Location"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <Button size="lg" className="rounded-xl px-8">
              <Search className="h-4 w-4" />
              Search Jobs
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12 flex flex-wrap items-center justify-center gap-6"
          >
            <Button variant="gradient" size="lg">
              Find Jobs
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="glass" size="lg">
              Post a Job
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  )
}
