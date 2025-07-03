import { HttpStatus } from '@/lib/constants/http-status'
import { CreateEventSchema, PaginationSchema } from '@/lib/schemas/event.schemas'
import { eventService } from '@/lib/services/event.service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams

        const result = PaginationSchema.safeParse({
            page: searchParams.get('page'),
            limit: searchParams.get('limit'),
        })

        if (!result.success) {
            return NextResponse.json({ error: 'Validation failed', details: result.error.errors }, { status: HttpStatus.BAD_REQUEST })
        }

        const events = await eventService.getEvents(result.data)
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
            return NextResponse.json({ error: 'Validation failed', details: result.error.errors }, { status: HttpStatus.BAD_REQUEST })
        }

        const event = await eventService.createEvent(result.data)
        return NextResponse.json(event, { status: HttpStatus.CREATED })
    } catch (error) {
        console.error('Error creating event:', error)
        return NextResponse.json({ error: 'Failed to create event' }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
    }
}
