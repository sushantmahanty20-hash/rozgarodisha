"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Check,
  Link,
} from "lucide-react"
import { cn, formatDate } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

type InterviewType = "video" | "phone" | "onsite"

interface TimeSlot {
  time: string
  available: boolean
}

interface InterviewSchedulerProps {
  className?: string
}

function InterviewScheduler({ className }: InterviewSchedulerProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [selectedDate, setSelectedDate] = React.useState<number | null>(null)
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null)
  const [interviewType, setInterviewType] = React.useState<InterviewType>("video")
  const [meetingUrl, setMeetingUrl] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [confirmed, setConfirmed] = React.useState(false)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()

  const days: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const timeSlots: TimeSlot[] = [
    { time: "09:00 AM", available: true },
    { time: "09:30 AM", available: false },
    { time: "10:00 AM", available: true },
    { time: "10:30 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "11:30 AM", available: false },
    { time: "01:00 PM", available: true },
    { time: "01:30 PM", available: true },
    { time: "02:00 PM", available: true },
    { time: "02:30 PM", available: false },
    { time: "03:00 PM", available: true },
    { time: "03:30 PM", available: true },
  ]

  const prevMonth = () => setCurrentDate(new Date(year, month - 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1))

  const handleConfirm = () => {
    if (selectedDate && selectedSlot) {
      setConfirmed(true)
    }
  }

  const interviewTypes: { type: InterviewType; label: string; icon: React.ReactNode }[] = [
    { type: "video", label: "Video Call", icon: <Video className="h-4 w-4" /> },
    { type: "phone", label: "Phone", icon: <Phone className="h-4 w-4" /> },
    { type: "onsite", label: "On-site", icon: <MapPin className="h-4 w-4" /> },
  ]

  if (confirmed && selectedDate && selectedSlot) {
    return (
      <div className={cn("space-y-6", className)}>
        <Card variant="glass">
          <CardContent className="p-8 text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15"
            >
              <Check className="h-8 w-8 text-emerald-500" />
            </motion.div>
            <h3 className="text-xl font-bold">Interview Scheduled!</h3>
            <p className="text-muted-foreground">
              {formatDate(new Date(year, month, selectedDate), { weekday: "long", month: "long", day: "numeric" })} at {selectedSlot}
            </p>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="info" size="md">
                {interviewTypes.find((t) => t.type === interviewType)?.label}
              </Badge>
            </div>
            <div className="flex gap-2 justify-center pt-2">
              <Button variant="outline" onClick={() => { setConfirmed(false); setSelectedDate(null); setSelectedSlot(null) }}>
                Schedule Another
              </Button>
              <Button variant="default">Send Calendar Invite</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Schedule Interview
          </CardTitle>
          <CardDescription>Select a date, time, and interview type</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">John Doe</h4>
              <p className="text-sm text-muted-foreground">Senior Frontend Developer</p>
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h4 className="font-semibold">
                {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
              </h4>
              <Button variant="ghost" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-xs font-medium text-muted-foreground py-1">
                  {day}
                </div>
              ))}
              {days.map((day, i) => {
                if (day === null) return <div key={`empty-${i}`} />
                const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
                const isSelected = selectedDate === day
                return (
                  <motion.button
                    key={day}
                    whileHover={!isPast ? { scale: 1.1 } : undefined}
                    whileTap={!isPast ? { scale: 0.95 } : undefined}
                    onClick={() => !isPast && setSelectedDate(day)}
                    disabled={isPast}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-all",
                      isSelected
                        ? "bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/25"
                        : isPast
                        ? "text-muted-foreground/30 cursor-not-allowed"
                        : "hover:bg-muted cursor-pointer",
                      !isSelected && day === today.getDate() && month === today.getMonth() && year === today.getFullYear() && "ring-2 ring-primary/50"
                    )}
                  >
                    {day}
                  </motion.button>
                )
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Select Time
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map((slot) => (
                <motion.button
                  key={slot.time}
                  whileHover={slot.available ? { scale: 1.03 } : undefined}
                  whileTap={slot.available ? { scale: 0.97 } : undefined}
                  onClick={() => slot.available && setSelectedSlot(slot.time)}
                  disabled={!slot.available}
                  className={cn(
                    "rounded-lg border p-2 text-xs font-medium transition-all",
                    selectedSlot === slot.time
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                      : slot.available
                      ? "hover:border-primary/50 cursor-pointer"
                      : "opacity-40 cursor-not-allowed"
                  )}
                >
                  {slot.time}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Interview Type</h4>
            <div className="flex gap-2">
              {interviewTypes.map((item) => (
                <motion.button
                  key={item.type}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setInterviewType(item.type)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
                    interviewType === item.type
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                      : "hover:border-primary/50"
                  )}
                >
                  {item.icon}
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>

          {interviewType === "video" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-2"
            >
              <label className="text-sm font-medium flex items-center gap-2">
                <Link className="h-4 w-4 text-muted-foreground" />
                Meeting URL
              </label>
              <Input
                placeholder="https://meet.google.com/..."
                value={meetingUrl}
                onChange={(e) => setMeetingUrl(e.target.value)}
              />
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              placeholder="Add any notes for the interview..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            disabled={!selectedDate || !selectedSlot}
            onClick={handleConfirm}
          >
            <Check className="h-4 w-4 mr-2" />
            Confirm Interview
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export { InterviewScheduler }
