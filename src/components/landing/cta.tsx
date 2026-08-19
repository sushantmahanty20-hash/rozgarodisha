"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Briefcase, Users } from "lucide-react"

export function Cta() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(124,58,237,0.15),transparent_50%)]" />

      {/* Floating orbs */}
      <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-[#2563eb]/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-[#7c3aed]/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Ready to Find Your{" "}
            <span className="bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">
              Dream Job?
            </span>
          </h2>
          <p className="mb-10 text-lg text-gray-300">
            Join 85,000+ professionals who have found their perfect career match through JobPortal.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#2563eb]/25 transition-all hover:shadow-xl hover:shadow-[#2563eb]/30"
            >
              <Briefcase className="h-4 w-4" />
              Find Jobs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <Users className="h-4 w-4" />
              Post a Job
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
