"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Upload,
  FileText,
  Check,
  Edit3,
  X,
  Briefcase,
  GraduationCap,
  Wrench,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

interface ExtractedData {
  skills: string[]
  experience: { title: string; company: string; duration: string; description: string }[]
  education: { degree: string; institution: string; year: string }[]
  score: number
}

interface ResumeParserProps {
  className?: string
}

function ResumeParser({ className }: ResumeParserProps) {
  const [file, setFile] = React.useState<File | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [parsingProgress, setParsingProgress] = React.useState(0)
  const [isParsing, setIsParsing] = React.useState(false)
  const [parsed, setParsed] = React.useState(false)
  const [editingField, setEditingField] = React.useState<string | null>(null)
  const [extractedData, setExtractedData] = React.useState<ExtractedData | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const simulateParsing = React.useCallback(() => {
    setIsParsing(true)
    setParsingProgress(0)
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setIsParsing(false)
        setParsed(true)
        setExtractedData({
          skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL", "PostgreSQL"],
          experience: [
            {
              title: "Senior Frontend Developer",
              company: "Tech Corp",
              duration: "2022 - Present",
              description: "Led development of micro-frontend architecture serving 2M+ users.",
            },
            {
              title: "Frontend Developer",
              company: "StartupXYZ",
              duration: "2020 - 2022",
              description: "Built responsive web applications using React and TypeScript.",
            },
          ],
          education: [
            {
              degree: "B.S. Computer Science",
              institution: "Stanford University",
              year: "2020",
            },
          ],
          score: 87,
        })
      }
      setParsingProgress(Math.min(progress, 100))
    }, 200)
    return () => clearInterval(interval)
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      simulateParsing()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      simulateParsing()
    }
  }

  const handleEditSkill = (index: number, value: string) => {
    if (!extractedData) return
    const newSkills = [...extractedData.skills]
    newSkills[index] = value
    setExtractedData({ ...extractedData, skills: newSkills })
  }

  const handleRemoveSkill = (index: number) => {
    if (!extractedData) return
    setExtractedData({
      ...extractedData,
      skills: extractedData.skills.filter((_, i) => i !== index),
    })
  }

  const handleReset = () => {
    setFile(null)
    setParsingProgress(0)
    setIsParsing(false)
    setParsed(false)
    setExtractedData(null)
    setEditingField(null)
  }

  return (
    <div className={cn("space-y-6", className)}>
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Resume Parser
          </CardTitle>
          <CardDescription>Upload your resume to extract skills, experience, and education</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!parsed && !isParsing && (
            <motion.div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              whileHover={{ scale: 1.01 }}
              className={cn(
                "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-all duration-200 cursor-pointer",
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
              )}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={handleFileSelect}
                className="hidden"
              />
              <motion.div
                animate={isDragging ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20"
              >
                <Upload className="h-7 w-7 text-primary" />
              </motion.div>
              <div className="mt-4 space-y-1">
                <p className="text-sm font-medium">
                  <span className="text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PDF or DOCX (max 10MB)</p>
              </div>
            </motion.div>
          )}

          {isParsing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary animate-pulse" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Parsing {file?.name}...</p>
                  <p className="text-xs text-muted-foreground">Extracting content and analyzing</p>
                </div>
              </div>
              <Progress value={parsingProgress} variant="default" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Analyzing document structure</span>
                <span>{Math.round(parsingProgress)}%</span>
              </div>
            </motion.div>
          )}

          {parsed && extractedData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15">
                    <Check className="h-4 w-4 text-emerald-500" />
                  </div>
                  <span className="text-sm font-medium">Parsing complete</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <X className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>

              <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-accent/5 p-4 text-center">
                <p className="text-sm text-muted-foreground">Resume Score</p>
                <p className="mt-1 text-4xl font-bold text-primary">{extractedData.score}</p>
                <p className="text-xs text-muted-foreground">out of 100</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="flex items-center gap-2 text-sm font-semibold">
                    <Wrench className="h-4 w-4 text-primary" />
                    Skills ({extractedData.skills.length})
                  </h4>
                  <Button variant="ghost" size="sm" onClick={() => setEditingField(editingField === "skills" ? null : "skills")}>
                    <Edit3 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {extractedData.skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {editingField === "skills" ? (
                        <div className="flex items-center gap-1">
                          <Input
                            value={skill}
                            onChange={(e) => handleEditSkill(i, e.target.value)}
                            className="h-7 w-24 text-xs px-2"
                          />
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleRemoveSkill(i)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Badge variant="secondary" size="sm">{skill}</Badge>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <Briefcase className="h-4 w-4 text-primary" />
                  Experience ({extractedData.experience.length})
                </h4>
                {extractedData.experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl border p-4 space-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold">{exp.title}</p>
                        <p className="text-xs text-muted-foreground">{exp.company}</p>
                      </div>
                      <Badge variant="info" size="sm">{exp.duration}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{exp.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Education ({extractedData.education.length})
                </h4>
                {extractedData.education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl border p-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold">{edu.degree}</p>
                      <p className="text-xs text-muted-foreground">{edu.institution}</p>
                    </div>
                    <Badge variant="secondary" size="sm">{edu.year}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export { ResumeParser }
