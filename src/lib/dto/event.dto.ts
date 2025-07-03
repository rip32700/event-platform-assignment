// Event DTO for API responses (camelCase for frontend)
export interface EventDTO {
    id: string
    title: string
    description?: string
    datetime: string
    location: string
    capacity: number
    pricePerPerson: number
    createdAt: string
}
