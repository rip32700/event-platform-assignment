'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DateTimePicker } from '@/components/ui/date-time-picker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createEvent, updateEvent } from '@/data/events'
import { EventDTO } from '@/lib/dto/event.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, DollarSign, MapPin, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const eventSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
    description: z.string().optional(),
    datetime: z.string().min(1, 'Date and time is required'),
    location: z.string().min(1, 'Location is required').max(200, 'Location must be less than 200 characters'),
    capacity: z.number().min(1, 'Capacity must be at least 1').max(10000, 'Capacity must be less than 10,000'),
    price: z.number().min(0, 'Price must be non-negative'),
})

type EventFormData = z.infer<typeof eventSchema>

interface EventFormProps {
    event?: EventDTO
    onSuccess?: (event: EventDTO) => void
    onCancel?: () => void
}

export default function EventForm({ event, onSuccess, onCancel }: EventFormProps) {
    const isEditing = !!event
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<EventFormData>({
        resolver: zodResolver(eventSchema),
    })

    // Populate form when editing
    useEffect(() => {
        if (event) {
            // Format datetime for input (remove timezone info)
            const datetime = new Date(event.datetime).toISOString().slice(0, 16)

            // Convert price from cents to dollars
            const price = event.pricePerPerson / 100

            reset({
                title: event.title,
                description: event.description || '',
                datetime,
                location: event.location,
                capacity: event.capacity,
                price,
            })
        }
    }, [event, reset])

    const onSubmit = async (data: EventFormData) => {
        setIsSubmitting(true)
        try {
            const eventData = {
                title: data.title,
                description: data.description || null,
                datetime: new Date(data.datetime).toISOString(),
                location: data.location,
                capacity: data.capacity,
                price_per_person: Math.round(data.price * 100), // Convert to cents
            }

            let result: EventDTO
            if (isEditing && event) {
                result = await updateEvent(event.id, eventData)
            } else {
                result = await createEvent(eventData)
            }

            toast.success(`Event ${isEditing ? 'updated' : 'created'} successfully!`)
            onSuccess?.(result)
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'creating'} event:`, error)
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error(`Failed to ${isEditing ? 'update' : 'create'} event. Please try again.`)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="bg-transparent border-none shadow-none">
            <CardContent className="px-0">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-foreground font-medium">
                            Event Title *
                        </Label>
                        <Input
                            id="title"
                            {...register('title')}
                            placeholder="Enter event title"
                            className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                        />
                        {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-foreground font-medium">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            {...register('description')}
                            placeholder="Describe your event..."
                            rows={4}
                            className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                        />
                        {errors.description && <p className="text-destructive text-sm">{errors.description.message}</p>}
                    </div>

                    {/* Date and Time */}
                    <div className="space-y-2">
                        <Label className="text-foreground font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Date & Time *
                        </Label>
                        <Controller
                            name="datetime"
                            control={control}
                            render={({ field }) => <DateTimePicker value={field.value} onChange={field.onChange} placeholder="Pick a date and time" />}
                        />
                        {errors.datetime && <p className="text-destructive text-sm">{errors.datetime.message}</p>}
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-foreground font-medium flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Location *
                        </Label>
                        <Input
                            id="location"
                            {...register('location')}
                            placeholder="Enter event location"
                            className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                        />
                        {errors.location && <p className="text-destructive text-sm">{errors.location.message}</p>}
                    </div>

                    {/* Capacity and Price Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Capacity */}
                        <div className="space-y-2">
                            <Label htmlFor="capacity" className="text-foreground font-medium flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Capacity *
                            </Label>
                            <Input
                                id="capacity"
                                type="number"
                                {...register('capacity', {
                                    setValueAs: (value) => (value === '' ? undefined : parseInt(value, 10)),
                                })}
                                placeholder="50"
                                min="1"
                                max="10000"
                                className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                            />
                            {errors.capacity && <p className="text-destructive text-sm">{errors.capacity.message}</p>}
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <Label htmlFor="price" className="text-foreground font-medium flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Price per Person *
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                {...register('price', {
                                    setValueAs: (value) => (value === '' ? undefined : parseFloat(value)),
                                })}
                                placeholder="25.00"
                                min="0"
                                className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                            />
                            {errors.price && <p className="text-destructive text-sm">{errors.price.message}</p>}
                        </div>
                    </div>

                    {/* Form Buttons */}
                    <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 border-input text-foreground hover:bg-accent">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                            {isSubmitting ? `${isEditing ? 'Updating' : 'Creating'} Event...` : `${isEditing ? 'Update' : 'Create'} Event`}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
