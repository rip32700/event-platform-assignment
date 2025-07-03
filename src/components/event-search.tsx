'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Filter, Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function EventSearch() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isExpanded, setIsExpanded] = useState(false)

    const [formData, setFormData] = useState({
        search: searchParams.get('search') || '',
        location: searchParams.get('location') || '',
        dateFrom: searchParams.get('dateFrom') || '',
        dateTo: searchParams.get('dateTo') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSearch = () => {
        const params = new URLSearchParams()

        if (formData.search) params.set('search', formData.search)
        if (formData.location) params.set('location', formData.location)
        if (formData.dateFrom) params.set('dateFrom', formData.dateFrom)
        if (formData.dateTo) params.set('dateTo', formData.dateTo)
        if (formData.minPrice) params.set('minPrice', formData.minPrice)
        if (formData.maxPrice) params.set('maxPrice', formData.maxPrice)

        router.push(`/events?${params.toString()}`)
    }

    const handleClear = () => {
        setFormData({
            search: '',
            location: '',
            dateFrom: '',
            dateTo: '',
            minPrice: '',
            maxPrice: '',
        })
        router.push('/events')
    }

    const hasFilters = Object.values(formData).some((value) => value !== '')

    return (
        <div className="space-y-4">
            {/* Main search bar */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Search events..."
                        value={formData.search}
                        onChange={(e) => handleInputChange('search', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="pl-10 bg-background border-input text-foreground placeholder:text-muted-foreground"
                    />
                </div>
                <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="border-input text-foreground hover:bg-accent">
                    <Filter className="w-4 h-4" />
                </Button>
                <Button onClick={handleSearch} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Search
                </Button>
            </div>

            {/* Expanded filters */}
            {isExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                        <Input
                            placeholder="Enter location"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Date From</label>
                        <Input
                            type="date"
                            value={formData.dateFrom}
                            onChange={(e) => handleInputChange('dateFrom', e.target.value)}
                            className="bg-background border-input text-foreground"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Date To</label>
                        <Input
                            type="date"
                            value={formData.dateTo}
                            onChange={(e) => handleInputChange('dateTo', e.target.value)}
                            className="bg-background border-input text-foreground"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Min Price ($)</label>
                        <Input
                            type="number"
                            placeholder="0"
                            value={formData.minPrice}
                            onChange={(e) => handleInputChange('minPrice', e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Max Price ($)</label>
                        <Input
                            type="number"
                            placeholder="1000"
                            value={formData.maxPrice}
                            onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                        />
                    </div>

                    <div className="flex items-end">
                        {hasFilters && (
                            <Button variant="outline" onClick={handleClear} className="w-full border-input text-foreground hover:bg-accent">
                                <X className="w-4 h-4 mr-2" />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
