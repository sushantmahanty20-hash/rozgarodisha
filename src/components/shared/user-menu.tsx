"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  User,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
  Shield,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserData {
  name: string
  email: string
  avatar?: string
  role: "jobseeker" | "employer" | "admin"
}

interface UserMenuProps {
  user: UserData
  onProfile?: () => void
  onDashboard?: () => void
  onSettings?: () => void
  onLogout?: () => void
  className?: string
}

const roleConfig = {
  jobseeker: {
    label: "Job Seeker",
    icon: <User className="h-3.5 w-3.5" />,
    color: "bg-blue-500/15 text-blue-600",
  },
  employer: {
    label: "Employer",
    icon: <Building2 className="h-3.5 w-3.5" />,
    color: "bg-purple-500/15 text-purple-600",
  },
  admin: {
    label: "Admin",
    icon: <Shield className="h-3.5 w-3.5" />,
    color: "bg-red-500/15 text-red-600",
  },
}

function UserMenu({
  user,
  onProfile,
  onDashboard,
  onSettings,
  onLogout,
  className,
}: UserMenuProps) {
  const config = roleConfig[user.role]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "gap-2 px-2 py-1.5 h-auto hover:bg-accent/50",
            className
          )}
        >
          <Avatar size="sm">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start text-left">
            <span className="text-sm font-medium leading-tight">
              {user.name}
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              {config.label}
            </span>
          </div>
          <ChevronDown className="hidden md:block h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
        <DropdownMenuLabel className="p-0">
          <div className="flex items-center gap-3 px-2 py-2.5">
            <Avatar size="md">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <div className="px-2 pb-1">
          <div
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
              config.color
            )}
          >
            {config.icon}
            {config.label}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onProfile} className="gap-2 cursor-pointer">
          <User className="h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDashboard} className="gap-2 cursor-pointer">
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSettings} className="gap-2 cursor-pointer">
          <Settings className="h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onLogout}
          className="gap-2 text-destructive cursor-pointer focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { UserMenu }
export type { UserData, UserMenuProps }
