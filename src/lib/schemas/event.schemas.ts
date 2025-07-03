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

export type CreateEventInput = z.infer<typeof CreateEventSchema>
export type UpdateEventInput = z.infer<typeof UpdateEventSchema>
export type PaginationInput = z.infer<typeof PaginationSchema>
