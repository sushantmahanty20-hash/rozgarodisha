export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export type PaginatedResponse<T> = {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export type UserRole = 'jobseeker' | 'employer' | 'admin'

export type JobStatus = 'draft' | 'published' | 'archived'

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance'

export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive'

export type SortOrder = 'asc' | 'desc'

export type Theme = 'light' | 'dark' | 'system'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface Job {
  id: string
  title: string
  slug: string
  description: string
  requirements?: string
  responsibilities?: string
  companyId: string
  company?: Company
  categoryId: string
  category?: JobCategory
  location: string
  isRemote: boolean
  employmentType: EmploymentType
  experienceLevel: ExperienceLevel
  salaryRange?: SalaryRange
  benefits: string[]
  skills: string[]
  applicationDeadline?: string
  status: JobStatus
  createdBy: string
  applicantCount: number
  createdAt: string
  updatedAt: string
}

export interface SalaryRange {
  min: number
  max: number
  currency: string
  period: 'hourly' | 'monthly' | 'yearly'
}

export interface Company {
  id: string
  name: string
  slug: string
  description?: string
  longDescription?: string
  industry: string
  size?: string
  foundedYear?: number
  website?: string
  email?: string
  phone?: string
  location?: string
  logo?: string
  coverImage?: string
  socialLinks?: SocialLinks
  benefits: string[]
  jobCount: number
  createdAt: string
  updatedAt: string
}

export interface SocialLinks {
  linkedin?: string
  twitter?: string
  facebook?: string
  instagram?: string
}

export interface JobCategory {
  id: string
  name: string
  slug: string
  icon?: string
  jobCount: number
}

export interface JobApplication {
  id: string
  jobId: string
  job?: Job
  userId: string
  user?: User
  resume?: string
  coverLetter?: string
  status: ApplicationStatus
  createdAt: string
  updatedAt: string
}

export type ApplicationStatus = 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired'

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  link?: string
  createdAt: string
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export interface ThemeState {
  theme: Theme
  mode: 'light' | 'dark'
}

export interface UIState {
  sidebarOpen: boolean
  commandPaletteOpen: boolean
  notificationsPanelOpen: boolean
}
