import { Button } from '@/components/ui/button'
import { Timer, ShieldCheck, FileText, UserCheck } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Review Smarter, Not Harder.
              <br />
              <span className="text-blue-600">Fix your exam weaknesses.</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
              Cramming? Struggling with mock scores? Only have 2 weeks left?
              <br className="hidden sm:block" />
              We offer solution packs designed for your specific challenge — not just your subject.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/#reviewers">🔍 Find My Exam Solution</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/#how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <Timer className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Built for Speed</h3>
              <p className="text-gray-600 text-sm">Beat time pressure with speed drills</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Confidence Packs</h3>
              <p className="text-gray-600 text-sm">Built to reduce test anxiety</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Mock Simulations</h3>
              <p className="text-gray-600 text-sm">Real test format + pacing practice</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <UserCheck className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Student-Proven</h3>
              <p className="text-gray-600 text-sm">Used by 1,000+ test takers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
