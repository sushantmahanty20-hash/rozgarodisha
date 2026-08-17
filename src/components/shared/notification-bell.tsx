"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bell,
  Check,
  CheckCheck,
  Briefcase,
  MessageSquare,
  Calendar,
  AlertCircle,
  Info,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EmptyState } from "@/components/ui/empty-state"

interface Notification {
  id: string
  type: "application" | "interview" | "offer" | "message" | "system"
  title: string
  message: string
  time: string | Date
  read: boolean
  link?: string
}

interface NotificationBellProps {
  notifications: Notification[]
  onMarkRead?: (id: string) => void
  onMarkAllRead?: () => void
  onNotificationClick?: (notification: Notification) => void
  onViewAll?: () => void
  className?: string
}

const typeConfig: Record<
  Notification["type"],
  { icon: React.ReactNode; color: string }
> = {
  application: {
    icon: <Briefcase className="h-4 w-4" />,
    color: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  },
  interview: {
    icon: <Calendar className="h-4 w-4" />,
    color: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  },
  offer: {
    icon: <AlertCircle className="h-4 w-4" />,
    color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  message: {
    icon: <MessageSquare className="h-4 w-4" />,
    color: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  system: {
    icon: <Info className="h-4 w-4" />,
    color: "bg-gray-500/15 text-gray-600 dark:text-gray-400",
  },
}

function formatNotificationTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function NotificationBell({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onNotificationClick,
  onViewAll,
  className,
}: NotificationBellProps) {
  const unreadCount = notifications.filter((n) => !n.read).length
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("relative h-10 w-10", className)}
        >
          <Bell className="h-5 w-5" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white"
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[380px] p-0"
        sideOffset={8}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-sm font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={() => {
                onMarkAllRead?.()
              }}
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </Button>
          )}
        </div>

        <Separator />

        {notifications.length === 0 ? (
          <div className="py-8">
            <EmptyState
              icon={<Bell className="h-10 w-10 text-muted-foreground/30" />}
              title="No notifications"
              description="You're all caught up!"
            />
          </div>
        ) : (
          <ScrollArea className="max-h-[400px]">
            <div className="divide-y">
              {notifications.map((notification) => {
                const config = typeConfig[notification.type]
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(
                      "flex gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-muted/50",
                      !notification.read && "bg-primary/5"
                    )}
                    onClick={() => {
                      onNotificationClick?.(notification)
                      if (!notification.read) {
                        onMarkRead?.(notification.id)
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                        config.color
                      )}
                    >
                      {config.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={cn(
                            "text-sm leading-tight",
                            !notification.read && "font-medium"
                          )}
                        >
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground/70">
                        {formatNotificationTime(notification.time)}
                      </p>
                    </div>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          onMarkRead?.(notification.id)
                        }}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </ScrollArea>
        )}

        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-2">
              <Button
                variant="ghost"
                className="w-full justify-center text-sm"
                onClick={() => {
                  setOpen(false)
                  onViewAll?.()
                }}
              >
                View all notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { NotificationBell }
export type { Notification, NotificationBellProps }
