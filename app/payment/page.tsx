'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getReviewers, Reviewer } from '@/lib/database'
import Image from 'next/image'
import { Check, Clock, ExternalLink, Mail, QrCode } from 'lucide-react'

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
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* ← Back to Home Button */}
        <div className="mt-2">
          <a
            href="/"
            className="inline-block bg-white border border-gray-300 text-sm text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            ← Back to Home
          </a>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Checkout: {selectedProduct.title}</h1>
          <p className="text-gray-600 mt-2">Pay via GCash and receive your reviewer by email within 24 hours.</p>
        </div>

        {/* Selected Reviewer Display */}
        <section className="bg-white border shadow rounded-xl p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <Image
              src={selectedProduct.image_url || '/placeholder-reviewer.png'}
              alt={selectedProduct.title}
              width={200}
              height={200}
              className="rounded bg-gray-100"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{selectedProduct.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{selectedProduct.description}</p>
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                  {selectedProduct.subject}
                </span>
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  {selectedProduct.difficulty}
                </span>
              </div>
              <p className="mt-4 font-bold text-blue-600 text-lg">₱{selectedProduct.price}</p>
            </div>
          </div>
        </section>

        {/* GCash Payment Instructions */}
        <section className="bg-white border shadow rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold mb-3">Step 1: Send Payment via GCash</h2>
          <p className="text-sm text-gray-800">Send <strong>₱{selectedProduct.price}</strong> to:</p>
          <p className="text-sm font-mono text-gray-800 mt-1">Juan Dela Cruz — 0917-XXXXXXX</p>

          <div className="mt-6 inline-block border rounded-xl p-4 bg-gray-50">
            <QrCode className="mx-auto mb-2 text-gray-400" />
            <Image
              src="/gcash-qr.png"
              alt="GCash QR Code"
              width={180}
              height={180}
              className="rounded"
            />
            <p className="text-xs text-gray-500 mt-2">Scan this QR code using GCash App</p>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-300 text-yellow-800 p-3 rounded text-sm">
            Don’t forget to take a screenshot of your payment confirmation!
          </div>
        </section>

        {/* Google Form Submission */}
        <section className="bg-white border shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Step 2: Submit Payment Proof</h2>
          <p className="text-sm text-gray-700 mb-2">Upload your payment screenshot using this form:</p>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSf_example_form_id/viewform?embedded=true"
            width="100%"
            height="500"
            className="rounded border"
          />
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 mb-1">Having trouble with the form?</p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf_example_form_id/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 underline text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              Open in new tab
            </a>
          </div>
        </section>

        {/* Post-Purchase Instructions */}
        <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">What Happens Next?</h3>
          <ul className="text-sm text-gray-700 space-y-3">
            <li className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-blue-500 mt-1" />
              We will verify your payment and send the reviewer to your email within 24 hours.
            </li>
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-green-500 mt-1" />
              Check your inbox and spam folder. Look for a message from <strong>support@examreview.ph</strong>.
            </li>
            <li className="flex items-start gap-2">
              📩 For help, email us at:
              <a href="mailto:support@examreview.ph" className="text-blue-600 underline ml-1">
                support@examreview.ph
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}
