"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Zap,
} from "lucide-react"
import { cn, formatSalary, formatRelativeTime } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RecommendedJob {
  id: string
  title: string
  company: { name: string; logo?: string }
  location: string
  salaryMin: number
  salaryMax: number
  matchScore: number
  reason: string
  skills: string[]
  workMode: string
  employmentType: string
  postedAt: string
}

interface JobRecommendationsProps {
  jobs?: RecommendedJob[]
  onApply?: (jobId: string) => void
  className?: string
}

const defaultJobs: RecommendedJob[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: { name: "TechCorp" },
    location: "San Francisco, CA",
    salaryMin: 160000, salaryMax: 200000,
    matchScore: 95,
    reason: "Your React and TypeScript skills align perfectly. Your 5 years of experience matches their requirement.",
    skills: ["React", "TypeScript", "GraphQL"],
    workMode: "Remote",
    employmentType: "Full-time",
    postedAt: "2026-08-15",
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: { name: "StartupXYZ" },
    location: "New York, NY",
    salaryMin: 130000, salaryMax: 170000,
    matchScore: 88,
    reason: "Strong match with your Node.js and database skills. Your startup experience is a plus.",
    skills: ["React", "Node.js", "PostgreSQL"],
    workMode: "Hybrid",
    employmentType: "Full-time",
    postedAt: "2026-08-14",
  },
  {
    id: "3",
    title: "Frontend Tech Lead",
    company: { name: "MegaCorp" },
    location: "Seattle, WA",
    salaryMin: 180000, salaryMax: 220000,
    matchScore: 82,
    reason: "Your leadership potential and frontend expertise match their growing team needs.",
    skills: ["React", "TypeScript", "AWS"],
    workMode: "On-site",
    employmentType: "Full-time",
    postedAt: "2026-08-13",
  },
  {
    id: "4",
    title: "UI/UX Developer",
    company: { name: "DesignStudio" },
    location: "Austin, TX",
    salaryMin: 110000, salaryMax: 145000,
    matchScore: 76,
    reason: "Your CSS and component design skills are a strong fit. They value design-thinking engineers.",
    skills: ["React", "CSS", "Figma"],
    workMode: "Remote",
    employmentType: "Full-time",
    postedAt: "2026-08-12",
  },
]

function JobRecommendations({
  jobs = defaultJobs,
  onApply,
  className,
}: JobRecommendationsProps) {
  const [expandedId, setExpandedId] = React.useState<string | null>(null)

  const getScoreColor = (score: number) => {
    if (score >= 90) return "from-emerald-500 to-emerald-600"
    if (score >= 80) return "from-blue-500 to-blue-600"
    if (score >= 70) return "from-amber-500 to-amber-600"
    return "from-red-500 to-red-600"
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20">
          <Sparkles className="h-4 w-4 text-violet-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Recommended for You</h3>
          <p className="text-xs text-muted-foreground">AI-powered job matches based on your profile</p>
        </div>
      </div>

      <div className="space-y-3">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card variant="glass" className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar size="md" className="shrink-0">
                    <AvatarImage src={job.company.logo} alt={job.company.name} />
                    <AvatarFallback>{job.company.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">{job.company.name}</p>
                        <h4 className="text-sm font-semibold">{job.title}</h4>
                      </div>
                      <div className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white text-xs font-bold",
                        getScoreColor(job.matchScore)
                      )}>
                        {job.matchScore}%
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{formatSalary(job.salaryMin, job.salaryMax)}</span>
                      <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{job.workMode}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" size="sm">{skill}</Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        variant="gradient"
                        size="sm"
                        className="flex-1"
                        onClick={() => onApply?.(job.id)}
                      >
                        <Zap className="h-3.5 w-3.5 mr-1" />
                        Quick Apply
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                      >
                        Why this job?
                        <motion.div animate={{ rotate: expandedId === job.id ? 180 : 0 }}>
                          <ChevronDown className="h-3.5 w-3.5 ml-1" />
                        </motion.div>
                      </Button>
                    </div>

                    <AnimatePresence>
                      {expandedId === job.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 rounded-xl bg-muted/30 p-3 text-xs text-muted-foreground">
                            <p className="font-medium text-foreground mb-1">Why this job?</p>
                            {job.reason}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { JobRecommendations }
export type { RecommendedJob, JobRecommendationsProps }
