"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const articles = [
  {
    title: "How to Ace Your Technical Interview in 2026",
    excerpt: "Master the latest interview formats including AI-assisted coding rounds, system design, and behavioral assessments.",
    date: "Aug 12, 2026",
    author: "Jessica Park",
    category: "Interview Tips",
    color: "from-blue-500 to-purple-500",
  },
  {
    title: "Building a Personal Brand That Gets You Hired",
    excerpt: "Learn how to craft a compelling professional presence on LinkedIn, GitHub, and your personal portfolio.",
    date: "Aug 8, 2026",
    author: "Marcus Johnson",
    category: "Career Growth",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "The Future of Remote Work: Trends & Opportunities",
    excerpt: "Explore the evolving landscape of remote work and discover the skills that top remote employers are seeking.",
    date: "Aug 3, 2026",
    author: "Anika Patel",
    category: "Industry Trends",
    color: "from-orange-500 to-amber-500",
  },
]

export function CareerAdvice() {
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
            <BookOpen className="mr-1 h-3 w-3" />
            Blog
          </Badge>
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Career <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Advice</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Expert insights to accelerate your career growth
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group"
            >
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/15 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/8">
                <div className={cn("relative h-48 bg-gradient-to-br", article.color)}>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <BookOpen className="h-12 w-12 text-white/60" />
                  </div>
                  <Badge variant="secondary" size="sm" className="absolute left-4 top-4 bg-black/30 text-white backdrop-blur-sm border-0">
                    {article.category}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>

                  <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {article.date}
                    </span>
                  </div>

                  <button className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                    Read More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
