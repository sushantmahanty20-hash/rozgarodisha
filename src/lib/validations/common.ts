import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export type PaginationInput = z.infer<typeof paginationSchema>

export const searchSchema = z.object({
  q: z.string().min(1).max(200).optional(),
})

export type SearchInput = z.infer<typeof searchSchema>

export const idParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
})

export type IdParamInput = z.infer<typeof idParamSchema>

export const slugParamSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
})

export type SlugParamInput = z.infer<typeof slugParamSchema>

export const dateRangeSchema = z
  .object({
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
  })
  .refine((data) => !data.from || !data.to || data.from <= data.to, {
    message: 'Start date must be before end date',
  })

export type DateRangeInput = z.infer<typeof dateRangeSchema>
