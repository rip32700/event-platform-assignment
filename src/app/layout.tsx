import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Hello World App',
    description: 'A simple NextJS 15 hello world application',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    )
}
