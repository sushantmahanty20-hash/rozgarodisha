"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Smartphone,
  Bell,
  Server,
  X,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type NotificationType = "email" | "sms" | "push" | "system"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  time: string
  read: boolean
  actionLabel?: string
  actionUrl?: string
}

interface NotificationItemProps {
  notification: Notification
  onRead?: (id: string) => void
  onDismiss?: (id: string) => void
  className?: string
}

const typeConfig: Record<NotificationType, { icon: React.ReactNode; color: string; bgColor: string }> = {
  email: { icon: <Mail className="h-4 w-4" />, color: "text-blue-500", bgColor: "bg-blue-500/15" },
  sms: { icon: <Smartphone className="h-4 w-4" />, color: "text-amber-500", bgColor: "bg-amber-500/15" },
  push: { icon: <Bell className="h-4 w-4" />, color: "text-violet-500", bgColor: "bg-violet-500/15" },
  system: { icon: <Server className="h-4 w-4" />, color: "text-emerald-500", bgColor: "bg-emerald-500/15" },
}

function NotificationItem({
  notification,
  onRead,
  onDismiss,
  className,
}: NotificationItemProps) {
  const config = typeConfig[notification.type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10, height: 0 }}
      className={cn(
        "group relative flex gap-3 rounded-xl border p-3 transition-all duration-200",
        notification.read
          ? "bg-background/50"
          : "bg-primary/5 border-primary/10 hover:bg-primary/8",
        className
      )}
      onClick={() => !notification.read && onRead?.(notification.id)}
    >
      {!notification.read && (
        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary" />
      )}

      <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", config.bgColor, config.color)}>
        {config.icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
            {notification.title}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); onDismiss?.(notification.id) }}
            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notification.message}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] text-muted-foreground">{notification.time}</span>
          {notification.actionLabel && (
            <Button variant="ghost" size="sm" className="h-6 text-xs gap-1">
              {notification.actionLabel}
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export { NotificationItem }
export type { NotificationType, Notification, NotificationItemProps }
