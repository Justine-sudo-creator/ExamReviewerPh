import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ExamReview PH - Entrance Exam Reviewers for Filipino Students',
  description: 'Get access to curated review materials for UPCAT, ACET, DCAT, and other Philippine entrance exams. Expert-created content to help you succeed.',
  keywords: 'entrance exam, reviewer, philippines, upcat, acet, dcat, math, english, filipino, logic, reading',
  authors: [{ name: 'ExamReview PH' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: 'https://examreview.ph',
    siteName: 'ExamReview PH',
    title: 'ExamReview PH - Entrance Exam Reviewers for Filipino Students',
    description: 'Get access to curated review materials for UPCAT, ACET, DCAT, and other Philippine entrance exams.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ExamReview PH - Entrance Exam Reviewers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@examreviewph',
    creator: '@examreviewph',
    title: 'ExamReview PH - Entrance Exam Reviewers for Filipino Students',
    description: 'Get access to curated review materials for UPCAT, ACET, DCAT, and other Philippine entrance exams.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}