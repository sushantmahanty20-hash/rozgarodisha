"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  GraduationCap,
  Wrench,
  ArrowUpDown,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface Candidate {
  id: string
  name: string
  avatar?: string
  matchScore: number
  matchedSkills: string[]
  missingSkills: string[]
  experience: string
  education: string
  title: string
  appliedDate: string
}

interface CandidateRankingProps {
  candidates?: Candidate[]
  jobId?: string
  className?: string
}

const defaultCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Chen",
    matchScore: 94,
    matchedSkills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
    missingSkills: ["Kubernetes"],
    experience: "6 years",
    education: "M.S. Computer Science, MIT",
    title: "Senior Frontend Developer",
    appliedDate: "2 days ago",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    matchScore: 87,
    matchedSkills: ["React", "TypeScript", "Python", "Docker"],
    missingSkills: ["GraphQL", "AWS"],
    experience: "4 years",
    education: "B.S. Software Engineering, Georgia Tech",
    title: "Frontend Developer",
    appliedDate: "3 days ago",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    matchScore: 82,
    matchedSkills: ["React", "Node.js", "PostgreSQL", "Docker"],
    missingSkills: ["TypeScript", "AWS", "GraphQL"],
    experience: "5 years",
    education: "B.S. Computer Science, UCLA",
    title: "Full Stack Developer",
    appliedDate: "1 day ago",
  },
  {
    id: "4",
    name: "David Kim",
    matchScore: 76,
    matchedSkills: ["TypeScript", "Python", "AWS"],
    missingSkills: ["React", "GraphQL", "Docker"],
    experience: "3 years",
    education: "B.S. Computer Engineering, CMU",
    title: "Backend Developer",
    appliedDate: "5 days ago",
  },
]

function CandidateRanking({ candidates = defaultCandidates, className }: CandidateRankingProps) {
  const [sortBy, setSortBy] = React.useState<"score" | "experience" | "date">("score")
  const [expandedId, setExpandedId] = React.useState<string | null>(null)

  const sortedCandidates = React.useMemo(() => {
    const sorted = [...candidates]
    if (sortBy === "score") sorted.sort((a, b) => b.matchScore - a.matchScore)
    if (sortBy === "experience") sorted.sort((a, b) => parseInt(b.experience) - parseInt(a.experience))
    return sorted
  }, [candidates, sortBy])

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-500"
    if (score >= 80) return "text-blue-500"
    if (score >= 70) return "text-amber-500"
    return "text-red-500"
  }

  const getScoreRing = (score: number) => {
    if (score >= 90) return "stroke-emerald-500"
    if (score >= 80) return "stroke-blue-500"
    if (score >= 70) return "stroke-amber-500"
    return "stroke-red-500"
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Candidate Rankings</h3>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
          <SelectTrigger className="w-40 h-9">
            <ArrowUpDown className="h-3.5 w-3.5 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="score">By Score</SelectItem>
            <SelectItem value="experience">By Experience</SelectItem>
            <SelectItem value="date">By Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {sortedCandidates.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card variant="glass" className="overflow-hidden">
              <CardContent className="p-4">
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === candidate.id ? null : candidate.id)}
                >
                  <div className="relative">
                    <Avatar size="lg">
                      <AvatarImage src={candidate.avatar} alt={candidate.name} />
                      <AvatarFallback>{candidate.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-card text-[10px] font-bold border">
                      {index + 1}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold truncate">{candidate.name}</h4>
                      <Badge variant="secondary" size="sm">{candidate.title}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{candidate.experience} exp</span>
                      <span>{candidate.appliedDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex h-14 w-14 items-center justify-center">
                      <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15" fill="none" className="stroke-muted/50" strokeWidth="3" />
                        <circle
                          cx="18" cy="18" r="15" fill="none"
                          className={cn("transition-all duration-1000", getScoreRing(candidate.matchScore))}
                          strokeWidth="3"
                          strokeDasharray={`${candidate.matchScore * 0.94} 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className={cn("absolute text-sm font-bold", getScoreColor(candidate.matchScore))}>
                        {candidate.matchScore}%
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedId === candidate.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === candidate.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-4 border-t pt-4">
                        <div className="space-y-2">
                          <h5 className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                            <Wrench className="h-3.5 w-3.5" />
                            Matched Skills
                          </h5>
                          <div className="flex flex-wrap gap-1.5">
                            {candidate.matchedSkills.map((skill) => (
                              <Badge key={skill} variant="success" size="sm" className="gap-1">
                                <Check className="h-3 w-3" />
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {candidate.missingSkills.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                              <Wrench className="h-3.5 w-3.5" />
                              Missing Skills
                            </h5>
                            <div className="flex flex-wrap gap-1.5">
                              {candidate.missingSkills.map((skill) => (
                                <Badge key={skill} variant="destructive" size="sm">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <GraduationCap className="h-4 w-4" />
                          {candidate.education}
                        </div>

                        <div className="flex gap-2">
                          <Button variant="default" size="sm">View Full Profile</Button>
                          <Button variant="outline" size="sm">Schedule Interview</Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { CandidateRanking }
export type { Candidate, CandidateRankingProps }
