"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Code2,
  Palette,
  Megaphone,
  DollarSign,
  HeartPulse,
  Wrench,
  TrendingUp,
  GraduationCap,
  Scale,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { name: "IT & Technology", icon: Code2, jobs: 2340, color: "from-blue-500 to-cyan-400" },
  { name: "Design & Creative", icon: Palette, jobs: 890, color: "from-pink-500 to-rose-400" },
  { name: "Marketing", icon: Megaphone, jobs: 1120, color: "from-orange-500 to-amber-400" },
  { name: "Finance", icon: DollarSign, jobs: 980, color: "from-emerald-500 to-green-400" },
  { name: "Healthcare", icon: HeartPulse, jobs: 1560, color: "from-red-500 to-pink-400" },
  { name: "Engineering", icon: Wrench, jobs: 1870, color: "from-violet-500 to-purple-400" },
  { name: "Sales", icon: TrendingUp, jobs: 1340, color: "from-teal-500 to-emerald-400" },
  { name: "Education", icon: GraduationCap, jobs: 760, color: "from-indigo-500 to-blue-400" },
  { name: "Legal", icon: Scale, jobs: 430, color: "from-gray-500 to-slate-400" },
  { name: "Human Resources", icon: Users, jobs: 680, color: "from-fuchsia-500 to-pink-400" },
]

export function JobCategories() {
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
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Explore <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Browse opportunities across various industries
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.map((category, i) => {
            const Icon = category.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group"
              >
                <div className="flex h-full flex-col items-center rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white/15 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/8">
                  <div className={cn("mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110", category.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 text-center text-sm font-semibold text-foreground">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.jobs.toLocaleString()} jobs</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
