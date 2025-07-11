import { Button } from '@/components/ui/button'
import { Users, Shield, FileText, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Built by students who passed the CETs
              <br />
              <span className="block">so you can pass them too 😘</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl leading-relaxed">
              We know how hard it is to find good reviewers. That’s why we built a platform where students can access student-made digital reviewers and more, so you don't have to struggle finding them anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 py-3 font-semibold">
                <Link href="/#reviewers">Get started today</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-2 border-yellow-400 text-gray-900 hover:bg-yellow-50 rounded-full px-8 py-3 font-semibold">
                <Link href="/#how-it-works">Our plans</Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Illustration Placeholder */}
          <div className="relative w-full h-96">
            <Image
              src="/exams.png"
              alt="Illustration"
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
          </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {/* Community Insights Card */}
          <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl p-8 border border-pink-200">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-pink-800" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Used by real passers</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Every reviewer here was actually made and used by students who passed various college entrance exams.
                </p>
                <Link href="/#reviewers" className="text-pink-800 font-semibold text-sm hover:underline">
                  Check our materials →
                </Link>
              </div>
            </div>
          </div>

          {/* Free Support Card */}
          <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-3xl p-8 border border-yellow-400">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-yellow-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Instant access, no stress</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Download your reviewers the moment you check out!
                </p>
                <Link href="/#how-it-works" className="text-yellow-900 font-semibold text-sm hover:underline">
                  Compare plans →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}