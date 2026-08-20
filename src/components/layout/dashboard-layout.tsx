"use client"

import * as React from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Search, Bell, MessageSquare, ChevronDown, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-media-query"
import { Sidebar } from "@/components/layout/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

type UserRole = "admin" | "employer" | "jobseeker" | "recruiter"

interface DashboardLayoutProps {
  children: React.ReactNode
  user?: { name: string; email: string; avatar?: string; role: UserRole }
  header?: React.ReactNode
  className?: string
}

const roleLabels: Record<UserRole, string> = {
  admin: "Super Admin",
  employer: "Employer",
  recruiter: "Recruiter",
  jobseeker: "Job Seeker",
}

const profileMenus: Record<UserRole, { label: string; href: string }[]> = {
  admin: [
    { label: "Visit Website", href: "/" },
    { label: "Admin Profile", href: "/admin/settings" },
    { label: "Security", href: "/admin/settings?tab=security" },
    { label: "Users", href: "/admin/users" },
    { label: "Dashboard", href: "/admin" },
  ],
  employer: [
    { label: "Visit Website", href: "/" },
    { label: "Company Profile", href: "/employer/company" },
    { label: "My Jobs", href: "/employer/jobs" },
    { label: "Applications", href: "/employer/applications" },
    { label: "Interviews", href: "/employer/interviews" },
  ],
  recruiter: [
    { label: "Visit Website", href: "/" },
    { label: "Company Profile", href: "/employer/company" },
    { label: "My Jobs", href: "/employer/jobs" },
  ],
  jobseeker: [
    { label: "Visit Website", href: "/" },
    { label: "My Profile", href: "/job-seeker/profile" },
    { label: "My Resume", href: "/job-seeker/resume" },
    { label: "Applications", href: "/job-seeker/applications" },
    { label: "Saved Jobs", href: "/job-seeker/saved-jobs" },
  ],
}

const mockNotifications = [
  { id: 1, title: "Application Update", message: "Your application was shortlisted", time: "2m ago", read: false },
  { id: 2, title: "New Message", message: "You have a new message from TechNova", time: "15m ago", read: false },
  { id: 3, title: "Interview Scheduled", message: "Interview confirmed for tomorrow", time: "1h ago", read: true },
  { id: 4, title: "Job Match", message: "3 new jobs match your profile", time: "2h ago", read: true },
]

export function DashboardLayout({ children, user, header, className }: DashboardLayoutProps) {
  const isMobile = useIsMobile()
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const role = user?.role || "jobseeker"
  const unreadCount = mockNotifications.filter((n) => !n.read).length

  const defaultHeader = (
    <div className="flex items-center gap-3">
      {/* Page title area (left) */}
      <div className="flex-1" />

      {/* Search */}
      <div className="hidden md:block relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
        <Input
          placeholder={role === "admin" ? "Search users, jobs, companies..." : "Search..."}
          className="h-9 w-64 pl-9 text-sm bg-[#f8fafc] dark:bg-white/5"
        />
      </div>

      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white">
            <Bell className="h-[18px] w-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ef4444] text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Notifications</span>
            <Badge size="sm">{unreadCount} new</Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ScrollArea className="max-h-72">
            {mockNotifications.map((n) => (
              <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 py-3 cursor-pointer">
                <div className="flex w-full items-center justify-between">
                  <span className={cn("text-sm font-medium", !n.read && "text-[#0f172a] dark:text-white")}>{n.title}</span>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-[#2563eb]" />}
                </div>
                <p className="text-xs text-[#64748b] dark:text-gray-400">{n.message}</p>
                <p className="text-[10px] text-[#94a3b8] dark:text-gray-500">{n.time}</p>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="justify-center text-xs font-medium text-[#2563eb] dark:text-[#818cf8]">
            <Link href={`/${role === "jobseeker" ? "job-seeker" : role}/notifications`}>View all notifications</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Messages */}
      <Link
        href={`/${role === "jobseeker" ? "job-seeker" : role}/messages`}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
      >
        <MessageSquare className="h-[18px] w-[18px]" />
      </Link>

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#f1f5f9] dark:hover:bg-white/5">
            <Avatar size="sm">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>
                {user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-[#0f172a] dark:text-white leading-none">{user?.name || "User"}</p>
              <p className="text-[10px] font-medium text-[#2563eb] dark:text-[#818cf8]">{roleLabels[role]}</p>
            </div>
            <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-[#94a3b8]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-xs font-normal text-muted-foreground">{user?.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {profileMenus[role].map((item) => (
            <DropdownMenuItem key={item.label} asChild>
              <Link href={item.href}>{item.label}</Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500 focus:text-red-500"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] dark:bg-[#0a0a0f]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} user={user} />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed inset-y-0 left-0 z-50 lg:hidden">
              <Sidebar collapsed={false} onToggleCollapse={() => setMobileOpen(false)} user={user} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-[#e2e8f0] bg-white/80 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a0f]/80 sm:px-6">
          <button onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a] lg:hidden dark:text-gray-400 dark:hover:bg-white/5">
            <Menu className="h-5 w-5" />
          </button>
          {header || defaultHeader}
        </header>

        {/* Page Content */}
        <main className={cn("flex-1 overflow-y-auto", className)}>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
