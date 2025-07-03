import { HttpStatus } from '@/lib/constants/http-status'
import { CreateEventSchema } from '@/lib/schemas/event.schemas'
import { eventService } from '@/lib/services/event.service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    try {
        const events = await eventService.getEvents()
        return NextResponse.json(events)
    } catch (error) {
        console.error('Error fetching events:', error)
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const result = CreateEventSchema.safeParse(body)
        if (!result.success) {
            const errorCount = result.error.errors.length
            return NextResponse.json(
                {
                    error: `Validation failed: ${errorCount} error${errorCount > 1 ? 's' : ''} found`,
                    details: result.error.errors,
                },
                { status: HttpStatus.BAD_REQUEST }
            )
        }

        const event = await eventService.createEvent(result.data)
        return NextResponse.json(event, { status: HttpStatus.CREATED })
    } catch (error) {
        console.error('Error creating event:', error)
        return NextResponse.json({ error: 'Failed to create event' }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
    }
}
