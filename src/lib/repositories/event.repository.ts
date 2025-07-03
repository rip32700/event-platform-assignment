import { prisma } from '@/lib/prisma'
import { CreateEventData, SearchOptions, UpdateEventData } from '@/lib/types/event.types'
import { Event, Prisma } from '@prisma/client'

export class EventRepository {
    async create(data: CreateEventData): Promise<Event> {
        return prisma.event.create({
            data,
        })
    }

    async findById(id: string): Promise<Event | null> {
        return prisma.event.findUnique({ where: { id } })
    }

    async findMany(): Promise<Event[]> {
        return prisma.event.findMany({
            orderBy: { created_at: 'desc' },
        })
    }

    async search(options: SearchOptions = {}): Promise<Event[]> {
        const { q, location, dateFrom, dateTo, minPrice, maxPrice } = options

        // Build where clause dynamically
        const where: Prisma.EventWhereInput = {}

        // Text search in title and description
        if (q) {
            where.OR = [{ title: { contains: q, mode: 'insensitive' } }, { description: { contains: q, mode: 'insensitive' } }]
        }

        // Location filter
        if (location) {
            where.location = { contains: location, mode: 'insensitive' }
        }

        // Date range filter
        if (dateFrom || dateTo) {
            where.datetime = {}
            if (dateFrom) {
                where.datetime.gte = new Date(dateFrom)
            }
            if (dateTo) {
                where.datetime.lte = new Date(dateTo)
            }
        }

        // Price range filter
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price_per_person = {}
            if (minPrice !== undefined) {
                where.price_per_person.gte = minPrice
            }
            if (maxPrice !== undefined) {
                where.price_per_person.lte = maxPrice
            }
        }

        return prisma.event.findMany({
            where,
            orderBy: { datetime: 'asc' }, // Order by event date for search results
        })
    }

    async update(id: string, data: UpdateEventData): Promise<Event> {
        return prisma.event.update({ where: { id }, data })
    }

    async delete(id: string): Promise<Event> {
        return prisma.event.delete({ where: { id } })
    }
}

export const eventRepository = new EventRepository()
