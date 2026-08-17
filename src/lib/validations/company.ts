import { z } from 'zod'

export const createCompanySchema = z.object({
  name: z.string().min(2).max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  description: z.string().min(20).max(5000).optional(),
  longDescription: z.string().max(20000).optional(),
  industry: z.string().min(1).max(100),
  size: z
    .enum(['1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+'])
    .optional(),
  foundedYear: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear())
    .optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  email: z.string().email('Invalid email').optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,20}$/, 'Invalid phone number')
    .optional(),
  location: z.string().max(200).optional(),
  logo: z.string().url('Invalid logo URL').optional(),
  coverImage: z.string().url('Invalid cover image URL').optional(),
  socialLinks: z
    .object({
      linkedin: z.string().url().optional().or(z.literal('')),
      twitter: z.string().url().optional().or(z.literal('')),
      facebook: z.string().url().optional().or(z.literal('')),
      instagram: z.string().url().optional().or(z.literal('')),
    })
    .optional(),
  benefits: z.array(z.string().max(100)).max(20).default([]),
})

export type CreateCompanyInput = z.infer<typeof createCompanySchema>

export const updateCompanySchema = createCompanySchema.partial().extend({
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format')
    .optional(),
})

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>
