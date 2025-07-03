# Event Platform

A modern event management platform built with Next.js that allows users to create, view, edit, and delete events with advanced search and filtering capabilities.

## 🚀 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible React components

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe ORM and database toolkit
- **PostgreSQL** - Relational database
- **Zod** - Schema validation library

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Docker Compose** - Database containerization

## 🏗️ Architecture

The application follows a clean layered architecture:

```
UI Components (React)
    ↓
Data Layer (src/data/events.ts)
    ↓
API Routes (src/app/api/*)
    ↓
Service Layer (src/lib/services/*)
    ↓
Repository Layer (src/lib/repositories/*)
    ↓
Database (Prisma + PostgreSQL)
```

### Layer Responsibilities

1. **UI Components**: Handle user interactions and display data
2. **Data Layer**: Centralized API calls and error handling
3. **API Routes**: HTTP endpoints with request/response handling
4. **Service Layer**: Business logic and data transformation
5. **Repository Layer**: Database operations and queries
6. **Database**: Data persistence with Prisma ORM

## 📡 API Endpoints

### Events

- `GET /api/events` - Get all events
- `POST /api/events` - Create a new event
- `GET /api/events/[id]` - Get event by ID
- `PUT /api/events/[id]` - Update event by ID
- `DELETE /api/events/[id]` - Delete event by ID
- `GET /api/events/search` - Search and filter events

### Search Parameters

```typescript
{
  q?: string           // Text search (title/description)
  location?: string    // Location filter
  dateFrom?: string    // Start date filter (ISO string)
  dateTo?: string      // End date filter (ISO string)
  minPrice?: string    // Minimum price in dollars
  maxPrice?: string    // Maximum price in dollars
}
```

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── events/        # Event API endpoints
│   ├── events/            # Event pages
│   │   ├── [id]/         # Event detail page
│   │   └── page.tsx      # Events listing page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── event-card.tsx    # Event display card
│   ├── event-form.tsx    # Event creation/edit form
│   ├── event-form-modal.tsx # Modal wrapper for form
│   └── event-search.tsx  # Search and filter component
├── data/                 # Data layer
│   └── events.ts         # Centralized API calls
├── lib/                  # Utilities and configurations
│   ├── constants/        # App constants
│   ├── dto/             # Data transfer objects
│   ├── repositories/    # Database access layer
│   ├── schemas/         # Zod validation schemas
│   ├── services/        # Business logic layer
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Helper utilities
└── prisma/              # Database schema and migrations
    ├── schema.prisma    # Database schema
    └── migrations/      # Database migrations
```

## 🎯 Features

### Event Management

- ✅ Create events with title, description, date/time, location, capacity, and price
- ✅ Edit existing events with pre-populated forms
- ✅ Delete events with confirmation dialog
- ✅ View detailed event information

### Search & Filtering

- ✅ Text search across event titles and descriptions
- ✅ Filter by location
- ✅ Filter by date range
- ✅ Filter by price range
- ✅ Real-time search results

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Docker (optional, for local database)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd event-platform-assignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/event_platform"
```

### 4. Quick Setup (Recommended)

```bash
npm run setup
```

This command will:

- Install dependencies
- Start PostgreSQL with Docker Compose
- Push database schema
- Generate Prisma client

### 5. Manual Setup (Alternative)

If you prefer manual control:

#### Database Setup

```bash
npm run db:start        # Start PostgreSQL with Docker
npm run db:push         # Push schema to database
npm run db:generate     # Generate Prisma client
npm run db:seed         # Optional: seed with sample data
```

#### Start Development

```bash
npm run dev             # Development server only
# OR
npm run dev:full        # Database + development server
```

The application will be available at `http://localhost:3000`.

## 🗄️ Database Schema

### Event Model

```prisma
model Event {
  id               String   @id @default(cuid())
  title            String
  description      String?
  datetime         DateTime
  location         String
  capacity         Int
  price_per_person Int      // Stored in cents (e.g., 2500 = $25.00)
  created_at       DateTime @default(now())
  updated_at       DateTime @updatedAt

  // Indexes for performance
  @@index([datetime])
  @@index([price_per_person])
  @@index([location])
  @@index([title])
  @@index([datetime, price_per_person])
  @@map("events")
}
```

## 💰 Price Handling

The application uses a **cents-based** pricing system for accuracy:

- **Storage**: Prices stored as integers in cents (e.g., 2500 = $25.00)
- **Display**: Converted to dollars for user interface
- **API**: Accepts dollars, converts to cents for storage
- **Search**: Price filters converted from dollars to cents

## 🔧 Available Scripts

### Development

```bash
npm run dev          # Start development server (with Turbopack)
npm run dev:full     # Start database + development server
npm run setup        # Complete project setup (install, db, schema, generate)
```

### Build & Deploy

```bash
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Database Management

```bash
npm run db:start     # Start PostgreSQL with Docker Compose
npm run db:stop      # Stop database
npm run db:reset     # Reset database completely
npm run db:push      # Push schema changes to database
npm run db:migrate   # Run database migrations (dev)
npm run db:migrate:deploy # Deploy migrations (production)
npm run db:studio    # Open Prisma Studio (database browser)
npm run db:generate  # Generate Prisma client
npm run db:seed      # Seed database with sample data
```

## 📝 API Response Format

### Event DTO

```typescript
{
  id: string
  title: string
  description?: string
  datetime: string        // ISO 8601 format
  location: string
  capacity: number
  pricePerPerson: number  // In cents
  createdAt: string       // ISO 8601 format
}
```

### Error Response

```typescript
{
  error: string
  details?: ValidationError[]
}
```

## 🚦 Development Guidelines

### Code Organization

- Components use **PascalCase** (e.g., `EventCard.tsx`)
- Utilities use **camelCase** (e.g., `formatPrice.ts`)
- Database fields use **snake_case** (e.g., `price_per_person`)
- Frontend fields use **camelCase** (e.g., `pricePerPerson`)

### Error Handling

- API errors are parsed using `parseApiError` utility
- Toast notifications provide user feedback
- Validation errors show field-specific messages

### Type Safety

- All API calls have TypeScript types
- Zod schemas validate request/response data
- Prisma provides database type safety

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Optimized fetching - use server components more and/or integrate TanStack Query for caching
- [ ] Paginated fetching for large data sets
- [ ] In a properly scaled environment, make a proper API with NestJS or Hono, and convert project to mono repo
- [ ] Booking functionality including payment processing

## 📄 License

This project is licensed under the MIT License.
