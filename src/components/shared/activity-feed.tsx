"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Briefcase,
  CalendarCheck,
  Gift,
  MessageSquare,
  Settings,
  FileText,
  ChevronDown,
} from "lucide-react"
import { cn, formatRelativeTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ActivityItem {
  id: string
  type: "application" | "interview" | "offer" | "message" | "system"
  title: string
  description: string
  timestamp: string | Date
}

interface ActivityFeedProps {
  activities: ActivityItem[]
  onLoadMore?: () => void
  hasMore?: boolean
  className?: string
}

const typeConfig: Record<
  ActivityItem["type"],
  { icon: React.ReactNode; color: string; lineColor: string }
> = {
  application: {
    icon: <Briefcase className="h-3.5 w-3.5" />,
    color: "bg-blue-500/15 text-blue-600 ring-blue-500/20",
    lineColor: "bg-blue-500/30",
  },
  interview: {
    icon: <CalendarCheck className="h-3.5 w-3.5" />,
    color: "bg-purple-500/15 text-purple-600 ring-purple-500/20",
    lineColor: "bg-purple-500/30",
  },
  offer: {
    icon: <Gift className="h-3.5 w-3.5" />,
    color: "bg-emerald-500/15 text-emerald-600 ring-emerald-500/20",
    lineColor: "bg-emerald-500/30",
  },
  message: {
    icon: <MessageSquare className="h-3.5 w-3.5" />,
    color: "bg-amber-500/15 text-amber-600 ring-amber-500/20",
    lineColor: "bg-amber-500/30",
  },
  system: {
    icon: <Settings className="h-3.5 w-3.5" />,
    color: "bg-gray-500/15 text-gray-600 ring-gray-500/20",
    lineColor: "bg-gray-500/30",
  },
}

function ActivityFeed({
  activities,
  onLoadMore,
  hasMore = false,
  className,
}: ActivityFeedProps) {
  return (
    <div className={cn("space-y-0", className)}>
      <div className="relative">
        {activities.map((activity, index) => {
          const config = typeConfig[activity.type]
          const isLast = index === activities.length - 1

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative flex gap-4 pb-6"
            >
              {!isLast && (
                <div
                  className={cn(
                    "absolute left-[17px] top-10 h-full w-px",
                    config.lineColor
                  )}
                />
              )}

              <div
                className={cn(
                  "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-4 ring-background",
                  config.color
                )}
              >
                {config.icon}
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  {formatRelativeTime(activity.timestamp)}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLoadMore}
            className="gap-1.5 text-muted-foreground"
          >
            <ChevronDown className="h-4 w-4" />
            Load more
          </Button>
        </div>
      )}

      {!hasMore && activities.length > 0 && (
        <div className="flex justify-center pt-2">
          <p className="text-xs text-muted-foreground/50">
            You&apos;re all caught up!
          </p>
        </div>
      )}
    </div>
  )
}

export { ActivityFeed }
export type { ActivityItem, ActivityFeedProps }
