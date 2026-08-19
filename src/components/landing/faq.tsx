"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "How do I create an account on JobPortal?",
    answer:
      "Click the Register button and choose whether you're a Job Seeker or Employer. Fill in your details, verify your email, and you're ready to start exploring opportunities or hiring talent.",
  },
  {
    question: "Is JobPortal free for job seekers?",
    answer:
      "Yes, JobPortal is completely free for job seekers. You can create a profile, upload your resume, apply to jobs, and access all features without any charges.",
  },
  {
    question: "How does the AI job matching work?",
    answer:
      "Our AI analyzes your skills, experience, preferences, and career goals to match you with the most relevant job opportunities. The more complete your profile, the better the matching accuracy.",
  },
  {
    question: "What subscription plans do you offer for employers?",
    answer:
      "We offer four plans: Starter (Rs 9,999/month), Professional (Rs 24,999/month), Business (Rs 59,999/month), and Enterprise (custom pricing). Each plan offers different limits on job posts, resume views, and candidate contacts.",
  },
  {
    question: "Can I track my job applications?",
    answer:
      "Yes, your Candidate Dashboard provides a complete overview of all your applications with real-time status updates. You can track each application from submission through the entire hiring process.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team through the Contact page, by emailing support@jobportal.com, or by using the in-app chat feature. We typically respond within 24 hours.",
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 bg-white dark:bg-[#0a0a0f]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2563eb]/20 bg-[#2563eb]/5 px-4 py-1.5 text-sm font-semibold text-[#2563eb] dark:border-[#818cf8]/20 dark:bg-[#818cf8]/10 dark:text-[#818cf8]">
            <HelpCircle className="h-3.5 w-3.5" />
            FAQ
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl dark:text-white">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#2563eb] to-[#06b6d4] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="rounded-xl border border-[#e2e8f0] bg-white transition-all dark:border-white/10 dark:bg-[#111118]">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-bold text-[#0f172a] dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-[#64748b] transition-transform duration-200 dark:text-gray-400",
                      openIndex === i && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm leading-relaxed text-[#64748b] dark:text-gray-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
