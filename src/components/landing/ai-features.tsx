"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, FileCheck, Search, MessageCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Brain,
    title: "AI Job Matching",
    description: "Our AI analyzes your skills, experience, and preferences to find the perfect job matches with 95% accuracy.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: FileCheck,
    title: "Resume Scoring",
    description: "Get instant feedback on your resume with AI-powered scoring and actionable improvement suggestions.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Natural language search that understands context and intent, delivering relevant results faster.",
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: MessageCircle,
    title: "Career Coaching",
    description: "24/7 AI career coach providing personalized guidance, interview prep, and negotiation strategies.",
    color: "from-orange-500 to-amber-400",
  },
]

export function AiFeatures() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Powered by AI
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Powered by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Cutting-edge AI technology that revolutionizes your job search experience
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group"
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-xl transition-all duration-300 hover:bg-white/15 hover:shadow-2xl dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/8">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 blur-3xl group-hover:opacity-20" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />

                  <div className={cn("mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg", feature.color)}>
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
