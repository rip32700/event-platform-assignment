import { Event, Prisma } from '@prisma/client'

// Use Prisma generated types for data operations
export type CreateEventData = Prisma.EventCreateInput
export type UpdateEventData = Prisma.EventUpdateInput

// Basic pagination types
export interface PaginationOptions {
    page?: number
    limit?: number
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
