import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { EventDTO } from '@/lib/dto/event.dto'
import { formatEventDate, formatEventPrice } from '@/lib/utils/event.utils'
import { CalendarDays, MapPin, Users } from 'lucide-react'
import Link from 'next/link'

interface EventCardProps {
    event: EventDTO
}

export function EventCard({ event }: EventCardProps) {
    const price = formatEventPrice(event.pricePerPerson)
    const eventDate = formatEventDate(event.datetime)

    return (
        <Card className="h-full flex flex-col bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-lg text-foreground line-clamp-2 leading-tight">{event.title}</h3>
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground shrink-0">
                        {price}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-3">
                {event.description && <p className="text-muted-foreground text-sm line-clamp-3">{event.description}</p>}

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="w-4 h-4 shrink-0" />
                        <span className="line-clamp-1">{eventDate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="line-clamp-1">{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 shrink-0" />
                        <span>{event.capacity} spots available</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-3">
                <Link href={`/events/${event.id}`} className="w-full">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">View Details</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
