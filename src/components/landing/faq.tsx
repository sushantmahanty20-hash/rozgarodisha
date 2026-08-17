"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "How does the AI job matching work?",
    answer: "Our AI analyzes your skills, experience, preferences, and career goals to match you with the most relevant job opportunities. It learns from your interactions and continuously improves its recommendations. The algorithm considers factors like company culture, growth potential, and salary expectations.",
  },
  {
    question: "Is the platform free for job seekers?",
    answer: "Yes! Our platform is completely free for job seekers. You can create a profile, upload your resume, apply to jobs, and use all AI-powered features at no cost. We also offer a premium tier with advanced features like priority application status and exclusive job listings.",
  },
  {
    question: "How accurate is the resume scoring feature?",
    answer: "Our resume scoring is trained on millions of successful resumes and job descriptions. It provides a comprehensive analysis covering formatting, keywords, impact statements, and ATS compatibility. Users report a 3x increase in interview callbacks after optimizing their resume based on our scores.",
  },
  {
    question: "Can companies trust the quality of candidates?",
    answer: "Absolutely. We use AI-powered pre-screening to verify skills, check for consistency, and assess candidate quality. Companies also have access to detailed analytics and can filter candidates based on specific requirements. Our platform maintains a 4.8/5 hiring manager satisfaction rating.",
  },
  {
    question: "How long does it take to get matched with a job?",
    answer: "Most users receive their first AI-matched recommendations within minutes of completing their profile. On average, users who actively engage with the platform receive interview invitations within 1-2 weeks. The timeline varies based on industry, location, and market conditions.",
  },
  {
    question: "What industries do you cover?",
    answer: "We cover a wide range of industries including Technology, Design, Marketing, Finance, Healthcare, Engineering, Sales, Education, Legal, and Human Resources. Our AI is trained on industry-specific data to provide accurate matching and salary insights across all sectors.",
  },
  {
    question: "How do I get started?",
    answer: "Getting started is simple: create a free account, complete your profile with your skills and experience, upload your resume, and our AI will start matching you with relevant opportunities right away. The entire process takes about 5-10 minutes.",
  },
  {
    question: "Is my data secure and private?",
    answer: "We take data security very seriously. All data is encrypted using AES-256 encryption, and we comply with GDPR, CCPA, and SOC 2 Type II standards. Your profile visibility is fully under your control - you can choose to be visible to all employers, only matched employers, or stay completely private.",
  },
]

export function Faq() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />

      <div className="relative mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-xl dark:bg-white/5 dark:border-white/10 md:p-8">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-xl border-0 px-1 data-[state=open]:bg-white/5 dark:data-[state=open]:bg-white/5"
                >
                  <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-1 pb-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
