"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  MessageSquarePlus,
  User,
  Calendar,
  Star,
} from "lucide-react"
import { cn, formatRelativeTime } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Candidate {
  id: string
  name: string
  avatar?: string
  position: string
  appliedAt: string | Date
  score?: number
  notes?: string
}

interface PipelineColumn {
  id: string
  title: string
  color: string
  candidates: Candidate[]
}

interface PipelineBoardProps {
  columns: PipelineColumn[]
  onMoveCandidate?: (
    candidateId: string,
    fromColumnId: string,
    toColumnId: string
  ) => void
  onAddNote?: (candidateId: string) => void
  className?: string
}

const columnColors: Record<string, string> = {
  applied: "from-blue-500 to-blue-600",
  screening: "from-amber-500 to-orange-500",
  shortlisted: "from-purple-500 to-violet-500",
  interview: "from-cyan-500 to-teal-500",
  offered: "from-emerald-500 to-green-500",
  rejected: "from-red-500 to-rose-500",
}

const columnBgColors: Record<string, string> = {
  applied: "bg-blue-500/10 border-blue-500/20",
  screening: "bg-amber-500/10 border-amber-500/20",
  shortlisted: "bg-purple-500/10 border-purple-500/20",
  interview: "bg-cyan-500/10 border-cyan-500/20",
  offered: "bg-emerald-500/10 border-emerald-500/20",
  rejected: "bg-red-500/10 border-red-500/20",
}

function ScoreBadge({ score }: { score: number }) {
  const variant =
    score >= 80 ? "success" : score >= 60 ? "warning" : "destructive"

  return (
    <Badge variant={variant} size="sm" className="gap-1">
      <Star className="h-3 w-3" />
      {score}
    </Badge>
  )
}

function CandidateCard({
  candidate,
  columnId,
  columnIndex,
  totalColumns,
  onMove,
  onAddNote,
}: {
  candidate: Candidate
  columnId: string
  columnIndex: number
  totalColumns: number
  onMove: (candidateId: string, direction: "left" | "right") => void
  onAddNote?: (candidateId: string) => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card variant="glass" className="p-3 group">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <Avatar size="sm">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback className="text-xs">
                  {candidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold leading-tight">
                  {candidate.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {candidate.position}
                </p>
              </div>
            </div>
            {candidate.score !== undefined && (
              <ScoreBadge score={candidate.score} />
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatRelativeTime(candidate.appliedAt)}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-border/50 pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-xs text-muted-foreground"
              onClick={() => onAddNote?.(candidate.id)}
            >
              <MessageSquarePlus className="h-3 w-3" />
              Note
            </Button>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                disabled={columnIndex === 0}
                onClick={() => onMove(candidate.id, "left")}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                disabled={columnIndex === totalColumns - 1}
                onClick={() => onMove(candidate.id, "right")}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function PipelineBoard({
  columns,
  onMoveCandidate,
  onAddNote,
  className,
}: PipelineBoardProps) {
  const handleMove = React.useCallback(
    (candidateId: string, columnId: string, direction: "left" | "right") => {
      const colIndex = columns.findIndex((c) => c.id === columnId)
      if (colIndex === -1) return
      const targetIndex = direction === "left" ? colIndex - 1 : colIndex + 1
      if (targetIndex < 0 || targetIndex >= columns.length) return
      const targetColumn = columns[targetIndex]
      onMoveCandidate?.(candidateId, columnId, targetColumn.id)
    },
    [columns, onMoveCandidate]
  )

  return (
    <div className={cn("w-full", className)}>
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4 min-w-max">
          {columns.map((column, colIndex) => {
            const colorKey = column.id.toLowerCase().replace(/\s+/g, "")
            const gradientClass =
              columnColors[colorKey] || "from-gray-500 to-gray-600"
            const bgClass =
              columnBgColors[colorKey] || "bg-gray-500/10 border-gray-500/20"

            return (
              <div
                key={column.id}
                className="w-[300px] shrink-0"
              >
                <div
                  className={cn(
                    "rounded-xl border p-3",
                    bgClass
                  )}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "h-2.5 w-2.5 rounded-full bg-gradient-to-r",
                          gradientClass
                        )}
                      />
                      <h3 className="text-sm font-semibold">
                        {column.title}
                      </h3>
                    </div>
                    <Badge variant="secondary" size="sm" className="h-5 px-1.5">
                      {column.candidates.length}
                    </Badge>
                  </div>

                  <div className="space-y-2 max-h-[calc(100vh-16rem)] overflow-y-auto">
                    {column.candidates.length === 0 ? (
                      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center">
                        <User className="h-8 w-8 text-muted-foreground/30" />
                        <p className="mt-2 text-xs text-muted-foreground">
                          No candidates
                        </p>
                      </div>
                    ) : (
                      column.candidates.map((candidate) => (
                        <CandidateCard
                          key={candidate.id}
                          candidate={candidate}
                          columnId={column.id}
                          columnIndex={colIndex}
                          totalColumns={columns.length}
                          onMove={(id, dir) => handleMove(id, column.id, dir)}
                          onAddNote={onAddNote}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export { PipelineBoard }
export type { Candidate, PipelineColumn, PipelineBoardProps }
