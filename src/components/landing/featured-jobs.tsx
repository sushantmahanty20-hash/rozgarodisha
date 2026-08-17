"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, Clock, Bookmark, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const jobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    logo: "TC",
    location: "San Francisco, CA",
    salary: "$120K - $180K",
    tags: ["Remote", "Urgent"],
    posted: "2h ago",
    color: "from-blue-500 to-purple-500",
  },
  {
    title: "Product Designer",
    company: "DesignLab",
    logo: "DL",
    location: "New York, NY",
    salary: "$90K - $130K",
    tags: ["Hybrid"],
    posted: "5h ago",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "AI/ML Engineer",
    company: "NeuralTech",
    logo: "NT",
    location: "Remote",
    salary: "$150K - $220K",
    tags: ["Remote", "Hot"],
    posted: "1d ago",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "DevOps Lead",
    company: "CloudScale",
    logo: "CS",
    location: "Austin, TX",
    salary: "$140K - $190K",
    tags: ["On-site"],
    posted: "3h ago",
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Full Stack Developer",
    company: "StartupHub",
    logo: "SH",
    location: "Remote",
    salary: "$100K - $150K",
    tags: ["Remote"],
    posted: "12h ago",
    color: "from-violet-500 to-indigo-500",
  },
  {
    title: "UX Researcher",
    company: "UserFirst",
    logo: "UF",
    location: "Seattle, WA",
    salary: "$95K - $140K",
    tags: ["Hybrid", "Urgent"],
    posted: "6h ago",
    color: "from-cyan-500 to-blue-500",
  },
]

export function FeaturedJobs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <Badge variant="info" size="lg" className="mb-4">
            <Zap className="mr-1 h-3 w-3" />
            Trending
          </Badge>
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Featured <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Jobs</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hand-picked opportunities from top companies
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="group relative h-full rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:bg-white/15 hover:shadow-2xl hover:-translate-y-1 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/8">
                <div className="mb-4 flex items-start justify-between">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white shadow-lg", job.color)}>
                    {job.logo}
                  </div>
                  <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>

                <h3 className="mb-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {job.title}
                </h3>
                <p className="mb-3 text-sm font-medium text-muted-foreground">{job.company}</p>

                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {job.posted}
                  </span>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={tag === "Urgent" || tag === "Hot" ? "destructive" : tag === "Remote" ? "success" : "secondary"}
                      size="sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <p className="text-sm font-semibold text-foreground">{job.salary}</p>
                  <Button variant="ghost" size="sm" className="group/btn">
                    Apply
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Button variant="gradient" size="lg">
            View All Jobs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
