'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: "How do I receive the reviewers after payment?",
    answer: "Once payment is confirmed and proof is uploaded, you’ll receive the soft copies via email within 24 hours. Don’t forget to check your spam folder!",
  },
  {
    question: "Do you offer hard copy delivery?",
    answer: "At the moment, we only send digital copies. This allows fast delivery and keeps costs low for all students.",
  },
  {
    question: "What if I pay but don’t receive anything?",
    answer: "No worries—just contact our support. We verify all transactions manually and will make sure you receive your materials.",
  },
  {
    question: "Can I share the reviewer with my friends?",
    answer: "Each purchase is for personal use. We rely on honest students to respect our work and not redistribute the files.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleIndex = (index: number) => {
    setOpenIndex(index === openIndex ? null : index)
  }

  return (
    <section id="how-it-works" className="bg-white py-20 border-t border-gray-200 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">How It Works / FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="transition-all duration-300 border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="flex w-full justify-between items-center px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-base font-medium text-gray-800">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
