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
  <h1 className="text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem] font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
  <span className="block tracking-normal">It’s not hard,</span>
  <span className="block text-yellow-500 tracking-tight">it’s just new.</span>
</h1>

<p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
  Finding good entrance exam reviewers shouldn’t be a struggle. That’s why we built a platform where students can access student-made digital reviewers and more, so you don't have to struggle finding them anywhere.
</p>

  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
    <Button
  asChild
  size="lg"
  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-full px-8 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
>
  <Link href="/#reviewers">Get started today</Link>
</Button>

    <Button
      variant="outline"
      size="lg"
      asChild
      className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold rounded-full px-8 py-3 transition"
    >
      <Link href="/#how-it-works">See our plans</Link>
    </Button>
  </div>
</div>


          {/* Right Content - Illustration Placeholder */}
          <div className="relative w-full h-96 group">
  <Image
    src="/exams.png"
    alt="Illustration"
    layout="fill"
    objectFit="cover"
    className="rounded-2xl group-hover:scale-105 transition-transform duration-500 ease-in-out shadow-xl"
  />
</div>
          </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {/* Community Insights Card */}
  <div className="relative group overflow-hidden rounded-3xl p-8 border border-pink-200 bg-gradient-to-br from-pink-100 to-pink-200 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl">
    <div className="absolute -inset-1 bg-gradient-to-br from-pink-100 to-pink-300 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500 z-0 pointer-events-none" />
    
    <div className="relative z-10 flex items-start space-x-4">
      <div className="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center flex-shrink-0">
        <Shield className="h-6 w-6 text-pink-800" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Used by real passers</h3>
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
          Every reviewer here was made and used by students who passed various college entrance exams.
        </p>
        <Link href="/#reviewers" className="text-pink-800 font-semibold text-sm hover:underline">
          Check our materials →
        </Link>
      </div>
    </div>
  </div>

          {/* Free Support Card */}
  <div className="relative group overflow-hidden rounded-3xl p-8 border border-yellow-400 bg-gradient-to-br from-yellow-300 to-yellow-400 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl">
    <div className="absolute -inset-1 bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500 z-0 pointer-events-none" />
    
    <div className="relative z-10 flex items-start space-x-4">
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