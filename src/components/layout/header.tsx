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
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Building2,
  FileText,
  Users,
  Star,
  TrendingUp,
  MapPin,
  Clock,
  Zap,
  Shield,
  Globe,
  User,
  BookOpen,
  HelpCircle,
  MessageCircle,
  BarChart3,
  Bookmark,
  Settings,
  LogOut,
  Heart,
  Target,
  Award,
  Home,
  Send,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"

const announcementMessages = [
  { text: "Start Today: Top Jobs Await!", icon: "Rocket" },
  { text: "Upload Your CV — Attract Top Employers Instantly.", icon: "FileText" },
  { text: "10,000+ New Opportunities Added This Month.", icon: "TrendingUp" },
  { text: "Build Your Profile. Get Discovered.", icon: "User" },
]

type MegaMenuItem = {
  label: string
  href: string
  icon: React.ReactNode
  description?: string
}

type NavItem = {
  label: string
  href: string
  children?: MegaMenuItem[]
}

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    children: [
      { label: "Homepage", href: "/", icon: <Home className="h-5 w-5" />, description: "Back to homepage" },
      { label: "Find Jobs", href: "/jobs", icon: <Search className="h-5 w-5" />, description: "Search through thousands of jobs" },
      { label: "Featured Jobs", href: "/jobs?featured=true", icon: <Star className="h-5 w-5" />, description: "Top-rated positions from leading companies" },
      { label: "Remote Jobs", href: "/jobs?mode=remote", icon: <Globe className="h-5 w-5" />, description: "Work from anywhere in the world" },
    ],
  },
  {
    label: "Find Jobs",
    href: "/jobs",
    children: [
      { label: "Search Jobs", href: "/jobs", icon: <Search className="h-5 w-5" />, description: "Browse all available positions" },
      { label: "Featured Jobs", href: "/jobs?featured=true", icon: <Star className="h-5 w-5" />, description: "Premium listings from top employers" },
      { label: "Remote Jobs", href: "/jobs?mode=remote", icon: <Globe className="h-5 w-5" />, description: "Work from anywhere" },
      { label: "Full Time", href: "/jobs?type=FULL_TIME", icon: <Briefcase className="h-5 w-5" />, description: "Permanent positions" },
      { label: "Part Time", href: "/jobs?type=PART_TIME", icon: <Clock className="h-5 w-5" />, description: "Flexible working hours" },
      { label: "Internships", href: "/jobs?type=INTERNSHIP", icon: <BookOpen className="h-5 w-5" />, description: "Start your career journey" },
      { label: "Contract Jobs", href: "/jobs?type=CONTRACT", icon: <FileText className="h-5 w-5" />, description: "Project-based opportunities" },
      { label: "Jobs by Category", href: "/jobs#categories", icon: <Target className="h-5 w-5" />, description: "Browse by industry" },
      { label: "Jobs by Location", href: "/jobs#locations", icon: <MapPin className="h-5 w-5" />, description: "Find jobs near you" },
      { label: "Jobs by Salary", href: "/jobs?sort=salary", icon: <TrendingUp className="h-5 w-5" />, description: "Compare compensation" },
    ],
  },
  {
    label: "Employers",
    href: "/companies",
    children: [
      { label: "Employer Directory", href: "/companies", icon: <Building2 className="h-5 w-5" />, description: "Browse top companies hiring" },
      { label: "Post a Job", href: "/employer/jobs/new", icon: <Send className="h-5 w-5" />, description: "Reach thousands of candidates" },
      { label: "Find Candidates", href: "/candidates", icon: <Users className="h-5 w-5" />, description: "Search our talent pool" },
      { label: "Resume Database", href: "/candidates", icon: <FileText className="h-5 w-5" />, description: "Access candidate resumes" },
      { label: "Manage Jobs", href: "/employer/jobs", icon: <Briefcase className="h-5 w-5" />, description: "View and manage your postings" },
      { label: "Applications", href: "/employer/applications", icon: <Bookmark className="h-5 w-5" />, description: "Review incoming applications" },
      { label: "Employer Dashboard", href: "/employer", icon: <BarChart3 className="h-5 w-5" />, description: "Your hiring command center" },
      { label: "Pricing Plans", href: "/pricing", icon: <Award className="h-5 w-5" />, description: "Choose the right plan for you" },
    ],
  },
  {
    label: "Candidates",
    href: "/job-seeker",
    children: [
      { label: "Candidate Directory", href: "/candidates", icon: <Users className="h-5 w-5" />, description: "Explore top talent" },
      { label: "Candidate Dashboard", href: "/job-seeker", icon: <BarChart3 className="h-5 w-5" />, description: "Your career hub" },
      { label: "My Profile", href: "/job-seeker/profile", icon: <User className="h-5 w-5" />, description: "Manage your profile" },
      { label: "My Resume", href: "/job-seeker/resume", icon: <FileText className="h-5 w-5" />, description: "Build and update your resume" },
      { label: "Saved Jobs", href: "/job-seeker/saved-jobs", icon: <Bookmark className="h-5 w-5" />, description: "Your bookmarked opportunities" },
      { label: "Applied Jobs", href: "/job-seeker/applications", icon: <Briefcase className="h-5 w-5" />, description: "Track your applications" },
      { label: "Interviews", href: "/job-seeker/interviews", icon: <MessageCircle className="h-5 w-5" />, description: "Upcoming interview schedule" },
      { label: "Career Resources", href: "/blog", icon: <BookOpen className="h-5 w-5" />, description: "Tips and advice" },
    ],
  },
  {
    label: "Pages",
    href: "/about",
    children: [
      { label: "About Us", href: "/about", icon: <Heart className="h-5 w-5" />, description: "Learn about JobPortal" },
      { label: "How It Works", href: "/about#how-it-works", icon: <Zap className="h-5 w-5" />, description: "Step-by-step guide" },
      { label: "Pricing", href: "/pricing", icon: <Award className="h-5 w-5" />, description: "Employer pricing plans" },
      { label: "Blog", href: "/blog", icon: <BookOpen className="h-5 w-5" />, description: "Career advice and insights" },
      { label: "FAQ", href: "/faq", icon: <HelpCircle className="h-5 w-5" />, description: "Frequently asked questions" },
      { label: "Contact", href: "/contact", icon: <MessageCircle className="h-5 w-5" />, description: "Get in touch" },
      { label: "Privacy Policy", href: "/privacy", icon: <Shield className="h-5 w-5" />, description: "Your data, your rights" },
      { label: "Terms & Conditions", href: "/terms", icon: <FileText className="h-5 w-5" />, description: "Platform terms" },
    ],
  },
]

