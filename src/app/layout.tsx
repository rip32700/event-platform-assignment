import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
    title: 'Event Platform',
    description: 'Discover and join amazing events',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
                <Toaster position="top-right" />
            </body>
        </html>
    )
}
