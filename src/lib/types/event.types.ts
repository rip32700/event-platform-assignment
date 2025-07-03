import { Prisma } from '@prisma/client'

// Use Prisma generated types for data operations
export type CreateEventData = Prisma.EventCreateInput
export type UpdateEventData = Prisma.EventUpdateInput

// Search options for event search
export interface SearchOptions {
    q?: string
    location?: string
    dateFrom?: string
    dateTo?: string
    minPrice?: number
    maxPrice?: number
}
