"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase,
  LayoutDashboard,
  FileText,
  Building2,
  Bookmark,
  Bell,
  Settings,
  Users,
  BarChart3,
  MessageSquare,
  HelpCircle,
  Shield,
  Megaphone,
  CreditCard,
  Globe,
  ChevronLeft,
  ChevronDown,
  LogOut,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type UserRole = "admin" | "employer" | "jobseeker"

interface SidebarItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: string | number
  roles?: UserRole[]
  children?: { label: string; href: string }[]
}

interface SidebarSection {
  title: string
  items: SidebarItem[]
  roles?: UserRole[]
}

interface SidebarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
  user?: {
    name: string
    email: string
    avatar?: string
    role: UserRole
  }
  className?: string
}

const sidebarSections: SidebarSection[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: 5 },
      { label: "Messages", href: "/dashboard/messages", icon: MessageSquare, badge: "New" },
    ],
  },
  {
    title: "Jobs",
    items: [
      {
        label: "Job Listings",
        href: "/dashboard/jobs",
        icon: FileText,
        children: [
          { label: "All Jobs", href: "/dashboard/jobs" },
          { label: "Active", href: "/dashboard/jobs?status=active" },
          { label: "Draft", href: "/dashboard/jobs?status=draft" },
          { label: "Closed", href: "/dashboard/jobs?status=closed" },
        ],
      },
      { label: "Applications", href: "/dashboard/applications", icon: Briefcase, badge: 12 },
      { label: "Saved Jobs", href: "/dashboard/saved", icon: Bookmark },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Company Profile", href: "/dashboard/company", icon: Building2, roles: ["employer", "admin"] },
      { label: "Team Members", href: "/dashboard/team", icon: Users, roles: ["employer", "admin"] },
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, roles: ["employer", "admin"] },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Blog Posts", href: "/dashboard/blog", icon: FileText, roles: ["admin"] },
      { label: "Career Advice", href: "/dashboard/advice", icon: Globe, roles: ["admin"] },
      { label: "Testimonials", href: "/dashboard/testimonials", icon: MessageSquare, roles: ["admin"] },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Manage Users", href: "/dashboard/users", icon: Users, roles: ["admin"] },
      { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
      { label: "Announcements", href: "/dashboard/announcements", icon: Megaphone, roles: ["admin"] },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
      { label: "Help & Support", href: "/dashboard/support", icon: HelpCircle },
    ],
  },
]

function SidebarLink({
  item,
  collapsed,
  isActive,
  expandedItems,
  onToggleExpand,
}: {
  item: SidebarItem
  collapsed: boolean
  isActive: boolean
  expandedItems: string[]
  onToggleExpand: (label: string) => void
}) {
  const hasChildren = item.children && item.children.length > 0
  const isExpanded = expandedItems.includes(item.label)
  const Icon = item.icon

  if (hasChildren && !collapsed) {
    return (
      <div>
        <button
          onClick={() => onToggleExpand(item.label)}
          className={cn(
            "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
            isActive
              ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
              isActive
                ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md shadow-primary/25"
                : "bg-muted text-muted-foreground group-hover:text-foreground group-hover:bg-muted/80"
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
          <span className="flex-1 text-left truncate">{item.label}</span>
          {item.badge && (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium",
                typeof item.badge === "number"
                  ? "bg-primary/10 text-primary"
                  : "bg-primary text-primary-foreground"
              )}
            >
              {item.badge}
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="ml-6 mt-1 space-y-0.5 border-l-2 border-primary/10 pl-3">
                {item.children!.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="flex items-center rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
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

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
      title={collapsed ? item.label : undefined}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
          isActive
            ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md shadow-primary/25"
            : "bg-muted text-muted-foreground group-hover:text-foreground group-hover:bg-muted/80"
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge && (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium",
                typeof item.badge === "number"
                  ? "bg-primary/10 text-primary"
                  : "bg-primary text-primary-foreground"
              )}
            >
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  )
}

export function Sidebar({
  collapsed = false,
  onToggleCollapse,
  user,
  className,
}: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = React.useState<string[]>([])

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    )
  }

  const filteredSections = sidebarSections.filter(
    (section) => !section.roles || (user?.role && section.roles.includes(user.role))
  )

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/" className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              className="bg-gradient-to-r from-primary to-accent bg-clip-text text-lg font-bold text-transparent whitespace-nowrap"
            >
              JobPortal
            </motion.span>
          )}
        </Link>
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                collapsed && "rotate-180"
              )}
            />
          </button>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-3">
        <nav className="space-y-6 px-3">
          {filteredSections.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <h4 className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {section.title}
                </h4>
              )}
              <div className="space-y-0.5">
                {section.items
                  .filter(
                    (item) =>
                      !item.roles || (user?.role && item.roles.includes(user.role))
                  )
                  .map((item) => (
                    <SidebarLink
                      key={item.label}
                      item={item}
                      collapsed={collapsed}
                      isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                      expandedItems={expandedItems}
                      onToggleExpand={toggleExpand}
                    />
                  ))}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Section */}
      {user && (
        <div className="border-t p-3">
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent",
              collapsed && "justify-center px-0"
            )}
          >
            <Avatar size="sm">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            )}
            {!collapsed && (
              <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </aside>
  )
}
