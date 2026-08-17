"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Bell,
  BellOff,
  Trash2,
  Play,
  Bookmark,
  Filter,
  MapPin,
  DollarSign,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { EmptyState } from "@/components/ui/empty-state"

interface SavedSearch {
  id: string
  query: string
  filters: string[]
  resultCount: number
  notifications: boolean
  createdAt: string
}

interface SavedSearchesProps {
  searches?: SavedSearch[]
  onRun?: (id: string) => void
  onDelete?: (id: string) => void
  onToggleNotification?: (id: string) => void
  className?: string
}

const defaultSearches: SavedSearch[] = [
  {
    id: "1",
    query: "React Developer",
    filters: ["Remote", "$120k+", "Full-time"],
    resultCount: 45,
    notifications: true,
    createdAt: "2 days ago",
  },
  {
    id: "2",
    query: "Frontend Engineer",
    filters: ["San Francisco", "Hybrid"],
    resultCount: 23,
    notifications: true,
    createdAt: "5 days ago",
  },
  {
    id: "3",
    query: "Senior TypeScript",
    filters: ["Remote", "Contract"],
    resultCount: 12,
    notifications: false,
    createdAt: "1 week ago",
  },
  {
    id: "4",
    query: "Full Stack Developer",
    filters: ["New York", "$150k+", "Full-time"],
    resultCount: 8,
    notifications: false,
    createdAt: "2 weeks ago",
  },
]

const filterIcons: Record<string, React.ReactNode> = {
  Remote: <MapPin className="h-3 w-3" />,
  Hybrid: <MapPin className="h-3 w-3" />,
  "On-site": <MapPin className="h-3 w-3" />,
  "Full-time": <Briefcase className="h-3 w-3" />,
  Contract: <Briefcase className="h-3 w-3" />,
}

function SavedSearches({
  searches = defaultSearches,
  onRun,
  onDelete,
  onToggleNotification,
  className,
}: SavedSearchesProps) {
  const [localSearches, setLocalSearches] = React.useState(searches)

  const handleDelete = (id: string) => {
    setLocalSearches((prev) => prev.filter((s) => s.id !== id))
    onDelete?.(id)
  }

  const handleToggleNotification = (id: string) => {
    setLocalSearches((prev) =>
      prev.map((s) => s.id === id ? { ...s, notifications: !s.notifications } : s)
    )
    onToggleNotification?.(id)
  }

  return (
    <div className={cn("space-y-6", className)}>
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-primary" />
            Saved Searches
          </CardTitle>
          <CardDescription>Manage your saved job searches</CardDescription>
        </CardHeader>
        <CardContent>
          {localSearches.length === 0 ? (
            <EmptyState
              icon={<Search className="h-12 w-12" />}
              title="No saved searches"
              description="Save a search to get notified about new matching jobs"
            />
          ) : (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {localSearches.map((search, i) => (
                  <motion.div
                    key={search.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border p-4 space-y-3 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                          <Search className="h-4 w-4 text-primary" />
                          {search.query}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Created {search.createdAt}
                        </p>
                      </div>
                      <Badge variant="secondary" size="sm">
                        {search.resultCount} results
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {search.filters.map((filter) => (
                        <Badge key={filter} variant="outline" size="sm" className="gap-1">
                          {filterIcons[filter] || <Filter className="h-3 w-3" />}
                          {filter}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t pt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Alerts</span>
                        <Switch
                          checked={search.notifications}
                          onCheckedChange={() => handleToggleNotification(search.id)}
                        />
                        <span className="text-xs text-muted-foreground">
                          {search.notifications ? "On" : "Off"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(search.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          Delete
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => onRun?.(search.id)}
                        >
                          <Play className="h-3.5 w-3.5 mr-1" />
                          Run Search
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export { SavedSearches }
export type { SavedSearch, SavedSearchesProps }
