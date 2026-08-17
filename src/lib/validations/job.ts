import { z } from 'zod'
import { paginationSchema, searchSchema } from './common'

const salaryRangeSchema = z
  .object({
    min: z.number().int().min(0),
    max: z.number().int().min(0),
    currency: z.string().length(3).default('USD'),
    period: z.enum(['hourly', 'monthly', 'yearly']).default('yearly'),
  })
  .refine((data) => data.max >= data.min, {
    message: 'Maximum salary must be greater than or equal to minimum',
  })

export const createJobSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().min(50).max(10000),
  requirements: z.string().max(5000).optional(),
  responsibilities: z.string().max(5000).optional(),
  companyId: z.string().min(1),
  categoryId: z.string().min(1),
  location: z.string().min(1).max(200),
  isRemote: z.boolean().default(false),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'internship', 'freelance']),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'lead', 'executive']),
  salaryRange: salaryRangeSchema.optional(),
  benefits: z.array(z.string().max(100)).max(20).default([]),
  skills: z.array(z.string().max(100)).max(50).default([]),
  applicationDeadline: z.coerce.date().optional(),
  status: z.enum(['draft', 'published']).default('draft'),
})

export type CreateJobInput = z.infer<typeof createJobSchema>

export const updateJobSchema = createJobSchema.partial().extend({
  status: z.enum(['draft', 'published', 'archived']).optional(),
})

export type UpdateJobInput = z.infer<typeof updateJobSchema>

export const jobFilterSchema = z
  .object({
    categoryId: z.string().optional(),
    companyId: z.string().optional(),
    employmentType: z.enum(['full-time', 'part-time', 'contract', 'internship', 'freelance']).optional(),
    experienceLevel: z.enum(['entry', 'mid', 'senior', 'lead', 'executive']).optional(),
    isRemote: z.coerce.boolean().optional(),
    location: z.string().optional(),
    salaryMin: z.coerce.number().int().min(0).optional(),
    salaryMax: z.coerce.number().int().min(0).optional(),
    skills: z
      .union([z.array(z.string()), z.string()])
      .transform((v) => (Array.isArray(v) ? v : v.split(',')))
      .optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
  })
  .merge(paginationSchema)
  .merge(searchSchema)

export type JobFilterInput = z.infer<typeof jobFilterSchema>
