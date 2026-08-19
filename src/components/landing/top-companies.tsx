"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { MapPin, Briefcase, ArrowRight, CheckCircle } from "lucide-react"

const companies = [
  { name: "TechNova Solutions", slug: "technova-solutions", industry: "Technology", location: "Bengaluru", jobs: 42, verified: true, color: "from-[#2563eb] to-[#3b82f6]" },
  { name: "FinEdge Capital", slug: "finedge-capital", industry: "Finance", location: "Mumbai", jobs: 28, verified: true, color: "from-[#10b981] to-[#34d399]" },
  { name: "CloudCore Systems", slug: "cloudcore-systems", industry: "Cloud Infrastructure", location: "Hyderabad", jobs: 35, verified: true, color: "from-[#7c3aed] to-[#a855f7]" },
  { name: "Vertex Labs", slug: "vertex-labs", industry: "AI/ML", location: "Pune", jobs: 19, verified: true, color: "from-[#06b6d4] to-[#22d3ee]" },
  { name: "BrightWorks Studio", slug: "brightworks-studio", industry: "Design Agency", location: "Gurugram", jobs: 15, verified: true, color: "from-[#ec4899] to-[#f472b6]" },
  { name: "Nova Systems", slug: "nova-systems", industry: "Aerospace & Defense", location: "Bengaluru", jobs: 31, verified: true, color: "from-[#f59e0b] to-[#fbbf24]" },
  { name: "Apex Digital", slug: "apex-digital", industry: "Digital Marketing", location: "Delhi", jobs: 22, verified: true, color: "from-[#ef4444] to-[#f87171]" },
  { name: "GlobalMart", slug: "globalmart", industry: "E-Commerce", location: "Mumbai", jobs: 56, verified: true, color: "from-[#14b8a6] to-[#5eead4]" },
]

export function TopCompanies() {
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#06b6d4]/20 bg-[#06b6d4]/5 px-4 py-1.5 text-sm font-semibold text-[#06b6d4] dark:border-[#22d3ee]/20 dark:bg-[#22d3ee]/10 dark:text-[#22d3ee]">
            Top Companies
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl dark:text-white">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-[#06b6d4] to-[#2563eb] bg-clip-text text-transparent">
              Leading Companies
            </span>
          </h2>
          <p className="text-lg text-[#64748b] dark:text-gray-400">
            Join the best companies that are hiring on JobPortal
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((company, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link href={`/companies/${company.slug}`}>
                <div className="group flex h-full flex-col rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#111118] dark:hover:bg-[#161625]">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${company.color} text-sm font-bold text-white shadow-md`}>
                      {company.name[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="truncate text-sm font-bold text-[#0f172a] dark:text-white">
                          {company.name}
                        </h3>
                        {company.verified && (
                          <CheckCircle className="h-3.5 w-3.5 shrink-0 text-[#2563eb]" />
                        )}
                      </div>
                      <p className="text-xs text-[#94a3b8] dark:text-gray-500">
                        {company.industry}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between text-xs text-[#64748b] dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {company.location}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[#2563eb] dark:text-[#818cf8]">
                      <Briefcase className="h-3 w-3" />
                      {company.jobs} jobs
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 text-center"
        >
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] transition-colors hover:text-[#1d4ed8] dark:text-[#818cf8] dark:hover:text-[#a5b4fc]"
          >
            View All Companies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
