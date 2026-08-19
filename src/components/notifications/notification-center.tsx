"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bell,
  Settings,
  Check,
  Inbox,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NotificationItem } from "@/components/notifications/notification-item"

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

interface NotificationCenterProps {
  className?: string
}

const defaultNotifications: Notification[] = [
  { id: "1", type: "email", title: "New job match", message: "5 new jobs match your profile in React development", time: "2m ago", read: false, actionLabel: "View Jobs" },
  { id: "2", type: "system", title: "Profile completed", message: "Your profile is now 95% complete. Add a portfolio to reach 100%.", time: "1h ago", read: false },
  { id: "3", type: "push", title: "Application update", message: "Your application to TechCorp was viewed by the hiring manager", time: "3h ago", read: false, actionLabel: "View Status" },
  { id: "4", type: "email", title: "Interview reminder", message: "You have an interview with StartupXYZ tomorrow at 10:00 AM", time: "5h ago", read: true, actionLabel: "View Details" },
  { id: "5", type: "sms", title: "Verification code", message: "Your verification code is 482910. It expires in 10 minutes.", time: "1d ago", read: true },
  { id: "6", type: "system", title: "Security alert", message: "New login detected from Chrome on Windows. Was this you?", time: "2d ago", read: true, actionLabel: "Review Activity" },
]

function NotificationCenter({ className }: NotificationCenterProps) {
  const [notifications, setNotifications] = React.useState(defaultNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  const dismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const tabs = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
    { value: "mentions", label: "Mentions" },
    { value: "system", label: "System" },
  ]

  const filterNotifications = (tab: string) => {
    switch (tab) {
      case "unread": return notifications.filter((n) => !n.read)
      case "mentions": return notifications.filter((n) => n.title.toLowerCase().includes("mention") || n.message.toLowerCase().includes("mention"))
      case "system": return notifications.filter((n) => n.type === "system")
      default: return notifications
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Card variant="glass">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" size="sm">{unreadCount}</Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllRead}>
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="w-full mb-4">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="flex-1">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2 pr-2">
                    <AnimatePresence mode="popLayout">
                      {filterNotifications(tab.value).length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center py-12 text-center"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
                            <Inbox className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <p className="text-sm font-medium">No notifications</p>
                          <p className="text-xs text-muted-foreground mt-1">You&apos;re all caught up!</p>
                        </motion.div>
                      ) : (
                        filterNotifications(tab.value).map((notification) => (
                          <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onRead={markRead}
                            onDismiss={dismiss}
                          />
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export { NotificationCenter }
export type { Notification, NotificationCenterProps }
