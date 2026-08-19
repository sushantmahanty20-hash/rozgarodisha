"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, CheckCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  read: boolean
}

interface MessageListProps {
  messages: Message[]
  currentUserId: string
  className?: string
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function groupByDate(messages: Message[]) {
  const groups: { date: string; messages: Message[] }[] = []
  let currentGroup: string | null = null

  for (const msg of messages) {
    const dateStr = msg.timestamp.toLocaleDateString()
    if (dateStr !== currentGroup) {
      currentGroup = dateStr
      groups.push({ date: dateStr, messages: [msg] })
    } else {
      groups[groups.length - 1].messages.push(msg)
    }
  }
  return groups
}

function DateSeparator({ date }: { date: string }) {
  const d = new Date(date)
  const today = new Date()
  const isToday = d.toDateString() === today.toDateString()

  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-border/50" />
      <span className="text-[10px] text-muted-foreground font-medium">
        {isToday ? "Today" : d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </span>
      <div className="flex-1 h-px bg-border/50" />
    </div>
  )
}

function MessageBubble({ message, isOwn }: { message: Message; isOwn: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.15 }}
      className={cn("flex", isOwn ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2.5 text-sm",
          isOwn
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted/50 backdrop-blur-sm rounded-bl-sm"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <div className={cn(
          "flex items-center gap-1 mt-1",
          isOwn ? "justify-end" : "justify-start"
        )}>
          <span className={cn(
            "text-[10px]",
            isOwn ? "text-primary-foreground/60" : "text-muted-foreground"
          )}>
            {formatTime(message.timestamp)}
          </span>
          {isOwn && (
            message.read
              ? <CheckCheck className="h-3 w-3 text-primary-foreground/60" />
              : <Check className="h-3 w-3 text-primary-foreground/60" />
          )}
        </div>
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="flex justify-start"
    >
      <div className="rounded-2xl rounded-bl-sm bg-muted/50 backdrop-blur-sm px-4 py-3">
        <div className="flex gap-1">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
            className="h-2 w-2 rounded-full bg-muted-foreground/50"
          />
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
            className="h-2 w-2 rounded-full bg-muted-foreground/50"
          />
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
            className="h-2 w-2 rounded-full bg-muted-foreground/50"
          />
        </div>
      </div>
    </motion.div>
  )
}

function MessageList({ messages, currentUserId }: MessageListProps) {
  const endRef = React.useRef<HTMLDivElement>(null)
  const [isTyping] = React.useState(false)
  const grouped = groupByDate(messages)

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <ScrollArea className="flex-1 px-4">
      <div className="space-y-1 py-4">
        {grouped.map((group) => (
          <div key={group.date}>
            <DateSeparator date={group.date} />
            <div className="space-y-2">
              {group.messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isOwn={msg.senderId === currentUserId}
                />
              ))}
            </div>
          </div>
        ))}
        <AnimatePresence>
          {isTyping && <TypingIndicator />}
        </AnimatePresence>
        <div ref={endRef} />
      </div>
    </ScrollArea>
  )
}

export { MessageList }
export type { Message, MessageListProps }
