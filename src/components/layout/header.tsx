"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Briefcase,
  Building2,
  FileText,
  Users,
  Star,
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight,
  Zap,
  Shield,
  Globe,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-media-query"

type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string; icon: React.ReactNode; description?: string }[]
}

const navItems: NavItem[] = [
  {
    label: "Jobs",
    href: "/jobs",
    children: [
      { label: "Browse All Jobs", href: "/jobs", icon: <Briefcase className="h-5 w-5" />, description: "Explore thousands of job listings" },
      { label: "Remote Jobs", href: "/jobs?remote=true", icon: <Globe className="h-5 w-5" />, description: "Work from anywhere in the world" },
      { label: "Featured Jobs", href: "/jobs?featured=true", icon: <Star className="h-5 w-5" />, description: "Top-rated positions from leading companies" },
      { label: "Salary Insights", href: "/salary", icon: <TrendingUp className="h-5 w-5" />, description: "Know your market worth" },
      { label: "Job Alerts", href: "/jobs/alerts", icon: <Zap className="h-5 w-5" />, description: "Never miss a matching opportunity" },
      { label: "Career Advice", href: "/advice", icon: <FileText className="h-5 w-5" />, description: "Tips, guides, and industry insights" },
    ],
  },
  {
    label: "Companies",
    href: "/companies",
    children: [
      { label: "Top Companies", href: "/companies?sort=top", icon: <Building2 className="h-5 w-5" />, description: "Leading employers hiring now" },
      { label: "Company Reviews", href: "/companies/reviews", icon: <Star className="h-5 w-5" />, description: "Read authentic employee reviews" },
      { label: "Salary Reports", href: "/companies/salaries", icon: <TrendingUp className="h-5 w-5" />, description: "Compare compensation across companies" },
      { label: "Interviews", href: "/companies/interviews", icon: <Users className="h-5 w-5" />, description: "Interview experiences and tips" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Career Advice", href: "/advice" },
  { label: "Pricing", href: "/pricing" },
]

interface HeaderProps {
  isAuthenticated?: boolean
  user?: {
    name: string
    email: string
    avatar?: string
    role?: "admin" | "employer" | "jobseeker"
  }
}

function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const root = document.documentElement
    const stored = localStorage.getItem("theme") as "light" | "dark" | null
    const initial = stored || (root.classList.contains("dark") ? "dark" : "light")
    setTheme(initial)
  }, [])

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(next)
    localStorage.setItem("theme", next)
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 hover:bg-accent",
        className
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-5 w-5" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function MegaMenuDropdown({ item, isOpen, onOpen, onClose }: {
  item: NavItem
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}) {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(null)

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    onOpen()
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(onClose, 200)
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className={cn(
          "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
          isOpen ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-50 mt-2 w-[520px] -translate-x-1/2 rounded-2xl border bg-popover p-3 shadow-2xl backdrop-blur-xl"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="grid grid-cols-2 gap-1">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-accent"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                    {child.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-none">{child.label}</p>
                    {child.description && (
                      <p className="mt-1 text-xs leading-snug text-muted-foreground">
                        {child.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function UserMenu({ user }: { user: NonNullable<HeaderProps["user"]> }) {
  const dashboardHref = user.role === "admin" ? "/admin" : user.role === "employer" ? "/employer" : "/dashboard"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-xl p-1.5 transition-colors duration-200 hover:bg-accent">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <span className="hidden text-sm font-medium lg:inline-block">{user.name}</span>
          <ChevronDown className="hidden h-4 w-4 text-muted-foreground lg:block" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={dashboardHref} className="cursor-pointer">
            <Users className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="cursor-pointer">
            <Shield className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Header({ isAuthenticated = false, user }: HeaderProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openMega, setOpenMega] = React.useState<string | null>(null)
  const [searchFocused, setSearchFocused] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    setMobileOpen(false)
    setOpenMega(null)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b bg-background/80 shadow-lg backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
            : "bg-background/0"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden bg-gradient-to-r from-primary to-accent bg-clip-text text-xl font-bold text-transparent sm:block">
              JobPortal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) =>
              item.children ? (
                <MegaMenuDropdown
                  key={item.label}
                  item={item}
                  isOpen={openMega === item.label}
                  onOpen={() => setOpenMega(item.label)}
                  onClose={() => setOpenMega(null)}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Search + Actions */}
          <div className="flex items-center gap-2">
            {/* Desktop Search */}
            <div
              className={cn(
                "relative hidden transition-all duration-300 md:block",
                searchFocused ? "w-72" : "w-48"
              )}
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="h-10 w-full rounded-xl border border-white/20 bg-white/10 pl-9 pr-4 text-sm backdrop-blur-xl transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-white/5 dark:border-white/10"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>

            <ThemeToggle />

            {isAuthenticated && user ? (
              <UserMenu user={user} />
            ) : (
              <div className="hidden items-center gap-2 lg:flex">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button size="sm" variant="gradient" asChild>
                  <Link href="/auth/signup">Create Account</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 hover:bg-accent lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 90, scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: -90, scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileNav
        open={mobileOpen && isMobile}
        onClose={() => setMobileOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
        pathname={pathname}
      />

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}

function MobileNav({
  open,
  onClose,
  isAuthenticated,
  user,
  pathname,
}: {
  open: boolean
  onClose: () => void
  isAuthenticated: boolean
  user?: HeaderProps["user"]
  pathname: string
}) {
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm border-l bg-background shadow-2xl lg:hidden"
          >
            <div className="flex h-full flex-col overflow-y-auto">
              <div className="flex items-center justify-between border-b px-4 py-4">
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
                  className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-accent"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="border-b px-4 py-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input variant="glass" placeholder="Search jobs..." className="pl-9" />
                </div>
              </div>

              <nav className="flex-1 px-3 py-4">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() =>
                            setExpandedItem(expandedItem === item.label ? null : item.label)
                          }
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                            pathname.startsWith(item.href)
                              ? "text-primary bg-primary/5"
                              : "text-foreground hover:bg-accent"
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              expandedItem === item.label && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {expandedItem === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-3 border-l-2 border-primary/10 pl-3 py-1">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={onClose}
                                    className={cn(
                                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                      pathname === child.href
                                        ? "text-primary bg-primary/5"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                    )}
                                  >
                                    <span className="text-muted-foreground">{child.icon}</span>
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
                          "flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "text-primary bg-primary/5"
                            : "text-foreground hover:bg-accent"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="border-t px-4 py-4">
                {isAuthenticated && user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-xl bg-accent/50 px-3 py-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={onClose}>
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href="/auth/signin" onClick={onClose}>
                        Sign In
                      </Link>
                    </Button>
                    <Button variant="gradient" className="flex-1" asChild>
                      <Link href="/auth/signup" onClick={onClose}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
