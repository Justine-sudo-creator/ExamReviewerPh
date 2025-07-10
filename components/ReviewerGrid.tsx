'use client'

import { useState, useEffect } from 'react'
import { getReviewers, initializeData, Reviewer } from '@/lib/database'
import ReviewerCard from './ReviewerCard'
import { Button } from '@/components/ui/button'
import { Loader2, AlertCircle } from 'lucide-react'

const subjects = ['All', 'Practice Sets', 'Mock Exams', 'Tips & Cheatsheets', 'Bundles', 'Others']

export default function ReviewerGrid() {
  const [reviewers, setReviewers] = useState<Reviewer[]>([])
  const [filteredReviewers, setFilteredReviewers] = useState<Reviewer[]>([])
  const [activeSubject, setActiveSubject] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    initializeData()
    fetchReviewers()
  }, [])

  useEffect(() => {
    if (activeSubject === 'All') {
      setFilteredReviewers(reviewers)
    } else {
      setFilteredReviewers(reviewers.filter(reviewer => reviewer.subject === activeSubject))
    }
  }, [activeSubject, reviewers])

  const fetchReviewers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await getReviewers()
      setReviewers(data || [])
    } catch (err) {
      console.error('Error fetching reviewers:', err)
      setError('Failed to load reviewers. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchReviewers} variant="outline" className="rounded-full">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <section id="reviewers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Browse Our Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our curated collection of entrance exam review materials
          </p>
        </div>

        {/* Subject Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={activeSubject === subject ? "default" : "outline"}
              onClick={() => setActiveSubject(subject)}
              className={`transition-all duration-200 rounded-full px-6 py-2 font-semibold ${
                activeSubject === subject
                  ? 'bg-gray-900 hover:bg-gray-800 text-white'
                  : 'hover:bg-gray-100 hover:text-gray-900 border-gray-300'
              }`}
            >
              {subject}
            </Button>
          ))}
        </div>

        {/* Reviewers Grid */}
        {filteredReviewers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviewers.map((reviewer) => (
              <ReviewerCard key={reviewer.id} reviewer={reviewer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No reviewers found for {activeSubject === 'All' ? 'this search' : activeSubject}.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}