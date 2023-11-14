import type { Metadata } from 'next'
import { Ubuntu_Mono as FontMono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'

import { DarkModeSwitch } from '@/components/DarkModeSwitch'
import { cn } from '@/lib/utils'
import './globals.css'

export const fontMono = FontMono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Moscow Hackers Leaderboard',
  description: 'Fun little leaderboard for the Moscow Hackers group',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/hacker-light.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/hacker.svg',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'font-mono antialiased bg-gray-100 dark:bg-gray-800',
          fontMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <nav className="flex justify-end items-center p-6">
              <DarkModeSwitch />
            </nav>
          </header>
          <main className="w-full max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
