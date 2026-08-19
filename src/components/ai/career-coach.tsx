"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send,
  Bot,
  User,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface CareerCoachProps {
  className?: string
}

const suggestedPrompts = [
  "How can I transition to a senior role?",
  "What skills should I learn next?",
  "Help me prepare for a salary negotiation",
  "Review my career trajectory",
]

const initialMessages: Message[] = [
  {
    id: "0",
    role: "assistant",
    content: "Hi! I'm your AI career coach. I can help you with career planning, skill development, interview preparation, and more. What would you like to discuss?",
    timestamp: new Date(),
  },
]

const aiResponses: Record<string, string> = {
  default: "That's a great question! Based on current industry trends, I'd recommend focusing on building both technical and leadership skills. Would you like me to elaborate on any specific area?",
  senior: "To transition to a senior role, focus on: 1) Leading projects end-to-end, 2) Mentoring junior developers, 3) Contributing to architectural decisions, 4) Building cross-team relationships, 5) Developing system design expertise.",
  skills: "Based on market demand, here are the top skills to learn: React/TypeScript (if not already), Cloud platforms (AWS/GCP), System Design, and Leadership skills. I can create a personalized learning path for you.",
  negotiate: "For salary negotiation: Research market rates, document your achievements, practice your pitch, and always negotiate the full package (base, equity, bonus, benefits). Confidence is key!",
  trajectory: "Your career trajectory looks promising! Consider specializing in an area where you have passion and market demand intersects. Would you like to explore specific growth paths?",
}

function CareerCoach({ className }: CareerCoachProps) {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages)
  const [input, setInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text?: string) => {
    const content = text || input.trim()
    if (!content) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const responseKey = Object.keys(aiResponses).find((key) =>
      content.toLowerCase().includes(key)
    ) || "default"

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: aiResponses[responseKey],
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, assistantMessage])
    setIsTyping(false)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Card variant="glass" className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <Bot className="h-4 w-4 text-white" />
            </div>
            AI Career Coach
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] px-4" ref={scrollRef}>
            <div className="space-y-4 pb-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <Avatar size="sm" className="shrink-0 mt-1">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted/50 backdrop-blur-sm rounded-tl-sm"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={cn(
                        "text-[10px] mt-1",
                        message.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"
                      )}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <Avatar size="sm" className="shrink-0 mt-1">
                        <AvatarFallback className="bg-muted">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <Avatar size="sm" className="shrink-0 mt-1">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl rounded-tl-sm bg-muted/50 backdrop-blur-sm px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                        className="h-2 w-2 rounded-full bg-primary/50"
                      />
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                        className="h-2 w-2 rounded-full bg-primary/50"
                      />
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                        className="h-2 w-2 rounded-full bg-primary/50"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t p-4 space-y-3">
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt) => (
                  <Button
                    key={prompt}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => handleSend(prompt)}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    {prompt}
                  </Button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Ask me anything about your career..."
                className="flex-1 rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <Button
                size="icon"
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { CareerCoach }
export type { Message, CareerCoachProps }
