'use client'

import { EventCard } from '@/components/event-card'
import EventFormModal from '@/components/event-form-modal'
import { EventSearch } from '@/components/event-search'
import { Button } from '@/components/ui/button'
import { fetchEvents } from '@/data/events'
import { EventDTO } from '@/lib/dto/event.dto'
import { Plus } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function EventsPage() {
    const searchParams = useSearchParams()
    const [events, setEvents] = useState<EventDTO[]>([])
    const [loading, setLoading] = useState(true)
    const [createModalOpen, setCreateModalOpen] = useState(false)

    useEffect(() => {
        const loadEvents = async () => {
            setLoading(true)
            try {
                const result = await fetchEvents(searchParams)
                setEvents(result)
            } catch (error) {
                console.error('Error fetching events:', error)
                toast.error('Failed to load events. Please try again.')
                setEvents([])
            } finally {
                setLoading(false)
            }
        }

        loadEvents()
    }, [searchParams])

    const handleCreateSuccess = () => {
        // Refresh the events list by re-fetching
        const loadEvents = async () => {
            try {
                const result = await fetchEvents(searchParams)
                setEvents(result)
            } catch (error) {
                console.error('Error refreshing events:', error)
                toast.error('Event created but failed to refresh list.')
            }
        }
        loadEvents()
        toast.success('Event created successfully!')
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-8">
                    <div className="text-center">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex-1" />
                            <div className="text-center flex-1">
                                <h1 className="text-4xl font-bold text-foreground mb-2">Events</h1>
                                <p className="text-muted-foreground">Discover and join amazing events</p>
                            </div>
                            <div className="flex-1 flex justify-end">
                                <Button onClick={() => setCreateModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Event
                                </Button>
                            </div>
                        </div>
                    </div>

                    <EventSearch />

                    {!loading && events.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">No events found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event: EventDTO) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create Modal */}
            <EventFormModal open={createModalOpen} onOpenChange={setCreateModalOpen} onSuccess={handleCreateSuccess} />
        </div>
    )
}
