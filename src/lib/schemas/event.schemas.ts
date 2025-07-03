import { z } from 'zod'

export const CreateEventSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    datetime: z
        .string()
        .datetime('Invalid datetime format')
        .refine((date) => new Date(date) > new Date(), 'Event datetime cannot be in the past'),
    location: z.string().min(1, 'Location is required'),
    capacity: z.number().int().positive('Capacity must be a positive integer'),
    price_per_person: z.number().int().min(0, 'Price must be non-negative'),
})

export const UpdateEventSchema = CreateEventSchema.partial()

export const PaginationSchema = z.object({
    page: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val) : 1))
        .pipe(z.number().int().min(1, 'Page must be a positive integer')),
    limit: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val) : 10))
        .pipe(z.number().int().min(1).max(100, 'Limit must be between 1 and 100')),
})

export const SearchEventSchema = z
    .object({
        q: z.string().optional(), // Search query for title/description
        location: z.string().optional(), // Location filter
        dateFrom: z
            .string()
            .optional()
            .refine((date) => !date || !isNaN(Date.parse(date)), 'Invalid date format for dateFrom'),
        dateTo: z
            .string()
            .optional()
            .refine((date) => !date || !isNaN(Date.parse(date)), 'Invalid date format for dateTo'),
        minPrice: z
            .string()
            .optional()
            .transform((val) => (val ? parseInt(val) : undefined))
            .pipe(z.number().int().min(0, 'Minimum price must be non-negative').optional()),
        maxPrice: z
            .string()
            .optional()
            .transform((val) => (val ? parseInt(val) : undefined))
            .pipe(z.number().int().min(0, 'Maximum price must be non-negative').optional()),
        page: z
            .string()
            .optional()
            .transform((val) => (val ? parseInt(val) : 1))
            .pipe(z.number().int().min(1, 'Page must be a positive integer')),
        limit: z
            .string()
            .optional()
            .transform((val) => (val ? parseInt(val) : 10))
            .pipe(z.number().int().min(1).max(100, 'Limit must be between 1 and 100')),
    })
    .refine(
        (data) => {
            if (data.dateFrom && data.dateTo) {
                return new Date(data.dateFrom) <= new Date(data.dateTo)
            }
            return true
        },
        { message: 'dateFrom must be before or equal to dateTo' }
    )

export type CreateEventInput = z.infer<typeof CreateEventSchema>
export type UpdateEventInput = z.infer<typeof UpdateEventSchema>
export type PaginationInput = z.infer<typeof PaginationSchema>
export type SearchEventInput = z.infer<typeof SearchEventSchema>
