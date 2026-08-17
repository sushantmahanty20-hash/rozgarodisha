"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Conversation {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  online: boolean
}

interface ConversationItemProps {
  conversation: Conversation
  isActive: boolean
  onClick: () => void
  className?: string
}

function ConversationItem({
  conversation,
  isActive,
  onClick,
  className,
}: ConversationItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all duration-150",
        isActive
          ? "bg-primary/10 border border-primary/20"
          : "hover:bg-muted/50 border border-transparent"
      )}
    >
      <div className="relative shrink-0">
        <Avatar size="md">
          <AvatarImage src={conversation.avatar} alt={conversation.name} />
          <AvatarFallback>{conversation.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        {conversation.online && (
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className={cn(
            "text-sm font-medium truncate",
            conversation.unreadCount > 0 && "font-bold"
          )}>
            {conversation.name}
          </p>
          <span className="text-[10px] text-muted-foreground shrink-0">
            {conversation.lastMessageTime}
          </span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className={cn(
            "text-xs truncate",
            conversation.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"
          )}>
            {conversation.lastMessage}
          </p>
          {conversation.unreadCount > 0 && (
            <div className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground shrink-0">
              {conversation.unreadCount}
            </div>
          )}
        </div>
      </div>
    </motion.button>
  )
}

export { ConversationItem }
export type { Conversation, ConversationItemProps }
