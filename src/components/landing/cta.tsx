"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Briefcase, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const shapes = [
  { className: "absolute -left-20 top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl", delay: 0 },
  { className: "absolute -right-20 bottom-20 h-48 w-48 rounded-full bg-accent/20 blur-3xl", delay: 0.5 },
  { className: "absolute left-1/2 top-0 h-32 w-32 rounded-full bg-white/5 blur-2xl", delay: 1 },
]

export function Cta() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent"
        >
          {shapes.map((shape, i) => (
            <motion.div
              key={i}
              className={shape.className}
              animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, delay: shape.delay, ease: "easeInOut" }}
            />
          ))}

          <div className="relative z-10 px-8 py-20 text-center md:px-16 md:py-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 text-3xl font-bold text-white md:text-5xl"
            >
              Ready to Start Your Career Journey?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto mb-10 max-w-xl text-lg text-white/80"
            >
              Join thousands of professionals who found their perfect match. Whether you&apos;re hiring or looking for your next role.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                size="xl"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 shadow-xl"
              >
                <Briefcase className="h-5 w-5" />
                For Job Seekers
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="xl"
                className="border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 shadow-xl"
              >
                <Building2 className="h-5 w-5" />
                For Employers
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
