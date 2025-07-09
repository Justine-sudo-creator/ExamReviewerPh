'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Book, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ExamReview PH</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#reviewers" className="text-gray-700 hover:text-blue-600 transition-colors">
              Browse Resources
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
              Admin
            </Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/#reviewers">Get Started</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/#reviewers"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Resources
              </Link>
              <Link
                href="/admin"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 w-fit">
                <Link href="/#reviewers" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}