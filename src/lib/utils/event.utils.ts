// Utility functions for price conversion between dollars and cents
export const dollarsToCents = (dollars: number): number => Math.round(dollars * 100)
export const centsToDollars = (cents: number): number => cents / 100

export const formatEventPrice = (cents: number): string => {
    return `$${centsToDollars(cents).toFixed(2)}`
}
