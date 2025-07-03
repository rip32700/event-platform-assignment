import { EventDTO } from '@/lib/dto/event.dto'
import { eventRepository } from '@/lib/repositories/event.repository'
import { CreateEventData, SearchOptions, UpdateEventData } from '@/lib/types/event.types'
import { Event } from '@prisma/client'

// Map Prisma Event to EventDTO (snake_case to camelCase)
function mapEventToDTO(event: Event): EventDTO {
    return {
        id: event.id,
        title: event.title,
        description: event.description || undefined,
        datetime: event.datetime.toISOString(),
        location: event.location,
        capacity: event.capacity,
        pricePerPerson: event.price_per_person,
        createdAt: event.created_at.toISOString(),
    }
}

export class EventService {
    async createEvent(data: CreateEventData): Promise<EventDTO> {
        const event = await eventRepository.create(data)
        return mapEventToDTO(event)
    }

    async getEventById(id: string): Promise<EventDTO | null> {
        const event = await eventRepository.findById(id)
        return event ? mapEventToDTO(event) : null
    }

    async getEvents(): Promise<EventDTO[]> {
        const events = await eventRepository.findMany()
        return events.map(mapEventToDTO)
    }

    async searchEvents(searchOptions: SearchOptions = {}): Promise<EventDTO[]> {
        const events = await eventRepository.search(searchOptions)
        return events.map(mapEventToDTO)
    }

    async updateEvent(id: string, data: UpdateEventData): Promise<EventDTO> {
        const event = await eventRepository.update(id, data)
        return mapEventToDTO(event)
    }

    async deleteEvent(id: string): Promise<EventDTO> {
        const event = await eventRepository.delete(id)
        return mapEventToDTO(event)
    }
}

export const eventService = new EventService()
