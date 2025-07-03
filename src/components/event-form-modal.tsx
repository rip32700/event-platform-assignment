'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { EventDTO } from '@/lib/dto/event.dto'
import EventForm from './event-form'

interface EventFormModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    event?: EventDTO
    onSuccess?: (event: EventDTO) => void
}

export default function EventFormModal({ open, onOpenChange, event, onSuccess }: EventFormModalProps) {
    const handleSuccess = (updatedEvent: EventDTO) => {
        onSuccess?.(updatedEvent)
        onOpenChange(false)
    }

    const handleCancel = () => {
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-foreground">{event ? 'Edit Event' : 'Create New Event'}</DialogTitle>
                </DialogHeader>
                <EventForm event={event} onSuccess={handleSuccess} onCancel={handleCancel} />
            </DialogContent>
        </Dialog>
    )
}
