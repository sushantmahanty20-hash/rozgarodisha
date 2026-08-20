"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase, LayoutDashboard, FileText, Building2, Settings, Users,
  BarChart3, Shield, Megaphone, CreditCard, ChevronLeft, ChevronDown,
  LogOut, Search, UserCheck, Clock, TrendingUp, AlertTriangle, Eye, Zap, DollarSign,
  PieChart, Activity, Star, Headphones, FileCheck, Layers,
  BookOpen, HelpCircle, ExternalLink, Bookmark, MessageSquare, Bell,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAdminView, type AdminView } from "@/store/use-admin-view"

type UserRole = "admin" | "employer" | "jobseeker" | "recruiter"

interface SidebarItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: string | number
  children?: { label: string; href: string }[]
}

interface SidebarSection {
  title: string
  items: SidebarItem[]
}

interface SidebarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
  user?: { name: string; email: string; avatar?: string; role: UserRole }
  className?: string
}

const adminNav: SidebarSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        label: "User Management", href: "/admin/users", icon: Users,
        children: [
          { label: "All Users", href: "/admin/users" },
          { label: "Job Seekers", href: "/admin/users?role=JOB_SEEKER" },
          { label: "Employers", href: "/admin/users?role=EMPLOYER" },
          { label: "Recruiters", href: "/admin/users?role=RECRUITER" },
          { label: "Admin Users", href: "/admin/users?role=ADMIN" },
        ],
      },
    ],
  },
  {
    title: "Jobs Management",
    items: [
      {
        label: "Jobs Management", href: "/admin/jobs", icon: FileText,
        children: [
          { label: "All Jobs", href: "/admin/jobs" },
          { label: "Pending Jobs", href: "/admin/jobs?status=PENDING" },
          { label: "Active Jobs", href: "/admin/jobs?status=ACTIVE" },
          { label: "Reported Jobs", href: "/admin/jobs?status=REPORTED" },
        ],
      },
    ],
  },
  {
    title: "Companies",
    items: [
      {
        label: "Companies", href: "/admin/companies", icon: Building2,
        children: [
          { label: "All Companies", href: "/admin/companies" },
          { label: "Pending Verification", href: "/admin/companies?status=PENDING" },
          { label: "Recruiter Agencies", href: "/admin/recruiters" },
        ],
      },
    ],
  },
  {
    title: "Revenue",
    items: [
      { label: "Revenue Overview", href: "/admin/revenue", icon: DollarSign },
      { label: "Payments", href: "/admin/payments", icon: CreditCard },
      { label: "Subscriptions", href: "/admin/subscriptions", icon: Layers },
    ],
  },
  {
    title: "Analytics",
    items: [
      { label: "Platform Analytics", href: "/admin/analytics", icon: BarChart3 },
      { label: "User Growth", href: "/admin/analytics/users", icon: TrendingUp },
      { label: "Job Analytics", href: "/admin/jobs", icon: PieChart },
      { label: "Traffic", href: "/admin/analytics/traffic", icon: Activity },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Blog", href: "/admin/blog", icon: BookOpen },
      { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
      { label: "Testimonials", href: "/admin/testimonials", icon: Star },
      { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
    ],
  },
  {
    title: "Moderation",
    items: [
      { label: "Reports", href: "/admin/moderation", icon: Eye },
      { label: "Flagged Content", href: "/admin/moderation/flagged", icon: AlertTriangle },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
      { label: "Support", href: "/admin/support", icon: Headphones },
    ],
  },
]

const employerNav: SidebarSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/employer", icon: LayoutDashboard },
    ],
  },
  {
    title: "Recruitment",
    items: [
      {
        label: "My Jobs", href: "/employer/jobs", icon: FileText,
        children: [
          { label: "All Jobs", href: "/employer/jobs" },
          { label: "Active Listings", href: "/employer/jobs?status=ACTIVE" },
          { label: "Drafts", href: "/employer/jobs?status=DRAFT" },
          { label: "Closed", href: "/employer/jobs?status=CLOSED" },
        ],
      },
      {
        label: "Applications", href: "/employer/applications", icon: Users,
        children: [
          { label: "All Applications", href: "/employer/applications" },
          { label: "New", href: "/employer/applications?status=NEW" },
          { label: "Shortlisted", href: "/employer/applications?status=SHORTLISTED" },
          { label: "Interviewed", href: "/employer/applications?status=INTERVIEWED" },
        ],
      },
      { label: "Candidates", href: "/employer/candidates", icon: UserCheck },
      { label: "Interviews", href: "/employer/interviews", icon: Clock },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Company Profile", href: "/employer/company", icon: Building2 },
    ],
  },
  {
    title: "Messages",
    items: [
      { label: "Messages", href: "/employer/messages", icon: MessageSquare },
      { label: "Notifications", href: "/employer/notifications", icon: Bell },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Settings", href: "/employer/settings", icon: Settings },
    ],
  },
]

