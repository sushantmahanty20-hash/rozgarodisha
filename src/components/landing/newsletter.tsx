"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, ArrowRight, Check, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section ref={ref} className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-accent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,white/20,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,white/10,transparent_50%)]" />

          <div className="relative px-8 py-16 text-center md:px-16 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <Mail className="h-8 w-8 text-white" />
              </div>

              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Stay Updated
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-lg text-white/80">
                Get the latest job opportunities, career insights, and AI-powered tips delivered to your inbox weekly.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-2xl bg-white/20 px-6 py-4 backdrop-blur-sm"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/30">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="font-medium text-white">
                    Thanks for subscribing!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                  <div className="flex flex-1 items-center gap-2 rounded-xl bg-white/20 px-4 py-3 backdrop-blur-sm">
                    <Mail className="h-5 w-5 shrink-0 text-white/60" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
                    />
                  </div>
                  <Button type="submit" size="lg" variant="secondary" className="shrink-0 bg-white text-primary hover:bg-white/90">
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              )}

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60">
                <Shield className="h-4 w-4" />
                <span>No spam, ever. Unsubscribe anytime.</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
