import { Event, Prisma } from '@prisma/client'

// Use Prisma generated types for data operations
export type CreateEventData = Prisma.EventCreateInput
export type UpdateEventData = Prisma.EventUpdateInput

// Basic pagination types
export interface PaginationOptions {
    page?: number
    limit?: number
}

// Search options for event search
export interface SearchOptions extends PaginationOptions {
    q?: string
    location?: string
    dateFrom?: string
    dateTo?: string
    minPrice?: number
    maxPrice?: number
}

// Service layer types
export interface EventWithPagination {
    events: Event[]
    total: number
    page: number
    limit: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
}
