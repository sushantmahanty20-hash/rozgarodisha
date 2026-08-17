"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Sparkles,
  RefreshCw,
  FileText,
  Wrench,
  Briefcase,
  Check,
  AlertCircle,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ScoreBreakdown {
  format: number
  content: number
  skills: number
  experience: number
}

interface ResumeScoreCardProps {
  score?: number
  breakdown?: ScoreBreakdown
  suggestions?: string[]
  jobRequirements?: string[]
  className?: string
}

function CircularScore({ score, size = 120 }: { score: number; size?: number }) {
  const radius = (size - 12) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (score / 100) * circumference

  const getScoreColor = () => {
    if (score >= 80) return { stroke: "stroke-emerald-500", text: "text-emerald-500", bg: "from-emerald-500/20 to-emerald-500/5" }
    if (score >= 60) return { stroke: "stroke-blue-500", text: "text-blue-500", bg: "from-blue-500/20 to-blue-500/5" }
    if (score >= 40) return { stroke: "stroke-amber-500", text: "text-amber-500", bg: "from-amber-500/20 to-amber-500/5" }
    return { stroke: "stroke-red-500", text: "text-red-500", bg: "from-red-500/20 to-red-500/5" }
  }

  const colors = getScoreColor()

  return (
    <div className={cn("relative flex items-center justify-center rounded-full bg-gradient-to-br", colors.bg)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" className="stroke-muted/30" strokeWidth="8"
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          className={cn(colors.stroke, "transition-all duration-1000")}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute text-center">
        <motion.p
          className={cn("text-3xl font-bold", colors.text)}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {score}
        </motion.p>
        <p className="text-xs text-muted-foreground">/100</p>
      </div>
    </div>
  )
}

function ResumeScoreCard({
  score = 78,
  breakdown = { format: 85, content: 72, skills: 80, experience: 75 },
  suggestions = [
    "Add quantifiable achievements to your experience section",
    "Include more industry-specific keywords",
    "Add a professional summary at the top",
    "Use action verbs to describe your accomplishments",
  ],
  jobRequirements = ["React", "TypeScript", "AWS", "Node.js", "GraphQL"],
  className,
}: ResumeScoreCardProps) {
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)

  const handleReAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 2000)
  }

  const breakdownItems: { key: keyof ScoreBreakdown; label: string; icon: React.ReactNode }[] = [
    { key: "format", label: "Format & Structure", icon: <FileText className="h-4 w-4" /> },
    { key: "content", label: "Content Quality", icon: <Sparkles className="h-4 w-4" /> },
    { key: "skills", label: "Skills Match", icon: <Wrench className="h-4 w-4" /> },
    { key: "experience", label: "Experience Level", icon: <Briefcase className="h-4 w-4" /> },
  ]

  return (
    <div className={cn("space-y-6", className)}>
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Resume Score
          </CardTitle>
          <CardDescription>AI-powered analysis of your resume</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center">
            <CircularScore score={score} />
          </div>

          <div className="space-y-3">
            {breakdownItems.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    {item.icon}
                    {item.label}
                  </span>
                  <span className="font-medium">{breakdown[item.key]}%</span>
                </div>
                <Progress value={breakdown[item.key]} size="sm" />
              </motion.div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Improvement Suggestions
            </h4>
            <ul className="space-y-2">
              {suggestions.map((suggestion, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  {suggestion}
                </motion.li>
              ))}
            </ul>
          </div>

          {jobRequirements.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Job Requirements Match</h4>
              <div className="flex flex-wrap gap-2">
                {jobRequirements.map((req, i) => {
                  const matched = breakdown.skills > 50 + i * 5
                  return (
                    <Badge
                      key={req}
                      variant={matched ? "success" : "destructive"}
                      size="sm"
                      className="gap-1"
                    >
                      {matched && <Check className="h-3 w-3" />}
                      {req}
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={handleReAnalyze}
            loading={isAnalyzing}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Re-analyze Resume
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export { ResumeScoreCard }
export type { ScoreBreakdown, ResumeScoreCardProps }
