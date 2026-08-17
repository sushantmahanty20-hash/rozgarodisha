"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Sarah Chen",
    designation: "Senior Software Engineer",
    company: "Google",
    initials: "SC",
    rating: 5,
    quote: "This platform's AI matching is incredible. I found my dream job at Google within 2 weeks. The personalized recommendations were spot-on with my skill set.",
    color: "from-blue-500 to-purple-500",
  },
  {
    name: "Michael Rodriguez",
    designation: "Product Designer",
    company: "Airbnb",
    initials: "MR",
    rating: 5,
    quote: "The resume scoring feature helped me optimize my application. I went from 5% response rate to 40%. Absolutely game-changing for my career.",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Emily Watson",
    designation: "Data Science Lead",
    company: "Netflix",
    initials: "EW",
    rating: 5,
    quote: "As a hiring manager, this platform helped us find 3 exceptional candidates in one month. The AI pre-screening saves us countless hours.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "David Kim",
    designation: "DevOps Engineer",
    company: "Stripe",
    initials: "DK",
    rating: 5,
    quote: "The smart search understands exactly what I'm looking for. No more scrolling through irrelevant listings. Every recommendation felt tailored to me.",
    color: "from-orange-500 to-amber-500",
  },
  {
    name: "Priya Sharma",
    designation: "Engineering Manager",
    company: "Meta",
    initials: "PS",
    rating: 5,
    quote: "We've hired 12 people through this platform in the last quarter. The quality of candidates is unmatched. Our time-to-hire dropped by 60%.",
    color: "from-violet-500 to-indigo-500",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const navigate = (dir: number) => {
    setDirection(dir)
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length)
  }

  const t = testimonials[current]

  return (
    <section ref={ref} className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            What People{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Trusted by professionals from top companies worldwide
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <div className="relative rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-2xl dark:bg-white/5 dark:border-white/10 md:p-12">
            <Quote className="absolute left-6 top-6 h-10 w-10 text-primary/20" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <div className="mb-6 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="mb-8 text-lg leading-relaxed text-foreground/90 md:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <Avatar size="lg">
                    <AvatarFallback className={cn("bg-gradient-to-br text-white font-bold", t.color)}>
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.designation} at {t.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === current ? "w-8 bg-primary" : "w-2 bg-white/20 hover:bg-white/30"
                    )}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(-1)}
                  className="rounded-full border border-white/20 bg-white/10 p-2 text-foreground backdrop-blur-sm transition-all hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="rounded-full border border-white/20 bg-white/10 p-2 text-foreground backdrop-blur-sm transition-all hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
