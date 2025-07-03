import { format } from 'date-fns'

// Utility functions for price conversion between dollars and cents
export const dollarsToCents = (dollars: number): number => Math.round(dollars * 100)
export const centsToDollars = (cents: number): number => cents / 100

// Price formatting with proper currency formatting
export const formatEventPrice = (priceInCents: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(priceInCents / 100)
}

// Date formatting functions for events
export function formatEventDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return format(dateObj, 'PPP p') // e.g., "January 1, 2024 at 6:00 PM"
}

export function formatEventDateShort(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return format(dateObj, 'PP') // e.g., "Jan 1, 2024"
}
