import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
  headline: z.string().max(200).optional(),
  location: z.string().max(200).optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,20}$/, 'Invalid phone number')
    .optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  avatar: z.string().url('Invalid avatar URL').optional(),
  skills: z.array(z.string().max(100)).max(50).optional(),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>

export const updateSettingsSchema = z.object({
  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
  jobAlerts: z.boolean().optional(),
  marketingEmails: z.boolean().optional(),
  language: z.string().length(2).optional(),
  timezone: z.string().optional(),
  theme: z.enum(['light', 'dark', 'system']).optional(),
})

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>
