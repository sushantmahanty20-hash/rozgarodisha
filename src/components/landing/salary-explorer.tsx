"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

const salaryData = [
  { role: "Software Developer", avg: "14L", min: "6L", max: "35L", growth: 12 },
  { role: "Data Scientist", avg: "18L", min: "8L", max: "40L", growth: 18 },
  { role: "Product Manager", avg: "20L", min: "10L", max: "45L", growth: 8 },
  { role: "UX Designer", avg: "12L", min: "5L", max: "28L", growth: 15 },
  { role: "DevOps Engineer", avg: "16L", min: "7L", max: "38L", growth: 22 },
  { role: "Marketing Manager", avg: "12L", min: "5L", max: "25L", growth: 6 },
]

export function SalaryExplorer() {
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ec4899]/20 bg-[#ec4899]/5 px-4 py-1.5 text-sm font-semibold text-[#ec4899] dark:border-[#f472b6]/20 dark:bg-[#f472b6]/10 dark:text-[#f472b6]">
            <TrendingUp className="h-3.5 w-3.5" />
            Salary Insights
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl dark:text-white">
            Know Your{" "}
            <span className="bg-gradient-to-r from-[#ec4899] to-[#7c3aed] bg-clip-text text-transparent">
              Market Worth
            </span>
          </h2>
          <p className="text-lg text-[#64748b] dark:text-gray-400">
            Salary data across top roles in India
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {salaryData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-white/10 dark:bg-[#111118]"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0f172a] dark:text-white">{item.role}</h3>
                <span className={`flex items-center gap-0.5 text-xs font-bold ${item.growth > 10 ? "text-[#10b981]" : "text-[#f59e0b]"}`}>
                  {item.growth > 10 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {item.growth}%
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#0f172a] dark:text-white">{item.avg}</span>
                <span className="text-xs text-[#94a3b8] dark:text-gray-500">avg/yr</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#f1f5f9] dark:bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${(parseInt(item.avg) / 45) * 100}%` } : {}}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#ec4899] to-[#7c3aed]"
                />
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-[#94a3b8] dark:text-gray-500">
                <span>{item.min} min</span>
                <span>{item.max} max</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
