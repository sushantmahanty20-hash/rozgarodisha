"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FilterState {
  employmentTypes: string[]
  experienceLevels: string[]
  salaryMin: string
  salaryMax: string
  workModes: string[]
  location: string
  education: string
  industry: string
}

interface FilterSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  className?: string
  isMobile?: boolean
}

const employmentTypeOptions = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
  "Temporary",
]

const experienceLevelOptions = [
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Lead / Principal",
  "Director",
  "Executive",
]

const workModeOptions = ["Remote", "Onsite", "Hybrid"]

const educationOptions = [
  "High School",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "None Required",
]

const industryOptions = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Marketing",
  "Design",
  "Engineering",
  "Sales",
  "Operations",
  "Legal",
]

function FilterSection({
  title,
  count,
  defaultOpen = true,
  children,
}: {
  title: string
  count?: number
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(defaultOpen)

  return (
    <div className="border-b border-border/50 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-medium"
      >
        <span className="flex items-center gap-2">
          {title}
          {count !== undefined && count > 0 && (
            <Badge variant="default" size="sm" className="h-5 px-1.5">
              {count}
            </Badge>
          )}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
      <div
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded border transition-all duration-200",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-input hover:border-primary/50"
        )}
        onClick={() => onChange(!checked)}
      >
        {checked && (
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span className="flex-1">{label}</span>
    </label>
  )
}

function FilterSidebarContent({
  filters,
  onFiltersChange,
}: {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}) {
  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (
    key: "employmentTypes" | "experienceLevels" | "workModes",
    value: string
  ) => {
    const current = filters[key]
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    updateFilter(key, updated)
  }

  const activeCount = [
    filters.employmentTypes.length,
    filters.experienceLevels.length,
    filters.salaryMin ? 1 : 0,
    filters.salaryMax ? 1 : 0,
    filters.workModes.length,
    filters.location ? 1 : 0,
    filters.education ? 1 : 0,
    filters.industry ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  const clearAll = () => {
    onFiltersChange({
      employmentTypes: [],
      experienceLevels: [],
      salaryMin: "",
      salaryMax: "",
      workModes: [],
      location: "",
      education: "",
      industry: "",
    })
  }

  return (
    <div className="space-y-0">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="font-semibold">Filters</span>
          {activeCount > 0 && (
            <Badge variant="default" size="sm" className="h-5 px-1.5">
              {activeCount}
            </Badge>
          )}
        </div>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="gap-1 text-xs text-muted-foreground"
          >
            <RotateCcw className="h-3 w-3" />
            Clear all
          </Button>
        )}
      </div>

      <Separator className="mb-2" />

      <FilterSection
        title="Employment Type"
        count={filters.employmentTypes.length}
      >
        {employmentTypeOptions.map((option) => (
          <CheckboxItem
            key={option}
            label={option}
            checked={filters.employmentTypes.includes(option)}
            onChange={() => toggleArrayFilter("employmentTypes", option)}
          />
        ))}
      </FilterSection>

      <FilterSection
        title="Experience Level"
        count={filters.experienceLevels.length}
      >
        {experienceLevelOptions.map((option) => (
          <CheckboxItem
            key={option}
            label={option}
            checked={filters.experienceLevels.includes(option)}
            onChange={() => toggleArrayFilter("experienceLevels", option)}
          />
        ))}
      </FilterSection>

      <FilterSection
        title="Salary Range"
        count={(filters.salaryMin ? 1 : 0) + (filters.salaryMax ? 1 : 0)}
      >
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min (k)"
            value={filters.salaryMin}
            onChange={(e) => updateFilter("salaryMin", e.target.value)}
            className="h-9 text-xs"
          />
          <span className="text-muted-foreground">—</span>
          <Input
            type="number"
            placeholder="Max (k)"
            value={filters.salaryMax}
            onChange={(e) => updateFilter("salaryMax", e.target.value)}
            className="h-9 text-xs"
          />
        </div>
      </FilterSection>

      <FilterSection
        title="Work Mode"
        count={filters.workModes.length}
      >
        {workModeOptions.map((option) => (
          <CheckboxItem
            key={option}
            label={option}
            checked={filters.workModes.includes(option)}
            onChange={() => toggleArrayFilter("workModes", option)}
          />
        ))}
      </FilterSection>

      <FilterSection
        title="Location"
        count={filters.location ? 1 : 0}
        defaultOpen={false}
      >
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search location..."
            value={filters.location}
            onChange={(e) => updateFilter("location", e.target.value)}
            className="h-9 pl-9 text-xs"
          />
        </div>
      </FilterSection>

      <FilterSection
        title="Education Level"
        count={filters.education ? 1 : 0}
        defaultOpen={false}
      >
        <div className="space-y-1">
          {educationOptions.map((option) => (
            <CheckboxItem
              key={option}
              label={option}
              checked={filters.education === option}
              onChange={() =>
                updateFilter(
                  "education",
                  filters.education === option ? "" : option
                )
              }
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Industry"
        count={filters.industry ? 1 : 0}
        defaultOpen={false}
      >
        <div className="space-y-1">
          {industryOptions.map((option) => (
            <CheckboxItem
              key={option}
              label={option}
              checked={filters.industry === option}
              onChange={() =>
                updateFilter(
                  "industry",
                  filters.industry === option ? "" : option
                )
              }
            />
          ))}
        </div>
      </FilterSection>
    </div>
  )
}

function FilterSidebar({
  filters,
  onFiltersChange,
  className,
}: FilterSidebarProps) {
  return (
    <>
      <div className={cn("hidden lg:block", className)}>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <FilterSidebarContent
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
        </ScrollArea>
      </div>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <ScrollArea className="mt-4 h-[calc(100vh-8rem)]">
              <FilterSidebarContent
                filters={filters}
                onFiltersChange={onFiltersChange}
              />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export { FilterSidebar }
export type { FilterState, FilterSidebarProps }
