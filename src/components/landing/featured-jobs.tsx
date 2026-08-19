"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { MapPin, Clock, Bookmark, ArrowRight, Star, IndianRupee, Briefcase } from "lucide-react"

const jobs = [
  {
    title: "Senior React Developer",
    company: "TechNova Solutions",
    logo: "T",
    location: "Bengaluru, Karnataka",
    salary: "18L - 28L PA",
    type: "Full Time",
    mode: "Hybrid",
    posted: "2h ago",
    skills: ["React", "TypeScript", "Node.js"],
    featured: true,
    color: "from-[#2563eb] to-[#3b82f6]",
  },
  {
    title: "Product Manager",
    company: "FinEdge Capital",
    logo: "F",
    location: "Mumbai, Maharashtra",
    salary: "20L - 32L PA",
    type: "Full Time",
    mode: "Onsite",
    posted: "5h ago",
    skills: ["Strategy", "Analytics", "Agile"],
    featured: true,
    color: "from-[#7c3aed] to-[#a855f7]",
  },
  {
    title: "UX Designer",
    company: "Vertex Labs",
    logo: "V",
    location: "Hyderabad, Telangana",
    salary: "12L - 20L PA",
    type: "Full Time",
    mode: "Hybrid",
    posted: "1d ago",
    skills: ["Figma", "UI/UX", "Prototyping"],
    featured: false,
    color: "from-[#06b6d4] to-[#22d3ee]",
  },
  {
    title: "DevOps Engineer",
    company: "CloudCore Systems",
    logo: "C",
    location: "Remote",
    salary: "16L - 26L PA",
    type: "Full Time",
    mode: "Remote",
    posted: "3h ago",
    skills: ["AWS", "Kubernetes", "Docker"],
    featured: true,
    color: "from-[#f59e0b] to-[#fbbf24]",
  },
  {
    title: "Data Scientist",
    company: "Vertex Labs",
    logo: "V",
    location: "Pune, Maharashtra",
    salary: "22L - 35L PA",
    type: "Full Time",
    mode: "Hybrid",
    posted: "12h ago",
    skills: ["Python", "ML", "TensorFlow"],
    featured: false,
    color: "from-[#10b981] to-[#34d399]",
  },
  {
    title: "Full Stack Developer",
    company: "BrightWorks Studio",
    logo: "B",
    location: "Gurugram, Haryana",
    salary: "12L - 20L PA",
    type: "Full Time",
    mode: "Remote",
    posted: "6h ago",
    skills: ["Next.js", "React", "PostgreSQL"],
    featured: false,
    color: "from-[#ec4899] to-[#f472b6]",
  },
]

export function FeaturedJobs() {
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2563eb]/20 bg-[#2563eb]/5 px-4 py-1.5 text-sm font-semibold text-[#2563eb] dark:border-[#818cf8]/20 dark:bg-[#818cf8]/10 dark:text-[#818cf8]">
            <Star className="h-3.5 w-3.5" />
            Featured
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl dark:text-white">
            Featured <span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">Jobs</span>
          </h2>
          <p className="text-lg text-[#64748b] dark:text-gray-400">
            Hand-picked opportunities from India&apos;s top companies
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/jobs/${job.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="group relative flex h-full flex-col rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#111118] dark:hover:bg-[#161625]">
                  {job.featured && (
                    <div className="absolute -top-px left-6 right-6 h-0.5 bg-gradient-to-r from-[#2563eb] to-[#7c3aed]" />
                  )}
                  <div className="mb-4 flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${job.color} text-sm font-bold text-white shadow-lg`}>
                      {job.logo}
                    </div>
                    <button className="rounded-lg p-2 text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#2563eb] dark:hover:bg-white/5 dark:hover:text-[#818cf8]" onClick={(e) => e.preventDefault()}>
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="mb-1 text-lg font-bold text-[#0f172a] transition-colors group-hover:text-[#2563eb] dark:text-white dark:group-hover:text-[#818cf8]">
                    {job.title}
                  </h3>
                  <p className="mb-3 text-sm font-medium text-[#64748b] dark:text-gray-400">{job.company}</p>

                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-[#64748b] dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {job.posted}
                    </span>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {job.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[10px] font-semibold text-[#475569] dark:bg-white/5 dark:text-gray-400">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#10b981]/10 px-2.5 py-1 text-[10px] font-bold text-[#10b981]">
                      <Briefcase className="h-3 w-3" />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#2563eb]/10 px-2.5 py-1 text-[10px] font-bold text-[#2563eb] dark:bg-[#818cf8]/10 dark:text-[#818cf8]">
                      {job.mode}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#f1f5f9] pt-4 dark:border-white/5">
                    <p className="flex items-center gap-1 text-sm font-bold text-[#0f172a] dark:text-white">
                      <IndianRupee className="h-3.5 w-3.5" />
                      {job.salary}
                    </p>
                    <span className="flex items-center gap-1 text-sm font-semibold text-[#2563eb] transition-all group-hover:gap-2 dark:text-[#818cf8]">
                      View Job
                      <ArrowRight className="h-3.5 w-3.5" />
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
          className="mt-12 text-center"
        >
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#2563eb]/25 transition-all hover:shadow-xl hover:shadow-[#2563eb]/30"
          >
            View All Jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
