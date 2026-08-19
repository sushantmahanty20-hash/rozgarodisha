"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Kavitha Raman",
    role: "Software Engineer at TechNova",
    content:
      "JobPortal helped me find my dream role within a week. The AI matching was incredibly accurate and I received three interview calls almost immediately.",
    rating: 5,
    avatar: "KR",
    color: "from-[#2563eb] to-[#3b82f6]",
  },
  {
    name: "Arjun Mehta",
    role: "HR Director at FinEdge Capital",
    content:
      "As an employer, JobPortal has transformed our hiring process. We've reduced time-to-hire by 40% and found exceptional talent for critical roles.",
    rating: 5,
    avatar: "AM",
    color: "from-[#10b981] to-[#34d399]",
  },
  {
    name: "Priyanka Desai",
    role: "UX Designer at BrightWorks",
    content:
      "The resume builder and portfolio features really helped me stand out. I landed my current role through a recruiter who discovered me on JobPortal.",
    rating: 5,
    avatar: "PD",
    color: "from-[#7c3aed] to-[#a855f7]",
  },
]

export function Testimonials() {
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/20 bg-[#f59e0b]/5 px-4 py-1.5 text-sm font-semibold text-[#f59e0b] dark:border-[#fbbf24]/20 dark:bg-[#fbbf24]/10 dark:text-[#fbbf24]">
            Testimonials
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl dark:text-white">
            What Our{" "}
            <span className="bg-gradient-to-r from-[#f59e0b] to-[#ef4444] bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>
          <p className="text-lg text-[#64748b] dark:text-gray-400">
            Real stories from real professionals
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-white/10 dark:bg-[#111118]"
            >
              <Quote className="absolute right-4 top-4 h-8 w-8 text-[#e2e8f0] dark:text-white/5" />

              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>

              <p className="mb-6 text-sm leading-relaxed text-[#475569] dark:text-gray-300">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-xs font-bold text-white`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0f172a] dark:text-white">{t.name}</p>
                  <p className="text-xs text-[#94a3b8] dark:text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
