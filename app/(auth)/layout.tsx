import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthNavbar from '@/components/layout/AuthNavbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'EDUNUTSHELL - Authentication',
    description: 'Sign in or create your account to access EDUNUTSHELL',
}

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthNavbar />
                <main className="min-h-screen">
                    {children}
                </main>
                {/* No Footer and No AI Learning Mentor for auth pages */}
            </body>
        </html>
    )
}