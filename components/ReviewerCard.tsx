import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Eye } from 'lucide-react'
import { Reviewer } from '@/lib/database'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ReviewerCardProps {
  reviewer: Reviewer
}

export default function ReviewerCard({ reviewer }: ReviewerCardProps) {
  const [showPreviewTooltip, setShowPreviewTooltip] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Hard':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Practice Sets':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Mock Exams':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Tips & Cheatsheets':
        return 'bg-pink-100 text-pink-800 border-pink-200'
      case 'Bundles':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Others':
        return 'bg-teal-100 text-teal-800 border-teal-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white rounded-3xl overflow-hidden group">
      <CardHeader className="pb-4 relative">
        {/* Product Image */}
        <div className="w-full h-64 mb-4 relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            src={reviewer.image_url || '/placeholder-reviewer.png'}
            alt={reviewer.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3">
            <div className="relative">
              <button
                onClick={() => {
                  // TODO: Add preview link functionality
                  console.log('Preview clicked for:', reviewer.title)
                  // window.open(reviewer.preview_url, '_blank')
                }}
                onMouseEnter={() => setShowPreviewTooltip(true)}
                onMouseLeave={() => setShowPreviewTooltip(false)}
                className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-sm"
              >
                <Eye className="h-4 w-4 text-gray-700" />
              </button>
              {showPreviewTooltip && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-10">
                  Preview
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <Badge className={`${getSubjectColor(reviewer.subject)} border font-medium px-3 py-1 rounded-full`}>
            {reviewer.subject}
          </Badge>
          <Badge className={`${getDifficultyColor(reviewer.difficulty)} border font-medium px-3 py-1 rounded-full`}>
            {reviewer.difficulty}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight font-bold text-gray-900">{reviewer.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <p className="text-gray-600 text-sm leading-relaxed">{reviewer.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-900">₱{reviewer.price}</span>
        </div>
        <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 py-2 font-semibold transition-all duration-200 hover:scale-105">
          <Link
            href={`/payment?product=${encodeURIComponent(reviewer.title)}&price=${reviewer.price}&id=${reviewer.id}`}
            className="flex items-center gap-2"
          >
            Buy Now
            <ShoppingCart className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}