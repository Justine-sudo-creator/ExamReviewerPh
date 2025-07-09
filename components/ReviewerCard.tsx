import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, ShoppingCart } from 'lucide-react'
import { Reviewer } from '@/lib/database'
import Image from 'next/image'
import Link from 'next/link'

interface ReviewerCardProps {
  reviewer: Reviewer
}

export default function ReviewerCard({ reviewer }: ReviewerCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Practice Sets':
        return 'bg-blue-100 text-blue-800'
      case 'Mock Exams':
        return 'bg-purple-100 text-purple-800'
      case 'Tips & Cheatsheets':
        return 'bg-red-100 text-red-800'
      case 'Bundles':
        return 'bg-orange-100 text-orange-800'
      case 'Others':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-4">
        {/* Product Image */}
        <div className="w-full h-48 mb-4 relative overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={reviewer.image_url || '/placeholder-reviewer.png'}
            alt={reviewer.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge className={getSubjectColor(reviewer.subject)}>{reviewer.subject}</Badge>
          <Badge variant="outline" className={getDifficultyColor(reviewer.difficulty)}>
            {reviewer.difficulty}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight">{reviewer.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <p className="text-gray-600 text-sm leading-relaxed">{reviewer.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-900">₱{reviewer.price}</span>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
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