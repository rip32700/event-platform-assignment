import { eventRepository } from '@/lib/repositories/event.repository'
import { CreateEventData, EventWithPagination, PaginationOptions, UpdateEventData } from '@/lib/types/event.types'
import { Event } from '@prisma/client'

export class EventService {
    async createEvent(data: CreateEventData): Promise<Event> {
        return eventRepository.create(data)
    }

    async getEventById(id: string): Promise<Event | null> {
        return eventRepository.findById(id)
    }

    async getEvents(pagination: PaginationOptions = {}): Promise<EventWithPagination> {
        const { page = 1, limit = 10 } = pagination

        const { events, total } = await eventRepository.findMany(pagination)

        const totalPages = Math.ceil(total / limit)
        const hasNext = page < totalPages
        const hasPrev = page > 1

        return {
            events,
            total,
            page,
            limit,
            totalPages,
            hasNext,
            hasPrev,
        }
    }

    async updateEvent(id: string, data: UpdateEventData): Promise<Event> {
        return eventRepository.update(id, data)
    }

    async deleteEvent(id: string): Promise<Event> {
        return eventRepository.delete(id)
    }
}

export const eventService = new EventService()