const jobSeekerNav: SidebarSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/job-seeker", icon: LayoutDashboard },
    ],
  },
  {
    title: "Job Search",
    items: [
      { label: "Browse Jobs", href: "/jobs", icon: Search },
      { label: "Saved Jobs", href: "/job-seeker/saved-jobs", icon: Bookmark },
    ],
  },
  {
    title: "My Activity",
    items: [
      {
        label: "Applications", href: "/job-seeker/applications", icon: FileText,
        children: [
          { label: "All Applications", href: "/job-seeker/applications" },
          { label: "Pending", href: "/job-seeker/applications?status=PENDING" },
          { label: "Shortlisted", href: "/job-seeker/applications?status=SHORTLISTED" },
          { label: "Rejected", href: "/job-seeker/applications?status=REJECTED" },
        ],
      },
      { label: "Interviews", href: "/job-seeker/interviews", icon: Clock },
    ],
  },
  {
    title: "Profile",
    items: [
      { label: "My Profile", href: "/job-seeker/profile", icon: Users },
      { label: "My Resume", href: "/job-seeker/resume", icon: FileText },
    ],
  },
  {
    title: "Messages",
    items: [
      { label: "Messages", href: "/job-seeker/messages", icon: MessageSquare },
      { label: "Notifications", href: "/job-seeker/notifications", icon: Bell },
    ],
  },
]

const roleLabels: Record<UserRole, string> = {
  admin: "Super Admin",
  employer: "Employer",
  recruiter: "Recruiter",
  jobseeker: "Job Seeker",
}

function getNavForRole(role: UserRole): SidebarSection[] {
  switch (role) {
    case "admin": return adminNav
    case "employer": return employerNav
    case "jobseeker": return jobSeekerNav
    default: return adminNav
  }
}

const getViewFromHref = (href: string): { section: string; value: string } | null => {
  if (href.includes("/admin/users")) {
    const role = href.split("role=")[1]?.split("&")[0] || "all"
    const valueMap: Record<string, string> = {
      all: "all",
      JOB_SEEKER: "job-seekers",
      EMPLOYER: "employers",
      RECRUITER: "recruiters",
      ADMIN: "admin-users",
    }
    return { section: "user-management", value: valueMap[role] || "all" }
  }
  if (href.includes("/admin/recruiters")) {
    return { section: "companies", value: "recruiter-agencies" }
  }
  if (href.includes("/admin/jobs")) {
    const status = href.split("status=")[1]?.split("&")[0] || "all"
    const valueMap: Record<string, string> = {
      all: "all",
      PENDING: "pending",
      ACTIVE: "active",
      REPORTED: "reported",
    }
    return { section: "jobs-management", value: valueMap[status] || "all" }
  }
  if (href.includes("/admin/companies")) {
    const status = href.split("status=")[1]?.split("&")[0] || "all"
    const valueMap: Record<string, string> = {
      all: "all",
      PENDING: "pending-verification",
    }
    return { section: "companies", value: valueMap[status] || "all" }
  }
  return null
}

const getViewFromItem = (item: SidebarItem): { section: string; value: string } | null => {
  return getViewFromHref(item.href)
}

