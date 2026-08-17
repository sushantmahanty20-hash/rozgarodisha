"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Building2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const companies = [
  { name: "Google", industry: "Technology", jobs: 124, logo: "G", color: "from-blue-600 to-green-500" },
  { name: "Apple", industry: "Consumer Electronics", jobs: 89, logo: "A", color: "from-gray-700 to-gray-900" },
  { name: "Microsoft", industry: "Software", jobs: 156, logo: "M", color: "from-blue-500 to-cyan-400" },
  { name: "Amazon", industry: "E-commerce & Cloud", jobs: 203, logo: "Am", color: "from-orange-500 to-yellow-500" },
  { name: "Meta", industry: "Social Media", jobs: 67, logo: "Me", color: "from-blue-600 to-purple-600" },
  { name: "Netflix", industry: "Entertainment", jobs: 45, logo: "N", color: "from-red-600 to-red-800" },
  { name: "Spotify", industry: "Music & Audio", jobs: 38, logo: "Sp", color: "from-green-500 to-green-700" },
  { name: "Tesla", industry: "Automotive", jobs: 91, logo: "T", color: "from-red-500 to-red-700" },
  { name: "Airbnb", industry: "Hospitality", jobs: 52, logo: "Ab", color: "from-pink-500 to-rose-500" },
  { name: "Stripe", industry: "Fintech", jobs: 41, logo: "St", color: "from-indigo-500 to-purple-500" },
]

export function TopCompanies() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Top <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Companies</span> Hiring
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of professionals at world-class companies
          </p>
        </motion.div>

        <div className="relative">
          <div className="no-scrollbar flex gap-6 overflow-x-auto pb-4">
            {companies.map((company, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex-shrink-0"
              >
                <div className="flex h-full w-56 flex-col items-center rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/15 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/8">
                  <div className={cn("mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-bold text-white shadow-lg", company.color)}>
                    {company.logo}
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{company.name}</h3>
                  <p className="mb-3 text-xs text-muted-foreground">{company.industry}</p>
                  <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <Building2 className="h-3 w-3" />
                    {company.jobs} Jobs
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center"
        >
          <Button variant="glass" size="lg">
            View All Companies
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
