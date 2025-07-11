'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getReviewers, Reviewer } from '@/lib/database'
import Image from 'next/image'
import { Check, Clock, ExternalLink, Mail, QrCode, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const [selectedProduct, setSelectedProduct] = useState<Reviewer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productId = searchParams.get('id')
        const productName = searchParams.get('product')
        
        const reviewers = await getReviewers()
        
        let matchedProduct = null
        
        // First try to match by ID (more reliable)
        if (productId) {
          matchedProduct = reviewers.find(reviewer => reviewer.id === productId)
        }
        
        // Fallback to matching by product name
        if (!matchedProduct && productName) {
          matchedProduct = reviewers.find(reviewer => reviewer.title === decodeURIComponent(productName))
        }
        
        // If still no match, use the first available product
        if (!matchedProduct && reviewers.length > 0) {
          matchedProduct = reviewers[0]
        }
        
        setSelectedProduct(matchedProduct ?? null)
      } catch (error) {
        console.error('Error fetching product data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProductData()
  }, [searchParams])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!selectedProduct) {
    return <div className="p-8 text-center text-gray-500">Loading product...</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Back Button */}
        <div className="mt-2">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout: {selectedProduct.title}</h1>
          <p className="text-gray-600">Pay via GCash and receive your reviewer by email within 24 hours.</p>
        </div>

        {/* Selected Reviewer Display */}
        <section className="bg-white shadow-sm rounded-3xl p-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-48 h-48 relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
              <Image
                src={selectedProduct.image_url || '/placeholder-reviewer.png'}
                alt={selectedProduct.title}
                fill
                className="object-cover"
                sizes="192px"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3 text-gray-900">{selectedProduct.title}</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{selectedProduct.description}</p>
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 font-medium">
                  {selectedProduct.subject}
                </span>
                <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full font-medium">
                  {selectedProduct.difficulty}
                </span>
              </div>
              <p className="font-bold text-gray-900 text-2xl">₱{selectedProduct.price}</p>
            </div>
          </div>
        </section>

        {/* GCash Payment Instructions */}
        <section className="bg-white shadow-sm rounded-3xl p-8 text-center border border-gray-200">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Step 1: Send Payment via GCash</h2>
          <p className="text-gray-700 mb-2">Send <strong className="text-gray-900">₱{selectedProduct.price}</strong> to:</p>
          <p className="font-mono text-gray-900 font-semibold text-lg mb-6">Jonathan Mationg — 0947-506-6184</p>

          <div className="inline-block">
  <div className="border-2 border-gray-200 rounded-2xl bg-gray-50">
    <Image
      src="/gcash-qr.png"
      alt="GCash QR Code"
      width={180}
      height={180}
      className="rounded-xl block"
    />
  </div>
  <p className="text-sm text-gray-600 text-center mt-2">Scan this QR code using GCash App</p>
</div>


          <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 text-yellow-800 p-4 rounded-2xl">
            <p className="font-semibold">📸 Don't forget to take a screenshot of your payment confirmation!</p>
          </div>
        </section>

        {/* Google Form Submission */}
        <section className="bg-white shadow-sm rounded-3xl p-8 border border-gray-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Step 2: Submit Payment Proof</h2>
          <p className="text-gray-700 mb-4 text-center">Upload your payment screenshot using this form:</p>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSe8wWTCa8ul6_7E72TWSp1yG0OSIGl-8uIWcY7diUGoLf3H2g/viewform?embedded=true"
            width="100%"
            height="500"
            className="rounded-2xl border-2 border-gray-200"
          />
          <div className="text-center mt-6">
            <p className="text-gray-600 mb-2">Having trouble with the form?</p>
            <Button asChild variant="outline" className="rounded-full">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe8wWTCa8ul6_7E72TWSp1yG0OSIGl-8uIWcY7diUGoLf3H2g/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open in new tab
              </a>
            </Button>
          </div>
        </section>

        {/* Post-Purchase Instructions */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-3xl p-8">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">What Happens Next?</h3>
          <ul className="text-gray-700 space-y-4 max-w-2xl mx-auto">
            <li className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
              <span>We will verify your payment and send the reviewer to your email within 24 hours.</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
              <span>Check your inbox and spam folder. Look for a message from <strong>justinemationg12@gmail.com</strong>.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1 flex-shrink-0">📩</span>
              <span>For help, email us at:
                <a href="mailto:support@examreview.ph" className="text-blue-600 font-semibold hover:underline ml-1">
                  justinemationg12@gmail.com
                </a>
              </span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}