"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Clock, ArrowRight } from "lucide-react"

const articles = [
  {
    title: "How to Build a Professional Resume That Gets Interviews",
    excerpt: "Learn the art of crafting a resume that stands out to recruiters and passes through ATS systems.",
    author: "JobPortal Team",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    category: "Resume Tips",
    slug: "how-to-build-professional-resume",
  },
  {
    title: "Top 10 In-Demand Tech Skills for 2026",
    excerpt: "Discover the most sought-after technical skills that employers are looking for this year.",
    author: "JobPortal Team",
    date: "Feb 1, 2026",
    readTime: "7 min read",
    category: "Career Growth",
    slug: "top-in-demand-tech-skills-2026",
  },
  {
    title: "Ace Your Next Technical Interview: A Complete Guide",
    excerpt: "Master the art of technical interviews with our comprehensive preparation strategy.",
    author: "JobPortal Team",
    date: "Feb 15, 2026",
    readTime: "8 min read",
    category: "Interview Prep",
    slug: "ace-technical-interview-guide",
  },
]

export function CareerAdvice() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 bg-[#f8fafc] dark:bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#10b981]/20 bg-[#10b981]/5 px-4 py-1.5 text-sm font-semibold text-[#10b981] dark:border-[#34d399]/20 dark:bg-[#34d399]/10 dark:text-[#34d399]">
            Career Advice
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl dark:text-white">
            Latest{" "}
            <span className="bg-gradient-to-r from-[#10b981] to-[#06b6d4] bg-clip-text text-transparent">
              Career Insights
            </span>
          </h2>
          <p className="text-lg text-[#64748b] dark:text-gray-400">
            Expert advice to help you grow your career
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link href={`/blog/${article.slug}`}>
                <div className="group flex h-full flex-col rounded-2xl border border-[#e2e8f0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#111118]">
                  <div className="h-48 rounded-t-2xl bg-gradient-to-br from-[#10b981]/10 to-[#06b6d4]/10 dark:from-[#10b981]/5 dark:to-[#06b6d4]/5 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#10b981] to-[#06b6d4] text-white shadow-lg">
                      <span className="text-2xl font-bold">{article.category[0]}</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3">
                      <span className="rounded-full bg-[#10b981]/10 px-2.5 py-1 text-[10px] font-bold text-[#10b981] dark:bg-[#10b981]/20 dark:text-[#34d399]">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-bold text-[#0f172a] transition-colors group-hover:text-[#2563eb] dark:text-white dark:group-hover:text-[#818cf8]">
                      {article.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm text-[#64748b] dark:text-gray-400">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#94a3b8] dark:text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-[#2563eb] transition-all group-hover:gap-2 dark:text-[#818cf8]">
                        Read More
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
