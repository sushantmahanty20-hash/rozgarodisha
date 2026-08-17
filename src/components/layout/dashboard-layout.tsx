"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-media-query"
import { Sidebar } from "@/components/layout/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  user?: {
    name: string
    email: string
    avatar?: string
    role: "admin" | "employer" | "jobseeker"
  }
  header?: React.ReactNode
  className?: string
}

export function DashboardLayout({
  children,
  user,
  header,
  className,
}: DashboardLayoutProps) {
  const isMobile = useIsMobile()
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          user={user}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <Sidebar
                collapsed={false}
                onToggleCollapse={() => setMobileOpen(false)}
                user={user}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 backdrop-blur-xl px-4 sm:px-6">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {header ? (
            <div className="flex-1">{header}</div>
          ) : (
            <div className="flex-1" />
          )}
        </header>

        {/* Page Content */}
        <main className={cn("flex-1 overflow-y-auto bg-muted/30", className)}>
          <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
