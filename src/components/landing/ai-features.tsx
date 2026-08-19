"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Sparkles, Target, BarChart3, Zap } from "lucide-react"

const features = [
  {
    title: "Smart Job Matching",
    description: "Our AI analyzes your skills, experience, and preferences to match you with the most relevant opportunities.",
    icon: Target,
    color: "from-[#2563eb] to-[#3b82f6]",
  },
  {
    title: "Resume Score",
    description: "Get instant feedback on your resume with AI-powered scoring and actionable improvement suggestions.",
    icon: BarChart3,
    color: "from-[#7c3aed] to-[#a855f7]",
  },
  {
    title: "Skill Gap Analysis",
    description: "Identify skills you need to develop for your target role and get personalized learning recommendations.",
    icon: Sparkles,
    color: "from-[#10b981] to-[#34d399]",
  },
  {
    title: "Career Insights",
    description: "Access real-time market data on salary ranges, in-demand skills, and hiring trends across industries.",
    icon: Zap,
    color: "from-[#f59e0b] to-[#fbbf24]",
  },
]

export function AiFeatures() {
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/20 bg-[#7c3aed]/5 px-4 py-1.5 text-sm font-semibold text-[#7c3aed] dark:border-[#a78bfa]/20 dark:bg-[#a78bfa]/10 dark:text-[#a78bfa]">
            <Sparkles className="h-3.5 w-3.5" />
            AI Powered
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl dark:text-white">
            Intelligent{" "}
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#2563eb] bg-clip-text text-transparent">
              Career Tools
            </span>
          </h2>
          <p className="text-lg text-[#64748b] dark:text-gray-400">
            AI-powered features to accelerate your career growth
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#111118]"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-base font-bold text-[#0f172a] dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#64748b] dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