const getViewFromChild = (_parentItem: SidebarItem, child: { label: string; href: string }): { section: string; value: string } | null => {
  return getViewFromHref(child.href)
}

const isViewActive = (
  itemView: { section: string; value: string } | null,
  storeView: AdminView
): boolean => {
  if (!itemView) return false
  if (itemView.section !== storeView.section) return false
  return itemView.value === storeView.value
}

function isPathnameActive(pathname: string, href: string, baseHref: string): boolean {
  const base = href.split("?")[0]
  return pathname === base || (pathname.startsWith(base) && base !== baseHref)
}

export function Sidebar({ collapsed = false, onToggleCollapse, user, className }: SidebarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const adminView = useAdminView(state => state.view)
  const role = user?.role || "admin"
  const nav = getNavForRole(role)

  const [manualExpanded, setManualExpanded] = React.useState<string[]>([])

  const toggleExpand = (label: string) => {
    setManualExpanded((prev) => prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label])
  }

  const currentUrl = React.useMemo(() => {
    const qs = searchParams.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }, [pathname, searchParams])

  const expandedItems = React.useMemo(() => {
    if (role !== "admin") {
      const autoExpanded: string[] = []
      for (const section of nav) {
        for (const item of section.items) {
          if (item.children) {
            const anyChildActive = item.children.some((child) => child.href === currentUrl)
            if (anyChildActive) autoExpanded.push(item.label)
          }
        }
      }
      const merged = new Set([...manualExpanded, ...autoExpanded])
      return Array.from(merged)
    }

    const autoExpanded: string[] = []
    for (const section of adminNav) {
      for (const item of section.items) {
        if (item.children) {
          const anyChildActive = item.children.some((child) => {
            const childView = getViewFromChild(item, child)
            return isViewActive(childView, adminView)
          })
          if (anyChildActive) autoExpanded.push(item.label)
        }
      }
    }
    const merged = new Set([...manualExpanded, ...autoExpanded])
    return Array.from(merged)
  }, [manualExpanded, adminView, role, nav, currentUrl])

  const isItemActive = (item: SidebarItem): boolean => {
    if (role === "admin") {
      const itemView = getViewFromItem(item)
      return isViewActive(itemView, adminView)
    }
    const base = item.href.split("?")[0]
    return pathname === base || (pathname.startsWith(base) && base !== "/employer" && base !== "/job-seeker" && base !== "/admin")
  }

  const isChildActive = (child: { label: string; href: string }): boolean => {
    if (role === "admin") {
      const childView = getViewFromHref(child.href)
      return isViewActive(childView, adminView)
    }
    return currentUrl === child.href
  }

  return (
    <aside className={cn(
      "flex h-full flex-col border-r border-[#e2e8f0] bg-white transition-all duration-300 dark:border-white/10 dark:bg-[#0a0a0f]",
      collapsed ? "w-[72px]" : "w-[260px]", className
    )}>
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-[#e2e8f0] px-4 dark:border-white/10">
        <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] to-[#7c3aed] shadow-lg shadow-[#2563eb]/25">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }}
              className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-lg font-extrabold text-transparent whitespace-nowrap">
              JobPortal
            </motion.span>
          )}
        </Link>
        {onToggleCollapse && (
          <button onClick={onToggleCollapse}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a] dark:hover:bg-white/5 dark:hover:text-white">
            <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", collapsed && "rotate-180")} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-3">
        <nav className="space-y-5 px-3">
          {nav.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <h4 className="mb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] dark:text-gray-500">
                  {section.title}
                </h4>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isItemActive(item)
                  const childStates = item.children ? item.children.map(isChildActive) : []
                  const hasActiveChild = childStates.some(Boolean)

                  return (
                    <SidebarLink
                      key={item.label}
                      item={item}
                      collapsed={collapsed}
                      isActive={active}
                      hasActiveChild={hasActiveChild}
                      childActiveStates={childStates}
                      expandedItems={expandedItems}
                      onToggleExpand={toggleExpand}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Visit Website */}
      {!collapsed && (
        <div className="px-3 pb-2">
          <Link href="/"
            className="flex items-center gap-3 rounded-lg border border-dashed border-[#2563eb]/20 bg-[#2563eb]/5 px-3 py-2 text-[13px] font-medium text-[#2563eb] transition-colors hover:bg-[#2563eb]/10 dark:border-[#818cf8]/20 dark:bg-[#818cf8]/5 dark:text-[#818cf8] dark:hover:bg-[#818cf8]/10">
            <ExternalLink className="h-4 w-4 shrink-0" />
            <span className="flex-1 truncate">Visit Website</span>
          </Link>
        </div>
      )}

      {/* User Section */}
      {user && (
        <div className="border-t border-[#e2e8f0] p-3 dark:border-white/10">
          <div className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#f1f5f9] dark:hover:bg-white/5",
            collapsed && "justify-center px-0"
          )}>
            <Avatar size="sm">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-[#0f172a] dark:text-white">{user.name}</p>
                  <p className="truncate text-[11px] font-medium text-[#2563eb] dark:text-[#818cf8]">{roleLabels[user.role as UserRole]}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10">
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </aside>
  )
}

function SidebarLink({
  item, collapsed, isActive, hasActiveChild, childActiveStates, expandedItems, onToggleExpand,
}: {
  item: SidebarItem; collapsed: boolean; isActive: boolean; hasActiveChild: boolean;
  childActiveStates: boolean[]; expandedItems: string[]; onToggleExpand: (label: string) => void
}) {
  const hasChildren = item.children && item.children.length > 0
  const isExpanded = expandedItems.includes(item.label)
  const Icon = item.icon

  const linkContent = (asLink = true) => {
    const effectiveActive = isActive || hasActiveChild
    const cls = cn(
      "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150",
      effectiveActive ? "bg-[#2563eb]/10 text-[#2563eb] dark:bg-[#818cf8]/10 dark:text-[#818cf8]"
        : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
    )
    const inner = (<>
      <div className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-150",
        effectiveActive ? "bg-[#2563eb] text-white shadow-md shadow-[#2563eb]/25 dark:bg-[#818cf8] dark:shadow-[#818cf8]/25"
          : "bg-[#f1f5f9] text-[#64748b] group-hover:bg-[#e2e8f0] group-hover:text-[#0f172a] dark:bg-white/5 dark:group-hover:bg-white/10 dark:group-hover:text-white"
      )}>
        <Icon className="h-4 w-4" />
      </div>
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge && (
            <span className={cn(
              "rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none",
              typeof item.badge === "number" ? "bg-[#2563eb]/10 text-[#2563eb] dark:bg-[#818cf8]/10 dark:text-[#818cf8]"
                : "bg-[#2563eb] text-white dark:bg-[#818cf8]"
            )}>
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", isExpanded && "rotate-180")} />
          )}
        </>
      )}
    </>)

    if (asLink) {
      return <Link href={item.href} className={cls}>{inner}</Link>
    }
    return <button type="button" onClick={() => onToggleExpand(item.label)} className={cls}>{inner}</button>
  }

  if (hasChildren && !collapsed) {
    return (
      <div>
        {linkContent(false)}
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
              <div className="ml-6 mt-0.5 space-y-0.5 border-l-2 border-[#2563eb]/10 pl-3 dark:border-[#818cf8]/10">
                {item.children!.map((child, i) => {
                  const childActive = childActiveStates[i]
                  return (
                    <Link key={child.href} href={child.href}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-1.5 text-[13px] transition-colors",
                        childActive
                          ? "bg-[#2563eb]/10 font-medium text-[#2563eb] dark:bg-[#818cf8]/10 dark:text-[#818cf8]"
                          : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
                      )}>
                      {child.label}
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  if (collapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{linkContent(true)}</TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            <p className="text-xs font-medium">{item.label}</p>
            {item.badge && <p className="text-[10px] text-muted-foreground">{item.badge} items</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return linkContent(true)
}
