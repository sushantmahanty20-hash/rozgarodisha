"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Briefcase,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type NavChild = { label: string; href: string }

interface MobileNavProps {
  open: boolean
  onClose: () => void
  isAuthenticated?: boolean
  user?: {
    name: string
    email: string
    role?: "admin" | "employer" | "jobseeker"
  }
  navItems?: { label: string; href: string; children?: NavChild[] }[]
}

const defaultNavItems = [
  { label: "Jobs", href: "/jobs", children: [
    { label: "Browse All Jobs", href: "/jobs" },
    { label: "Remote Jobs", href: "/jobs?remote=true" },
    { label: "Featured Jobs", href: "/jobs?featured=true" },
  ]},
  { label: "Companies", href: "/companies", children: [
    { label: "Top Companies", href: "/companies?sort=top" },
    { label: "Company Reviews", href: "/companies/reviews" },
  ]},
  { label: "Services", href: "/services" },
  { label: "Career Advice", href: "/advice" },
  { label: "Pricing", href: "/pricing" },
]

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

const slideIn = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
}

export function MobileNav({
  open,
  onClose,
  isAuthenticated = false,
  user,
  navItems = defaultNavItems,
}: MobileNavProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  React.useEffect(() => {
    setExpanded(null)
  }, [pathname])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-sm flex-col bg-background shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-5 py-4">
              <Link href="/" onClick={onClose} className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                  <Briefcase className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-lg font-bold text-transparent">
                  JobPortal
                </span>
              </Link>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <motion.nav
              className="flex-1 overflow-y-auto px-4 py-6"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <div className="space-y-1">
                {navItems.map((item) => (
                  <motion.div key={item.label} variants={slideIn}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() =>
                            setExpanded(expanded === item.label ? null : item.label)
                          }
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                            pathname.startsWith(item.href)
                              ? "text-primary bg-primary/5"
                              : "text-foreground hover:bg-accent"
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              expanded === item.label && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {expanded === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 border-l-2 border-primary/10 pl-4 py-1">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={onClose}
                                    className={cn(
                                      "block rounded-lg px-4 py-2.5 text-sm transition-colors",
                                      pathname === child.href
                                        ? "text-primary bg-primary/5 font-medium"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                    )}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          pathname === item.href
                            ? "text-primary bg-primary/5"
                            : "text-foreground hover:bg-accent"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.nav>

            {/* Footer Actions */}
            <div className="border-t px-5 py-5">
              {isAuthenticated && user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-xl bg-accent/50 px-3 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{user.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={onClose}
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={onClose}
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/auth/signin" onClick={onClose}>
                      Sign In
                    </Link>
                  </Button>
                  <Button variant="gradient" className="flex-1" asChild>
                    <Link href="/auth/signup" onClick={onClose}>
                      Create Account
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
