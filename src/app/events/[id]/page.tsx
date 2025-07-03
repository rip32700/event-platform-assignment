'use client'

import EventFormModal from '@/components/event-form-modal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { deleteEvent, fetchEventById } from '@/data/events'
import { EventDTO } from '@/lib/dto/event.dto'
import { formatEventDate, formatEventPrice } from '@/lib/utils/event.utils'
import { ArrowLeft, CalendarDays, DollarSign, MapPin, Trash2, Users } from 'lucide-react'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const [event, setEvent] = useState<EventDTO | null>(null)
    const [loading, setLoading] = useState(true)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [eventId, setEventId] = useState<string>('')

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const { id } = await params
                setEventId(id)
                const eventData = await fetchEventById(id)
                setEvent(eventData)
            } catch (error) {
                console.error('Error fetching event:', error)
                notFound()
            } finally {
                setLoading(false)
            }
        }

        loadEvent()
    }, [params])

    const handleDelete = async () => {
        if (!eventId) return

        setDeleting(true)
        try {
            await deleteEvent(eventId)
            toast.success('Event deleted successfully!')
            router.push('/events')
        } catch (error) {
            console.error('Error deleting event:', error)
            toast.error('Failed to delete event. Please try again.')
        } finally {
            setDeleting(false)
            setDeleteDialogOpen(false)
        }
    }

    const handleEditSuccess = (updatedEvent: EventDTO) => {
        setEvent(updatedEvent)
    }

    const handleRegister = () => {
        toast.info('Registration functionality is not yet implemented')
    }

    const handleShare = () => {
        toast.info('Share functionality is not yet implemented')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Loading event...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!event) {
        notFound()
    }

    const eventDate = formatEventDate(event.datetime)
    const price = formatEventPrice(event.pricePerPerson)

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Navigation */}
                    <div className="mb-6">
                        <Link href="/events">
                            <Button variant="outline" className="border-input text-foreground hover:bg-accent">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Events
                            </Button>
                        </Link>
                    </div>

                    {/* Event Card */}
                    <Card className="bg-card border-border">
                        <CardHeader className="pb-6">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-foreground mb-2">{event.title}</h1>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                                            {price}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => setEditModalOpen(true)} className="border-input text-foreground hover:bg-accent">
                                        Edit
                                    </Button>
                                    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-card border-border">
                                            <DialogHeader>
                                                <DialogTitle className="text-foreground">Delete Event</DialogTitle>
                                                <DialogDescription className="text-muted-foreground">
                                                    Are you sure you want to delete &ldquo;{event.title}&rdquo;? This action cannot be undone.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="border-input text-foreground hover:bg-accent">
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={handleDelete}
                                                    disabled={deleting}
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                >
                                                    {deleting ? 'Deleting...' : 'Delete Event'}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Description */}
                            {event.description && (
                                <div>
                                    <h2 className="text-xl font-semibold text-foreground mb-3">Description</h2>
                                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                                </div>
                            )}

                            <Separator className="bg-border" />

                            {/* Event Details */}
                            <div>
                                <h2 className="text-xl font-semibold text-foreground mb-4">Event Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <CalendarDays className="w-5 h-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium text-foreground">Date & Time</p>
                                                <p className="text-muted-foreground">{eventDate}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium text-foreground">Location</p>
                                                <p className="text-muted-foreground">{event.location}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium text-foreground">Capacity</p>
                                                <p className="text-muted-foreground">{event.capacity} attendees</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <DollarSign className="w-5 h-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium text-foreground">Price per Person</p>
                                                <p className="text-muted-foreground">{price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-border" />

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button onClick={handleRegister} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                                    Register for Event
                                </Button>
                                <Button variant="outline" onClick={handleShare} className="border-input text-foreground hover:bg-accent">
                                    Share Event
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Edit Modal */}
                    <EventFormModal open={editModalOpen} onOpenChange={setEditModalOpen} event={event} onSuccess={handleEditSuccess} />
                </div>
            </div>
        </div>
    )
}
