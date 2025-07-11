'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Book, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Book className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-bold text-white">ExamReview PH</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#how-it-works" className="text-gray-300 hover:text-white transition-colors font-medium">
              How it works
            </Link>
            <Link href="/admin" className="text-gray-300 hover:text-white transition-colors font-medium">
              Admin
            </Link>
            <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full px-6">
              <Link href="/#reviewers">Get Started</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/#how-it-works"
                className="text-gray-300 hover:text-white transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                How it works
              </Link>
              <Link
                href="/admin"
                className="text-gray-300 hover:text-white transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full px-6 w-fit">
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