function AnnouncementBar() {
  const [current, setCurrent] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  React.useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcementMessages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isPaused])

  const goNext = () => setCurrent((prev) => (prev + 1) % announcementMessages.length)
  const goPrev = () => setCurrent((prev) => (prev - 1 + announcementMessages.length) % announcementMessages.length)

  return (
    <div
      className="relative z-50 bg-gradient-to-r from-[#0a1628] via-[#0d1f3c] to-[#0a1628] text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <button
          onClick={goPrev}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="h-3 w-3" />
        </button>
        <div className="relative flex flex-1 justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-center text-xs font-medium sm:text-sm"
            >
              <span className="text-lg">🚀</span>
              <span>{announcementMessages[current].text}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={goNext}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          aria-label="Next announcement"
        >
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

function MegaMenuDropdown({
  item,
  isOpen,
  onOpen,
  onClose,
}: {
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
    timeoutRef.current = setTimeout(onClose, 150)
  }

  const isWide = (item.children?.length ?? 0) > 6

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className={cn(
          "flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-semibold transition-all duration-200",
          isOpen
            ? "text-[#2563eb] dark:text-[#818cf8]"
            : "text-[#0f172a] hover:text-[#2563eb] dark:text-gray-200 dark:hover:text-[#818cf8]"
        )}
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        {item.label}
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-2xl border bg-white p-3 shadow-2xl dark:bg-[#0f0f17] dark:border-white/10",
              isWide ? "w-[720px]" : "w-[540px]"
            )}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className={cn("grid gap-1", isWide ? "grid-cols-3" : "grid-cols-2")}>
              {item.children.map((child) => (
                <Link
                  key={`${child.href}-${child.label}`}
                  href={child.href}
                  onClick={onClose}
                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-[#f1f5f9] dark:hover:bg-white/5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2563eb]/10 text-[#2563eb] transition-all duration-200 group-hover:bg-[#2563eb] group-hover:text-white dark:bg-[#818cf8]/10 dark:text-[#818cf8] dark:group-hover:bg-[#818cf8] dark:group-hover:text-white">
                    {child.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0f172a] dark:text-white">{child.label}</p>
                    {child.description && (
                      <p className="mt-0.5 text-xs leading-snug text-[#64748b] dark:text-gray-400">
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

function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    // Sync theme state with stored/DOM value after hydration
    const root = document.documentElement
    const stored = localStorage.getItem("theme") as "light" | "dark" | null
    const initial = stored || (root.classList.contains("dark") ? "dark" : "light")
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
        "relative flex h-10 w-10 items-center justify-center rounded-xl text-[#0f172a] transition-colors duration-200 hover:bg-[#f1f5f9] dark:text-gray-200 dark:hover:bg-white/10",
        className
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.span key="sun" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}>
            <Sun className="h-5 w-5" />
          </motion.span>
        ) : (
          <motion.span key="moon" initial={{ rotate: 90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -90, scale: 0 }} transition={{ duration: 0.2 }}>
            <Moon className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function UserMenu() {
  const { data: session } = useSession()
  const user = session?.user

  if (!user) return null

  const dashboardHref = user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? "/admin" : user.role === "EMPLOYER" ? "/employer" : "/job-seeker"

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 rounded-xl p-1.5 transition-colors duration-200 hover:bg-[#f1f5f9] dark:hover:bg-white/10">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#7c3aed] text-sm font-semibold text-white shadow-md">
          {user.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "U"}
        </div>
        <span className="hidden text-sm font-semibold text-[#0f172a] dark:text-white lg:inline-block">
          {user.name?.split(" ")[0]}
        </span>
        <ChevronDown className="hidden h-4 w-4 text-[#64748b] lg:block" />
      </button>
      <div className="invisible absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border bg-white p-2 shadow-2xl transition-all duration-200 group-hover:visible dark:bg-[#0f0f17] dark:border-white/10">
        <div className="px-3 py-2">
          <p className="text-sm font-semibold text-[#0f172a] dark:text-white">{user.name}</p>
          <p className="text-xs text-[#64748b] dark:text-gray-400">{user.email}</p>
        </div>
        <div className="my-1 h-px bg-[#e2e8f0] dark:bg-white/10" />
        <Link href={dashboardHref} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#0f172a] transition-colors hover:bg-[#f1f5f9] dark:text-white dark:hover:bg-white/5">
          <BarChart3 className="h-4 w-4" />
          Dashboard
        </Link>
        <Link href="/job-seeker/profile" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#0f172a] transition-colors hover:bg-[#f1f5f9] dark:text-white dark:hover:bg-white/5">
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <div className="my-1 h-px bg-[#e2e8f0] dark:bg-white/10" />
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#ef4444] transition-colors hover:bg-[#fef2f2] dark:hover:bg-[#ef4444]/10"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAuthenticated = !!session?.user
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openMega, setOpenMega] = React.useState<string | null>(null)
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Sync mobile/open state on route change
  React.useEffect(() => {
    // Close mobile nav and megamenu on route change
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false)
    setOpenMega(null)
  }, [pathname])

  return (
    <>
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "border-b border-[#e2e8f0] bg-white/90 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a0f]/90"
            : "bg-white dark:bg-[#0a0a0f]"
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] to-[#7c3aed] shadow-lg shadow-[#2563eb]/25">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="hidden text-xl font-extrabold tracking-tight text-[#0f172a] sm:block dark:text-white">
              Job<span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">Portal</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-0.5 xl:flex">
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
                    "rounded-lg px-3 py-2 text-[15px] font-semibold transition-colors duration-200",
                    pathname === item.href
                      ? "text-[#2563eb] dark:text-[#818cf8]"
                      : "text-[#0f172a] hover:text-[#2563eb] dark:text-gray-200 dark:hover:text-[#818cf8]"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className={cn(
                "rounded-lg px-3 py-2 text-[15px] font-semibold transition-colors duration-200",
                pathname === "/contact"
                  ? "text-[#2563eb] dark:text-[#818cf8]"
                  : "text-[#0f172a] hover:text-[#2563eb] dark:text-gray-200 dark:hover:text-[#818cf8]"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {isAuthenticated && session?.user ? (
              <UserMenu />
            ) : (
              <div className="hidden items-center gap-2 lg:flex">
                <Button variant="ghost" size="sm" asChild className="font-semibold">
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[#2563eb]/30"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[#0f172a] transition-colors duration-200 hover:bg-[#f1f5f9] dark:text-white dark:hover:bg-white/10 xl:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -90, scale: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm border-l border-[#e2e8f0] bg-white shadow-2xl dark:bg-[#0a0a0f] dark:border-white/10 xl:hidden"
            >
              <div className="flex h-full flex-col overflow-y-auto">
                <div className="flex items-center justify-between border-b border-[#e2e8f0] px-4 py-4 dark:border-white/10">
                  <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563eb] to-[#7c3aed]">
                      <Briefcase className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg font-extrabold text-[#0f172a] dark:text-white">
                      Job<span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">Portal</span>
                    </span>
                  </Link>
                  <button onClick={() => setMobileOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-[#f1f5f9] dark:hover:bg-white/10">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex-1 px-3 py-4">
                  {/* Mobile Home Link */}
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                      pathname === "/" ? "text-[#2563eb] bg-[#2563eb]/5" : "text-[#0f172a] hover:bg-[#f1f5f9] dark:text-white dark:hover:bg-white/5"
                    )}
                  >
                    <Home className="mr-3 h-4 w-4" />
                    Home
                  </Link>

                  {navItems.map((item) => (
                    <div key={item.label}>
                      {item.children ? (
                        <>
                          <button
                            onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                            className={cn(
                              "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                              pathname.startsWith(item.href)
                                ? "text-[#2563eb] bg-[#2563eb]/5"
                                : "text-[#0f172a] hover:bg-[#f1f5f9] dark:text-white dark:hover:bg-white/5"
                            )}
                          >
                            {item.label}
                            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", expandedItem === item.label && "rotate-180")} />
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
                                <div className="ml-3 border-l-2 border-[#2563eb]/10 pl-3 py-1 dark:border-[#818cf8]/10">
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => setMobileOpen(false)}
                                      className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                        pathname === child.href
                                          ? "text-[#2563eb] bg-[#2563eb]/5"
                                          : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
                                      )}
                                    >
                                      <span className="text-[#64748b] dark:text-gray-400">{child.icon}</span>
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
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                            pathname === item.href
                              ? "text-[#2563eb] bg-[#2563eb]/5"
                              : "text-[#0f172a] hover:bg-[#f1f5f9] dark:text-white dark:hover:bg-white/5"
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}

                  {/* Mobile Contact */}
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                      pathname === "/contact" ? "text-[#2563eb] bg-[#2563eb]/5" : "text-[#0f172a] hover:bg-[#f1f5f9] dark:text-white dark:hover:bg-white/5"
                    )}
                  >
                    <MessageCircle className="mr-3 h-4 w-4" />
                    Contact
                  </Link>
                </nav>

                <div className="border-t border-[#e2e8f0] px-4 py-4 dark:border-white/10">
                  {isAuthenticated && session?.user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 rounded-xl bg-[#f1f5f9] px-3 py-2.5 dark:bg-white/5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#7c3aed] text-sm font-semibold text-white">
                          {session.user.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "U"}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#0f172a] dark:text-white">{session.user.name}</p>
                          <p className="truncate text-xs text-[#64748b] dark:text-gray-400">{session.user.email}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          signOut({ callbackUrl: "/" })
                          setMobileOpen(false)
                        }}
                      >
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href="/login" onClick={() => setMobileOpen(false)}>
                          Login
                        </Link>
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white"
                        asChild
                      >
                        <Link href="/register" onClick={() => setMobileOpen(false)}>
                          Register
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
    </>
  )
}
