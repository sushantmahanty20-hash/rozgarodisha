"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Send,
  Paperclip,
  Smile,
  Mic,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MessageInputProps {
  onSend?: (content: string) => void
  placeholder?: string
  className?: string
}

const emojiGrid = [
  "😀", "😂", "😍", "🤔", "👍", "👋", "🎉", "🔥",
  "💪", "❤️", "⭐", "✅", "🚀", "💡", "🙏", "😊",
  "🤝", "💼", "📈", "🎯", "💻", "📞", "✉️", "📅",
]

function MessageInput({
  onSend,
  placeholder = "Type a message...",
  className,
}: MessageInputProps) {
  const [value, setValue] = React.useState("")
  const [showEmoji, setShowEmoji] = React.useState(false)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (!value.trim()) return
    onSend?.(value.trim())
    setValue("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    const el = e.target
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }

  const insertEmoji = (emoji: string) => {
    setValue((prev) => prev + emoji)
    setShowEmoji(false)
    textareaRef.current?.focus()
  }

  return (
    <div className={cn("border-t p-4 space-y-2", className)}>
      {showEmoji && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="rounded-xl border bg-card/95 backdrop-blur-xl p-3 shadow-xl"
        >
          <div className="grid grid-cols-8 gap-1">
            {emojiGrid.map((emoji) => (
              <button
                key={emoji}
                onClick={() => insertEmoji(emoji)}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors text-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="flex items-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0"
          onClick={() => {
            // File picker placeholder
          }}
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="w-full resize-none rounded-xl border bg-background px-4 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring max-h-[120px]"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => setShowEmoji(!showEmoji)}
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0"
        >
          <Mic className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          className="h-9 w-9 shrink-0"
          onClick={handleSend}
          disabled={!value.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-1 px-1">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] text-muted-foreground">Typing indicator active</span>
      </div>
    </div>
  )
}

export { MessageInput }
