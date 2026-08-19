"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, animate } from "framer-motion"
import { Briefcase, Building2, Users, Trophy } from "lucide-react"

const stats = [
  { label: "Active Jobs", value: 150000, suffix: "+", icon: Briefcase, color: "from-[#2563eb] to-[#3b82f6]" },
  { label: "Job Seekers", value: 50000, suffix: "+", icon: Users, color: "from-[#7c3aed] to-[#a855f7]" },
  { label: "Companies", value: 10000, suffix: "+", icon: Building2, color: "from-[#06b6d4] to-[#22d3ee]" },
  { label: "Successful Hires", value: 25000, suffix: "+", icon: Trophy, color: "from-[#10b981] to-[#34d399]" },
]

function AnimatedCounter({
  value,
  suffix,
  inView: isInView,
}: {
  value: number
  suffix: string
  inView: boolean
}) {
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

  return (
    <span>
      {value >= 1000 ? `${Math.floor(display / 1000)}K` : display}
      {suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 bg-[#0f172a] dark:bg-[#050510]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(124,58,237,0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/8 hover:shadow-2xl">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mb-1 text-3xl font-extrabold text-white md:text-4xl">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      inView={inView}
                    />
                  </p>
                  <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
