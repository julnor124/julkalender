import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Julkalender 2025',
  description: 'En magisk svensk julkalender med 24 luckor att öppna',
  keywords: 'julkalender, jul, advent, svensk, kalender, tomten',
  authors: [{ name: 'Julkalender Team' }],
  openGraph: {
    title: 'Julkalender 2025',
    description: 'En magisk svensk julkalender med 24 luckor att öppna',
    type: 'website',
    locale: 'sv_SE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
