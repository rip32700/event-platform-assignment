import { EventDTO } from '@/lib/dto/event.dto'
import { parseApiError } from '@/lib/utils/error.utils'

// Base API configuration
const API_BASE = '/api/events'

// Search/List Events
export async function fetchEvents(searchParams?: URLSearchParams): Promise<EventDTO[]> {
    const params = new URLSearchParams()

    if (searchParams) {
        const search = searchParams.get('search')
        const location = searchParams.get('location')
        const dateFrom = searchParams.get('dateFrom')
        const dateTo = searchParams.get('dateTo')
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')

        if (search) params.append('q', search)
        if (location) params.append('location', location)
        if (dateFrom) params.append('dateFrom', dateFrom)
        if (dateTo) params.append('dateTo', dateTo)
        if (minPrice) params.append('minPrice', minPrice)
        if (maxPrice) params.append('maxPrice', maxPrice)
    }

    const url = `${API_BASE}/search?${params}`
    const response = await fetch(url)

    if (!response.ok) {
        const errorMessage = await parseApiError(response, 'Failed to fetch events')
        throw new Error(errorMessage)
    }

    return response.json()
}

// Fetch Single Event by ID
export async function fetchEventById(id: string): Promise<EventDTO> {
    const response = await fetch(`${API_BASE}/${id}`, {
        cache: 'no-store',
    })

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Event not found')
        }
        const errorMessage = await parseApiError(response, 'Failed to fetch event')
        throw new Error(errorMessage)
    }

    return response.json()
}

// Create New Event
export async function createEvent(eventData: {
    title: string
    description?: string | null
    datetime: string
    location: string
    capacity: number
    price_per_person: number
}): Promise<EventDTO> {
    const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    })

    if (!response.ok) {
        const errorMessage = await parseApiError(response, 'Failed to create event')
        throw new Error(errorMessage)
    }

    return response.json()
}

// Update Existing Event
export async function updateEvent(
    id: string,
    eventData: {
        title: string
        description?: string | null
        datetime: string
        location: string
        capacity: number
        price_per_person: number
    }
): Promise<EventDTO> {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    })

    if (!response.ok) {
        const errorMessage = await parseApiError(response, 'Failed to update event')
        throw new Error(errorMessage)
    }

    return response.json()
}

// Delete Event
export async function deleteEvent(id: string): Promise<EventDTO> {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        const errorMessage = await parseApiError(response, 'Failed to delete event')
        throw new Error(errorMessage)
    }

    return response.json()
}
