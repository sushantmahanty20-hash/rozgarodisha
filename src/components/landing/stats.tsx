"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, animate } from "framer-motion"
import { Briefcase, Building2, Users, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Jobs Posted", value: 25000, suffix: "+", icon: Briefcase, color: "from-blue-500 to-cyan-400" },
  { label: "Companies", value: 500, suffix: "+", icon: Building2, color: "from-violet-500 to-purple-400" },
  { label: "Candidates Placed", value: 18000, suffix: "+", icon: Users, color: "from-emerald-500 to-teal-400" },
  { label: "Success Rate", value: 95, suffix: "%", icon: Trophy, color: "from-orange-500 to-amber-400" },
]

function AnimatedCounter({ value, suffix, inView: isInView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, value])

  const formatted = value >= 1000 ? `${(display / 1000).toFixed(display >= 1000 ? 0 : 0)}K` : String(display)

  return (
    <span>
      {value >= 1000 ? `${(display / 1000).toFixed(0)}K` : display}{suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,primary/5,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group"
              >
                <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:bg-white/15 hover:shadow-2xl dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/8">
                  <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110", stat.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mb-1 text-3xl font-bold text-foreground md:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
