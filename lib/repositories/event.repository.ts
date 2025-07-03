import { prisma } from '@/lib/prisma'
import { CreateEventData, PaginationOptions, UpdateEventData } from '@/lib/types/event.types'
import { Event } from '@prisma/client'

export class EventRepository {
    async create(data: CreateEventData): Promise<Event> {
        return prisma.event.create({
            data,
        })
    }

    async findById(id: string): Promise<Event | null> {
        return prisma.event.findUnique({
            where: { id },
        })
    }

    async findMany(pagination: PaginationOptions = {}): Promise<{ events: Event[]; total: number }> {
        const { page = 1, limit = 10 } = pagination
        const skip = (page - 1) * limit

        const [events, total] = await Promise.all([
            prisma.event.findMany({
                skip,
                take: limit,
                orderBy: { created_at: 'desc' },
            }),
            prisma.event.count(),
        ])

        return { events, total }
    }

    async update(id: string, data: UpdateEventData): Promise<Event> {
        return prisma.event.update({
            where: { id },
            data,
        })
    }

    async delete(id: string): Promise<Event> {
        return prisma.event.delete({
            where: { id },
        })
    }
}

export const eventRepository = new EventRepository()
