import { HttpStatus } from '@/lib/constants/http-status'
import { SearchEventSchema } from '@/lib/schemas/event.schemas'
import { eventService } from '@/lib/services/event.service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams

        // Extract all search parameters
        const searchQuery = {
            q: searchParams.get('q') || undefined,
            location: searchParams.get('location') || undefined,
            dateFrom: searchParams.get('dateFrom') || undefined,
            dateTo: searchParams.get('dateTo') || undefined,
            minPrice: searchParams.get('minPrice') || undefined,
            maxPrice: searchParams.get('maxPrice') || undefined,
            page: searchParams.get('page') || undefined,
            limit: searchParams.get('limit') || undefined,
        }

        // Validate search parameters
        const result = SearchEventSchema.safeParse(searchQuery)
        if (!result.success) {
            return NextResponse.json({ error: 'Validation failed', details: result.error.errors }, { status: HttpStatus.BAD_REQUEST })
        }

        // Perform search
        const events = await eventService.searchEvents(result.data)

        return NextResponse.json({
            ...events,
            searchQuery: result.data, // Include search parameters in response for debugging
        })
    } catch (error) {
        console.error('Error searching events:', error)
        return NextResponse.json({ error: 'Failed to search events' }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
    }
}
