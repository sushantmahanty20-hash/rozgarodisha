"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, CheckCircle } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section ref={ref} className="relative py-24 bg-[#f8fafc] dark:bg-[#0a0a0f]">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl dark:text-white">
            Stay Ahead in Your{" "}
            <span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">
              Career
            </span>
          </h2>
          <p className="mb-8 text-lg text-[#64748b] dark:text-gray-400">
            Get weekly job alerts, career tips, and industry insights delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-12 w-full rounded-xl border border-[#e2e8f0] bg-white pl-10 pr-4 text-sm font-medium text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 dark:border-white/10 dark:bg-[#111118] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-[#818cf8] dark:focus:ring-[#818cf8]/20"
                required
              />
            </div>
            <button
              type="submit"
              className="flex h-12 shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-6 text-sm font-bold text-white shadow-lg shadow-[#2563eb]/25 transition-all hover:shadow-xl hover:shadow-[#2563eb]/30"
            >
              {submitted ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Subscribed!
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
