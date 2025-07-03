import { HttpStatus } from '@/lib/constants/http-status'
import { UpdateEventSchema } from '@/lib/schemas/event.schemas'
import { eventService } from '@/lib/services/event.service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const event = await eventService.getEventById(id)

        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: HttpStatus.NOT_FOUND })
        }

        return NextResponse.json(event)
    } catch (error) {
        console.error('Error fetching event:', error)
        return NextResponse.json({ error: 'Failed to fetch event' }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const body = await request.json()

        const result = UpdateEventSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json({ error: 'Validation failed', details: result.error.errors }, { status: HttpStatus.BAD_REQUEST })
        }

        const event = await eventService.updateEvent(id, result.data)
        return NextResponse.json(event)
    } catch (error) {
        console.error('Error updating event:', error)
        return NextResponse.json({ error: 'Failed to update event' }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
    }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const event = await eventService.deleteEvent(id)

        return NextResponse.json(event)
    } catch (error) {
        console.error('Error deleting event:', error)
        return NextResponse.json({ error: 'Failed to delete event' }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
    }
}
