"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  Monitor,
  TrendingUp,
  Heart,
  Megaphone,
  DollarSign,
  Wrench,
  Palette,
  Users,
  GraduationCap,
  Building,
  Truck,
  Headphones,
} from "lucide-react"

const categories = [
  { name: "Technology", icon: Monitor, jobs: 4820, slug: "technology", color: "from-[#2563eb] to-[#3b82f6]" },
  { name: "Finance", icon: TrendingUp, jobs: 1680, slug: "finance", color: "from-[#10b981] to-[#34d399]" },
  { name: "Healthcare", icon: Heart, jobs: 2140, slug: "healthcare", color: "from-[#ef4444] to-[#f87171]" },
  { name: "Marketing", icon: Megaphone, jobs: 1950, slug: "marketing", color: "from-[#f59e0b] to-[#fbbf24]" },
  { name: "Sales", icon: DollarSign, jobs: 1520, slug: "sales", color: "from-[#06b6d4] to-[#22d3ee]" },
  { name: "Engineering", icon: Wrench, jobs: 2890, slug: "engineering", color: "from-[#7c3aed] to-[#a855f7]" },
  { name: "Design", icon: Palette, jobs: 1230, slug: "design", color: "from-[#ec4899] to-[#f472b6]" },
  { name: "Human Resources", icon: Users, jobs: 870, slug: "human-resources", color: "from-[#8b5cf6] to-[#a78bfa]" },
  { name: "Education", icon: GraduationCap, jobs: 1120, slug: "education", color: "from-[#14b8a6] to-[#5eead4]" },
  { name: "Construction", icon: Building, jobs: 980, slug: "construction", color: "from-[#78716c] to-[#a8a29e]" },
  { name: "Logistics", icon: Truck, jobs: 1340, slug: "logistics", color: "from-[#f97316] to-[#fb923c]" },
  { name: "Customer Service", icon: Headphones, jobs: 760, slug: "customer-service", color: "from-[#6366f1] to-[#818cf8]" },
]

export function JobCategories() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 bg-white dark:bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/20 bg-[#7c3aed]/5 px-4 py-1.5 text-sm font-semibold text-[#7c3aed] dark:border-[#a78bfa]/20 dark:bg-[#a78bfa]/10 dark:text-[#a78bfa]">
            Categories
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl dark:text-white">
            Explore <span className="bg-gradient-to-r from-[#7c3aed] to-[#ec4899] bg-clip-text text-transparent">Job Categories</span>
          </h2>
          <p className="text-lg text-[#64748b] dark:text-gray-400">
            Browse opportunities across various industries
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category, i) => {
            const Icon = category.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/jobs?category=${category.slug}`}>
                  <div className="group flex h-full flex-col items-center rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#2563eb]/20 dark:border-white/10 dark:bg-[#111118] dark:hover:border-[#818cf8]/20 dark:hover:bg-[#161625]">
                    <div
                      className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-1 text-center text-sm font-bold text-[#0f172a] dark:text-white">
                      {category.name}
                    </h3>
                    <p className="text-xs font-medium text-[#94a3b8] dark:text-gray-500">
                      {category.jobs.toLocaleString()} jobs
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
