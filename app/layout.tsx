import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dev & Guild Architect Next.js + Discord Operations',
  description:
    'Portfolio of an ESTSB IT student and professional community manager: website development with Next.js, plus Discord guild architecture and community operations.',
  generator: 'v0.app',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Discord',
    'Community Management',
    'Guild Architecture',
    'IT Student',
    'ESTSB',
    'Portfolio',
  ],
  openGraph: {
    title: 'Dev & Guild Architect — Portfolio',
    description:
      'Web development (Next.js, React, TypeScript) and Discord community operations.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}