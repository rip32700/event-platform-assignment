import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleEvents = [
    {
        title: 'Italian Cooking Masterclass',
        description: 'Learn to make authentic Italian pasta and sauces from a professional chef. Includes wine tasting and recipe booklet.',
        datetime: new Date('2024-02-15T18:00:00Z'),
        location: 'Culinary Arts Studio, Downtown',
        capacity: 12,
        price_per_person: 8500, // $85.00
    },
    {
        title: 'Morning Yoga & Meditation',
        description: 'Start your day with gentle yoga flows and guided meditation. Suitable for all levels. Mats provided.',
        datetime: new Date('2024-02-10T07:00:00Z'),
        location: 'Zen Garden Studio',
        capacity: 20,
        price_per_person: 2500, // $25.00
    },
    {
        title: 'Historic City Walking Tour',
        description: 'Explore the hidden gems and fascinating history of our city with a local expert guide. 2-hour guided tour.',
        datetime: new Date('2024-02-12T14:00:00Z'),
        location: 'City Hall Square (Meeting Point)',
        capacity: 25,
        price_per_person: 1800, // $18.00
    },
    {
        title: 'Photography Workshop: Golden Hour',
        description: 'Master the art of golden hour photography. Learn composition, lighting, and editing techniques.',
        datetime: new Date('2024-02-18T17:30:00Z'),
        location: 'Riverside Park',
        capacity: 8,
        price_per_person: 7500, // $75.00
    },
    {
        title: 'Wine & Cheese Tasting Evening',
        description: 'Sample premium wines paired with artisanal cheeses. Learn about wine regions and tasting notes.',
        datetime: new Date('2024-02-20T19:00:00Z'),
        location: 'The Wine Cellar',
        capacity: 16,
        price_per_person: 6500, // $65.00
    },
    {
        title: 'Rock Climbing for Beginners',
        description: 'Introduction to indoor rock climbing with certified instructors. All equipment included.',
        datetime: new Date('2024-02-25T10:00:00Z'),
        location: 'Adventure Climbing Gym',
        capacity: 10,
        price_per_person: 4500, // $45.00
    },
    {
        title: 'Pottery Making Workshop',
        description: 'Create your own ceramic masterpiece on the pottery wheel. Clay, tools, and firing included.',
        datetime: new Date('2024-03-02T13:00:00Z'),
        location: 'Clay Works Studio',
        capacity: 6,
        price_per_person: 5500, // $55.00
    },
    {
        title: 'Salsa Dancing Lessons',
        description: 'Learn basic salsa steps and turns in a fun, social environment. No partner required!',
        datetime: new Date('2024-02-22T20:00:00Z'),
        location: 'Dance Fever Studio',
        capacity: 30,
        price_per_person: 2000, // $20.00
    },
    {
        title: 'Urban Sketching Adventure',
        description: 'Explore the city while learning to sketch architecture and street scenes. Materials provided.',
        datetime: new Date('2024-02-28T11:00:00Z'),
        location: 'Arts District Plaza',
        capacity: 15,
        price_per_person: 3500, // $35.00
    },
    {
        title: 'Craft Beer Brewing Workshop',
        description: 'Learn the brewing process and create your own craft beer recipe. Take home samples!',
        datetime: new Date('2024-03-05T15:00:00Z'),
        location: 'Local Brewery & Taphouse',
        capacity: 12,
        price_per_person: 9500, // $95.00
    },
]

async function main() {
    console.log('🌱 Seeding database...')

    // Clear existing events
    await prisma.event.deleteMany()
    console.log('🗑️  Cleared existing events')

    // Create new events
    for (const eventData of sampleEvents) {
        const event = await prisma.event.create({
            data: eventData,
        })
        console.log(`✅ Created event: ${event.title}`)
    }

    console.log('🎉 Seeding completed successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
