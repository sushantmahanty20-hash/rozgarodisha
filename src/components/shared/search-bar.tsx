"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void
  className?: string
}

interface SearchFilters {
  query: string
  location: string
  category: string
  salaryMin: string
  salaryMax: string
  experience: string
  employmentType: string
  remote: string
}

const categories = [
  "All Categories",
  "Technology",
  "Design",
  "Marketing",
  "Finance",
  "Healthcare",
  "Education",
  "Engineering",
  "Sales",
  "Operations",
]

const experienceLevels = [
  "Any Experience",
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Lead",
  "Executive",
]

const employmentTypes = [
  "Any Type",
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
]

function SearchBar({ onSearch, className }: SearchBarProps) {
  const [query, setQuery] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [showAdvanced, setShowAdvanced] = React.useState(false)
  const [salaryMin, setSalaryMin] = React.useState("")
  const [salaryMax, setSalaryMax] = React.useState("")
  const [experience, setExperience] = React.useState("")
  const [employmentType, setEmploymentType] = React.useState("")
  const [remote, setRemote] = React.useState("")

  const activeFilterCount = [
    salaryMin,
    salaryMax,
    experience,
    employmentType,
    remote,
  ].filter(Boolean).length

  const handleSearch = () => {
    onSearch?.({
      query,
      location,
      category,
      salaryMin,
      salaryMax,
      experience,
      employmentType,
      remote,
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  const clearAll = () => {
    setQuery("")
    setLocation("")
    setCategory("")
    setSalaryMin("")
    setSalaryMax("")
    setExperience("")
    setEmploymentType("")
    setRemote("")
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="relative rounded-2xl border bg-white/10 backdrop-blur-xl shadow-xl dark:bg-white/5 dark:border-white/10 p-2">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              variant="glass"
              placeholder="Job title, keywords, or company"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 border-0 bg-transparent focus-visible:ring-0 h-12"
            />
          </div>

          <div className="hidden md:block h-8 w-px bg-border/50" />

          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              variant="glass"
              placeholder="City, state, or remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 border-0 bg-transparent focus-visible:ring-0 h-12"
            />
          </div>

          <div className="hidden md:block h-8 w-px bg-border/50" />

          <div className="hidden md:flex w-48">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="border-0 bg-transparent focus:ring-0 h-12">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="gradient"
            size="lg"
            onClick={handleSearch}
            className="gap-2 rounded-xl"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="gap-1.5 text-muted-foreground"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Advanced Filters
            {activeFilterCount > 0 && (
              <Badge variant="default" size="sm" className="ml-1 h-5 px-1.5">
                {activeFilterCount}
              </Badge>
            )}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                showAdvanced && "rotate-180"
              )}
            />
          </Button>

          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="gap-1 text-muted-foreground"
            >
              <X className="h-3.5 w-3.5" />
              Clear all
            </Button>
          )}

          <div className="hidden md:flex items-center gap-2 ml-auto">
            {salaryMin && (
              <Badge variant="secondary" size="sm" className="gap-1">
                Min: ${salaryMin}k
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSalaryMin("")}
                />
              </Badge>
            )}
            {salaryMax && (
              <Badge variant="secondary" size="sm" className="gap-1">
                Max: ${salaryMax}k
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSalaryMax("")}
                />
              </Badge>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-3 pt-3 border-t border-border/50 md:grid-cols-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    Min Salary (k)
                  </label>
                  <Input
                    variant="glass"
                    type="number"
                    placeholder="e.g. 50"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    Max Salary (k)
                  </label>
                  <Input
                    variant="glass"
                    type="number"
                    placeholder="e.g. 150"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    Experience
                  </label>
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Any Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    Employment Type
                  </label>
                  <Select
                    value={employmentType}
                    onValueChange={setEmploymentType}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Any Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {employmentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 border-t border-border/50 pt-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Work Mode:
                </span>
                {["Remote", "Onsite", "Hybrid"].map((mode) => (
                  <Button
                    key={mode}
                    variant={remote === mode ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setRemote(remote === mode ? "" : mode)
                    }
                    className="h-7 text-xs"
                  >
                    {mode}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export { SearchBar }
export type { SearchBarProps, SearchFilters }
