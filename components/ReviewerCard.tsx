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
      return '!bg-green-100 !text-green-800 !border-green-200'
    case 'Medium':
      return '!bg-yellow-100 !text-yellow-800 !border-yellow-200'
    case 'Hard':
      return '!bg-red-100 !text-red-800 !border-red-200'
    default:
      return '!bg-gray-100 !text-gray-800 !border-gray-200'
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
    <Card className="h-full flex flex-col transition-all duration-300 bg-white dark:bg-[#1f2937] rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl hover:scale-[1.015]">
  <CardHeader className="pb-4 relative">
    {/* Product Image with Zoom on Hover */}
    <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden">
      <div className="overflow-hidden rounded-2xl">
        <Image
          src={reviewer.image_url || '/placeholder-reviewer.png'}
          alt={reviewer.title}
          width={800}
          height={800}
          layout="intrinsic"
          className="w-full h-auto object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Preview Button */}
      <div className="absolute top-3 right-3">
        <button
          onClick={() => window.open(reviewer.preview_url, '_blank')}
          className="w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md hover:shadow-lg"
        >
          <Eye className="h-4 w-4 text-gray-700" />
        </button>
      </div>
    </div>

    {/* Badges */}
    <div className="flex items-start justify-between gap-2 mt-4 mb-3">
      <Badge className={`border font-medium px-3 py-1 rounded-full text-sm bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-pink-200`}>
        {reviewer.subject}
      </Badge>
      <Badge
  className={`${getDifficultyColor(reviewer.difficulty)} border font-medium px-3 py-1 rounded-full`}
>
        {reviewer.difficulty}
      </Badge>
    </div>

    {/* Title */}
      <CardTitle className="text-lg sm:text-xl font-semibold tracking-tight text-gray-800 dark:text-white leading-tight">
    {reviewer.title}
  </CardTitle>
  </CardHeader>

  {/* Description */}
  <CardContent className="flex-1 pb-4">
    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed tracking-normal">
  {reviewer.description}
</p>
  </CardContent>

  {/* Footer */}
  <CardFooter className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
    <span className="text-2xl font-bold text-gray-900 dark:text-white">₱{reviewer.price}</span>
    <Button
      asChild
      className="px-6 py-2 font-semibold text-white rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
    >
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