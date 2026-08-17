"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Briefcase,
  Building2,
  Users,
  FileText,
  Clock,
  ArrowRight,
  Command,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SearchResult {
  id: string
  type: "job" | "company" | "person" | "article"
  title: string
  subtitle: string
  url: string
}

interface GlobalSearchProps {
  className?: string
}

const recentSearches = ["React developer jobs", "Remote positions", "TechCorp"]

const defaultResults: SearchResult[] = [
  { id: "1", type: "job", title: "Senior Frontend Developer", subtitle: "TechCorp · Remote · $160k-$200k", url: "#" },
  { id: "2", type: "job", title: "React Engineer", subtitle: "StartupXYZ · San Francisco · $140k-$180k", url: "#" },
  { id: "3", type: "company", title: "TechCorp", subtitle: "Technology · 500-1000 employees", url: "#" },
  { id: "4", type: "company", title: "StartupXYZ", subtitle: "SaaS · 50-100 employees", url: "#" },
  { id: "5", type: "person", title: "Sarah Chen", subtitle: "Senior Frontend Developer at TechCorp", url: "#" },
  { id: "6", type: "article", title: "10 Tips for Remote Job Interviews", subtitle: "Career Advice · 5 min read", url: "#" },
]

const typeConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  job: { icon: <Briefcase className="h-4 w-4" />, label: "Jobs", color: "text-blue-500" },
  company: { icon: <Building2 className="h-4 w-4" />, label: "Companies", color: "text-emerald-500" },
  person: { icon: <Users className="h-4 w-4" />, label: "People", color: "text-violet-500" },
  article: { icon: <FileText className="h-4 w-4" />, label: "Articles", color: "text-amber-500" },
}

function GlobalSearch({ className }: GlobalSearchProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  React.useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    setLoading(true)
    const timer = setTimeout(() => {
      setResults(defaultResults.filter(
        (r) => r.title.toLowerCase().includes(query.toLowerCase()) ||
               r.subtitle.toLowerCase().includes(query.toLowerCase())
      ))
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [query])

  React.useEffect(() => {
    setSelectedIndex(0)
  }, [results])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    }
  }

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) acc[result.type] = []
    acc[result.type].push(result)
    return acc
  }, {} as Record<string, SearchResult[]>)

  const quickActions = [
    { label: "Post a job", icon: <Briefcase className="h-4 w-4" /> },
    { label: "View applications", icon: <FileText className="h-4 w-4" /> },
    { label: "Profile settings", icon: <Users className="h-4 w-4" /> },
  ]

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "flex h-10 w-full items-center gap-2 rounded-xl border bg-background px-3 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:bg-muted/30",
          className
        )}
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-2xl border bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 border-b px-4">
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search jobs, companies, people, articles..."
                  className="flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
                />
                {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg border bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground"
                >
                  ESC
                </button>
              </div>

              <ScrollArea className="max-h-[400px]">
                {!query.trim() ? (
                  <div className="p-4 space-y-4">
                    {recentSearches.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground px-1">Recent Searches</p>
                        {recentSearches.map((search) => (
                          <button
                            key={search}
                            onClick={() => setQuery(search)}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted/50 transition-colors"
                          >
                            <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="flex-1 text-left">{search}</span>
                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground px-1">Quick Actions</p>
                      {quickActions.map((action) => (
                        <button
                          key={action.label}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            {action.icon}
                          </div>
                          <span className="flex-1 text-left">{action.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : loading ? (
                  <div className="p-4 space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-9 w-9 rounded-lg" />
                        <div className="space-y-1.5 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : results.length === 0 ? (
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    No results found for &quot;{query}&quot;
                  </div>
                ) : (
                  <div className="p-2">
                    {Object.entries(groupedResults).map(([type, items]) => (
                      <div key={type} className="mb-2">
                        <div className="flex items-center gap-2 px-3 py-1.5">
                          <span className={cn("flex items-center gap-1.5 text-xs font-medium", typeConfig[type]?.color)}>
                            {typeConfig[type]?.icon}
                            {typeConfig[type]?.label}
                          </span>
                          <Badge variant="secondary" size="sm">{items.length}</Badge>
                        </div>
                        {items.map((result, i) => {
                          const globalIndex = results.indexOf(result)
                          return (
                            <button
                              key={result.id}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                                selectedIndex === globalIndex ? "bg-muted" : "hover:bg-muted/50"
                              )}
                            >
                              {result.type === "person" ? (
                                <Avatar size="sm">
                                  <AvatarFallback>{result.title.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                </Avatar>
                              ) : (
                                <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg bg-muted", typeConfig[type]?.color)}>
                                  {typeConfig[type]?.icon}
                                </div>
                              )}
                              <div className="min-w-0 flex-1 text-left">
                                <p className="font-medium truncate">{result.title}</p>
                                <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                              </div>
                              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            </button>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export { GlobalSearch }
