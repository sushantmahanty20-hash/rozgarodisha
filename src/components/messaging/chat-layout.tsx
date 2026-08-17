"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Plus, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ConversationItem } from "@/components/messaging/conversation-item"
import { MessageList } from "@/components/messaging/message-list"
import { MessageInput } from "@/components/messaging/message-input"

interface Conversation {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  online: boolean
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  read: boolean
}

interface ChatLayoutProps {
  className?: string
}

const defaultConversations: Conversation[] = [
  { id: "1", name: "Sarah Chen", lastMessage: "Thanks for the update!", lastMessageTime: "2m ago", unreadCount: 2, online: true },
  { id: "2", name: "Marcus Johnson", lastMessage: "Let's schedule a call", lastMessageTime: "1h ago", unreadCount: 0, online: true },
  { id: "3", name: "Emily Rodriguez", lastMessage: "The project looks great", lastMessageTime: "3h ago", unreadCount: 1, online: false },
  { id: "4", name: "David Kim", lastMessage: "I'll send the files today", lastMessageTime: "1d ago", unreadCount: 0, online: false },
  { id: "5", name: "Lisa Wang", lastMessage: "See you tomorrow!", lastMessageTime: "2d ago", unreadCount: 0, online: true },
]

const defaultMessages: Record<string, Message[]> = {
  "1": [
    { id: "m1", senderId: "other", content: "Hi! How's the project going?", timestamp: new Date(Date.now() - 300000), read: true },
    { id: "m2", senderId: "me", content: "Going well! Just finished the main feature.", timestamp: new Date(Date.now() - 240000), read: true },
    { id: "m3", senderId: "other", content: "Thanks for the update!", timestamp: new Date(Date.now() - 120000), read: false },
  ],
  "2": [
    { id: "m4", senderId: "me", content: "When are you available for a call?", timestamp: new Date(Date.now() - 3600000), read: true },
    { id: "m5", senderId: "other", content: "Let's schedule a call", timestamp: new Date(Date.now() - 3500000), read: true },
  ],
  "3": [
    { id: "m6", senderId: "other", content: "The project looks great", timestamp: new Date(Date.now() - 7200000), read: false },
  ],
  "4": [
    { id: "m7", senderId: "other", content: "I'll send the files today", timestamp: new Date(Date.now() - 86400000), read: true },
  ],
  "5": [
    { id: "m8", senderId: "other", content: "See you tomorrow!", timestamp: new Date(Date.now() - 172800000), read: true },
  ],
}

function ChatLayout({ className }: ChatLayoutProps) {
  const [selectedId, setSelectedId] = React.useState<string>("1")
  const [search, setSearch] = React.useState("")
  const [conversations, setConversations] = React.useState(defaultConversations)
  const [messages, setMessages] = React.useState(defaultMessages)

  const selectedConversation = conversations.find((c) => c.id === selectedId)

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSendMessage = (content: string) => {
    if (!selectedId) return
    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: "me",
      content,
      timestamp: new Date(),
      read: true,
    }
    setMessages((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMessage],
    }))
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? { ...c, lastMessage: content, lastMessageTime: "Just now" }
          : c
      )
    )
  }

  return (
    <div className={cn("flex h-[calc(100vh-12rem)] rounded-2xl border bg-card/50 backdrop-blur-sm overflow-hidden", className)}>
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Messages</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="px-2 pb-2">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isActive={selectedId === conversation.id}
                onClick={() => setSelectedId(conversation.id)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="border-b p-4 flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-medium">
                  {selectedConversation.name.split(" ").map(n => n[0]).join("")}
                </div>
                {selectedConversation.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold">{selectedConversation.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedConversation.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            <MessageList
              messages={messages[selectedId] || []}
              currentUserId="me"
            />

            <MessageInput onSend={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  )
}

export { ChatLayout }
