'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DateTimePickerProps {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    disabled?: boolean
    className?: string
}

// Helper function to format date for datetime-local input
const formatForDateTimeLocal = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function DateTimePicker({ value, onChange, placeholder = 'Pick a date and time', disabled = false, className }: DateTimePickerProps) {
    const [internalDate, setInternalDate] = React.useState<Date | undefined>()
    const [open, setOpen] = React.useState(false)

    // Initialize from value prop
    React.useEffect(() => {
        if (value) {
            // Parse the datetime-local format (YYYY-MM-DDTHH:mm)
            setInternalDate(new Date(value))
        } else {
            setInternalDate(undefined)
        }
    }, [value])

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (!selectedDate) return

        let newDateTime: Date

        if (internalDate) {
            // Preserve the existing time when changing date
            newDateTime = new Date(selectedDate)
            newDateTime.setHours(internalDate.getHours(), internalDate.getMinutes(), 0, 0)
        } else {
            // No existing date, use selected date with default time (12:00)
            newDateTime = new Date(selectedDate)
            newDateTime.setHours(12, 0, 0, 0)
        }

        setInternalDate(newDateTime)
        onChange?.(formatForDateTimeLocal(newDateTime))
    }

    const handleTimeChange = (timeString: string) => {
        // Validate time format (HH:mm)
        if (!/^\d{1,2}:\d{2}$/.test(timeString)) {
            return // Don't process incomplete time strings
        }

        const [hours, minutes] = timeString.split(':').map(Number)

        // Validate time values
        if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            return // Don't process invalid time values
        }

        if (!internalDate) {
            // If no date selected, use today with the selected time
            const today = new Date()
            today.setHours(hours, minutes, 0, 0)
            setInternalDate(today)
            onChange?.(formatForDateTimeLocal(today))
            return
        }

        const newDateTime = new Date(internalDate)
        newDateTime.setHours(hours, minutes, 0, 0)

        setInternalDate(newDateTime)
        onChange?.(formatForDateTimeLocal(newDateTime))
    }

    const handleNowClick = () => {
        const now = new Date()
        setInternalDate(now)
        onChange?.(formatForDateTimeLocal(now))
    }

    const displayValue = internalDate ? `${format(internalDate, 'PPP')} at ${format(internalDate, 'h:mm a')}` : placeholder

    const timeValue = internalDate ? format(internalDate, 'HH:mm') : '12:00'

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !internalDate && 'text-muted-foreground')} disabled={disabled}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {displayValue}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-3 space-y-3">
                        <Calendar mode="single" selected={internalDate} onSelect={handleDateSelect} initialFocus />
                        <div className="space-y-2">
                            <Label htmlFor="time">Time</Label>
                            <Input id="time" type="time" value={timeValue} onChange={(e) => handleTimeChange(e.target.value)} className="w-full" />
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleNowClick} variant="outline" className="flex-1">
                                Now
                            </Button>
                            <Button size="sm" onClick={() => setOpen(false)} className="flex-1">
                                Done
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
