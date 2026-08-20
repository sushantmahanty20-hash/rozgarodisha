"use client"

import * as React from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase, LayoutDashboard, FileText, Building2, Settings, Users,
  BarChart3, Shield, Megaphone, CreditCard, ChevronLeft, ChevronDown,
  LogOut, Search, UserCheck, Clock, TrendingUp, AlertTriangle, Eye, Zap, DollarSign,
  PieChart, Activity, Star, Headphones, FileCheck, Layers,
  BookOpen, HelpCircle,
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
      { label: "All Users", href: "/admin/users", icon: Users },
      { label: "Job Seekers", href: "/admin/users?role=JOB_SEEKER", icon: UserCheck },
      { label: "Employers", href: "/admin/users?role=EMPLOYER", icon: Building2 },
      { label: "Recruiters", href: "/admin/users?role=RECRUITER", icon: Search },
      { label: "Admin Users", href: "/admin/users?role=ADMIN", icon: Shield },
    ],
  },
  {
    title: "Jobs Management",
    items: [
      { label: "All Jobs", href: "/admin/jobs", icon: FileText },
      { label: "Pending Jobs", href: "/admin/jobs?status=PENDING", icon: Clock, badge: 8 },
      { label: "Active Jobs", href: "/admin/jobs?status=ACTIVE", icon: Zap },
      { label: "Reported Jobs", href: "/admin/jobs?status=REPORTED", icon: AlertTriangle, badge: 3 },
    ],
  },
  {
    title: "Companies",
    items: [
      { label: "All Companies", href: "/admin/companies", icon: Building2 },
      { label: "Pending Verification", href: "/admin/companies?status=PENDING", icon: FileCheck, badge: 5 },
      { label: "Recruiter Agencies", href: "/admin/recruiters", icon: Search },
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

const roleLabels: Record<UserRole, string> = {
  admin: "Super Admin",
  employer: "Employer",
  recruiter: "Recruiter",
  jobseeker: "Job Seeker",
}

const getViewFromItem = (item: SidebarItem): { section: string; value: string } => {
  const href = item.href
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
  if (href.includes("/admin/recruiters")) {
    return { section: "companies", value: "recruiter-agencies" }
  }
  return { section: "unknown", value: "unknown" }
}

const isViewActive = (
  itemView: { section: string; value: string },
  storeView: AdminView
): boolean => {
  if (itemView.section !== storeView.section) return false
  const itemValue = itemView.value
  const storeValue = storeView.value

  if (itemView.section === "user-management") {
    const map: Record<string, string> = {
      all: "all",
      "job-seekers": "job-seekers",
      employers: "employers",
      recruiters: "recruiters",
      "admin-users": "admin-users",
    }
    return map[itemValue] === storeValue
  }
  if (itemView.section === "jobs-management") {
    const map: Record<string, string> = {
      all: "all",
      pending: "pending",
      active: "active",
      reported: "reported",
    }
    return map[itemValue] === storeValue
  }
  if (itemView.section === "companies") {
    const map: Record<string, string> = {
      all: "all",
      "pending-verification": "pending-verification",
      "recruiter-agencies": "recruiter-agencies",
    }
    return map[itemValue] === storeValue
  }
  return false
}

export function Sidebar({ collapsed = false, onToggleCollapse, user, className }: SidebarProps) {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([])
  const adminView = useAdminView(state => state.view)

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label])
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
          {adminNav.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <h4 className="mb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] dark:text-gray-500">
                  {section.title}
                </h4>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const itemView = getViewFromItem(item)
                  const active = isViewActive(itemView, adminView)
                  return (
                    <SidebarLink
                      key={item.label}
                      item={item}
                      collapsed={collapsed}
                      isActive={active}
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
  item, collapsed, isActive, expandedItems, onToggleExpand,
}: {
  item: SidebarItem; collapsed: boolean; isActive: boolean; expandedItems: string[]; onToggleExpand: (label: string) => void
}) {
  const hasChildren = item.children && item.children.length > 0
  const isExpanded = expandedItems.includes(item.label)
  const Icon = item.icon

  const linkContent = (asLink = true) => {
    const cls = cn(
      "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150",
      isActive ? "bg-[#2563eb]/10 text-[#2563eb] dark:bg-[#818cf8]/10 dark:text-[#818cf8]"
        : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
    )
    const inner = (<>
      <div className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-150",
        isActive ? "bg-[#2563eb] text-white shadow-md shadow-[#2563eb]/25 dark:bg-[#818cf8] dark:shadow-[#818cf8]/25"
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
                {item.children!.map((child) => (
                  <Link key={child.href} href={child.href}
                    className="flex items-center rounded-lg px-3 py-1.5 text-[13px] text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white">
                    {child.label}
                  </Link>
                ))}
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