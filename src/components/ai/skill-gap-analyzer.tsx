"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Layers,
  BookOpen,
  Check,
  X,
  ArrowRight,
  Target,
  Trophy,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Skill {
  name: string
  status: "matched" | "missing" | "in-progress"
  priority: "high" | "medium" | "low"
}

interface Course {
  title: string
  provider: string
  skill: string
  duration: string
  rating: number
  url: string
}

interface SkillGapAnalyzerProps {
  currentSkills?: string[]
  requiredSkills?: Skill[]
  courses?: Course[]
  className?: string
}

function SkillGapAnalyzer({
  currentSkills = ["React", "TypeScript", "JavaScript", "HTML/CSS", "Git"],
  requiredSkills = [
    { name: "React", status: "matched", priority: "high" },
    { name: "TypeScript", status: "matched", priority: "high" },
    { name: "Node.js", status: "missing", priority: "high" },
    { name: "AWS", status: "missing", priority: "high" },
    { name: "GraphQL", status: "in-progress", priority: "medium" },
    { name: "Docker", status: "missing", priority: "medium" },
    { name: "PostgreSQL", status: "in-progress", priority: "medium" },
    { name: "Kubernetes", status: "missing", priority: "low" },
    { name: "CI/CD", status: "missing", priority: "low" },
    { name: "System Design", status: "missing", priority: "medium" },
  ],
  courses = [
    { title: "AWS Certified Cloud Practitioner", provider: "Amazon", skill: "AWS", duration: "20h", rating: 4.8, url: "#" },
    { title: "Node.js Complete Guide", provider: "Udemy", skill: "Node.js", duration: "35h", rating: 4.7, url: "#" },
    { title: "Docker & Kubernetes Masterclass", provider: "Coursera", skill: "Docker", duration: "25h", rating: 4.6, url: "#" },
    { title: "GraphQL with React", provider: "Frontend Masters", skill: "GraphQL", duration: "12h", rating: 4.9, url: "#" },
  ],
  className,
}: SkillGapAnalyzerProps) {
  const matched = requiredSkills.filter((s) => s.status === "matched").length
  const missing = requiredSkills.filter((s) => s.status === "missing").length
  const inProgress = requiredSkills.filter((s) => s.status === "in-progress").length
  const matchPercent = Math.round((matched / requiredSkills.length) * 100)

  const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 }
  const sortedSkills = [...requiredSkills].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  return (
    <div className={cn("space-y-6", className)}>
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Skill Gap Analysis
          </CardTitle>
          <CardDescription>Compare your skills with job requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-3 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-emerald-500/10 p-3"
            >
              <p className="text-2xl font-bold text-emerald-500">{matched}</p>
              <p className="text-xs text-muted-foreground">Matched</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl bg-amber-500/10 p-3"
            >
              <p className="text-2xl font-bold text-amber-500">{inProgress}</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl bg-red-500/10 p-3"
            >
              <p className="text-2xl font-bold text-red-500">{missing}</p>
              <p className="text-xs text-muted-foreground">Missing</p>
            </motion.div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Match</span>
              <span className="font-medium">{matchPercent}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted/50">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500"
                initial={{ width: 0 }}
                animate={{ width: `${matchPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>0%</span>
              <span>Matched {matched}/{requiredSkills.length}</span>
              <span>100%</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Skills Breakdown</h4>
            <div className="space-y-2">
              {sortedSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-xl border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full",
                      skill.status === "matched" && "bg-emerald-500/15",
                      skill.status === "in-progress" && "bg-amber-500/15",
                      skill.status === "missing" && "bg-red-500/15"
                    )}>
                      {skill.status === "matched" && <Check className="h-3.5 w-3.5 text-emerald-500" />}
                      {skill.status === "in-progress" && <AlertCircle className="h-3.5 w-3.5 text-amber-500" />}
                      {skill.status === "missing" && <X className="h-3.5 w-3.5 text-red-500" />}
                    </div>
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                  <Badge
                    variant={skill.priority === "high" ? "destructive" : skill.priority === "medium" ? "warning" : "secondary"}
                    size="sm"
                  >
                    {skill.priority}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-5 w-5 text-primary" />
            Recommended Courses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 rounded-xl border p-3 hover:bg-muted/30 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{course.title}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{course.provider}</span>
                  <span>·</span>
                  <span>{course.duration}</span>
                  <span>·</span>
                  <span className="text-amber-500">★ {course.rating}</span>
                </div>
              </div>
              <Badge variant="info" size="sm">{course.skill}</Badge>
              <Button variant="ghost" size="sm" className="shrink-0">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export { SkillGapAnalyzer }
export type { Skill, Course, SkillGapAnalyzerProps }
