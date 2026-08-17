"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { DollarSign, TrendingUp, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const salaryData = [
  { range: "$40K-$60K", min: 40, max: 60, count: 1200, percentage: 30 },
  { range: "$60K-$80K", min: 60, max: 80, count: 2400, percentage: 55 },
  { range: "$80K-$100K", min: 80, max: 100, count: 3600, percentage: 80 },
  { range: "$100K-$120K", min: 100, max: 120, count: 2800, percentage: 65 },
  { range: "$120K-$150K", min: 120, max: 150, count: 1800, percentage: 45 },
  { range: "$150K+", min: 150, max: 200, count: 900, percentage: 25 },
]

export function SalaryExplorer() {
  const [searchTitle, setSearchTitle] = useState("")
  const [searchLocation, setSearchLocation] = useState("")
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
            Salary <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Explorer</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Know your worth before you apply
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-2xl dark:bg-white/5 dark:border-white/10">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-xl bg-white/60 px-4 py-3 dark:bg-white/10">
                <BarChart3 className="h-5 w-5 shrink-0 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Job title (e.g., Software Engineer)"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <div className="flex flex-1 items-center gap-2 rounded-xl bg-white/60 px-4 py-3 dark:bg-white/10">
                <TrendingUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <Button size="lg">
                <DollarSign className="h-4 w-4" />
                Explore
              </Button>
            </div>

            <div className="space-y-4">
              {salaryData.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-4"
                >
                  <span className="w-24 flex-shrink-0 text-sm font-medium text-foreground">{item.range}</span>
                  <div className="flex-1">
                    <div className="h-8 overflow-hidden rounded-lg bg-white/10 dark:bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${item.percentage}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                        className="flex h-full items-center justify-end rounded-lg bg-gradient-to-r from-primary to-accent px-3"
                      >
                        <span className="text-xs font-semibold text-white">{item.count.toLocaleString()} jobs</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">$95K</p>
                <p className="text-xs text-muted-foreground">Average Salary</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">$55K</p>
                <p className="text-xs text-muted-foreground">Minimum</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">$185K</p>
                <p className="text-xs text-muted-foreground">Maximum</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
