'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: "How do I receive the reviewers after payment?",
    answer: "Once payment is confirmed and proof is uploaded, you'll receive the soft copies via email within 24 hours. Don't forget to check your spam folder!",
  },
  {
    question: "Do you offer hard copy delivery?",
    answer: "At the moment, we only send digital copies. This allows fast delivery and keeps costs low for all students.",
  },
  {
    question: "Where do these reviewers come from?",
    answer: "All our reviewers are curated from materials used by real students who passed their entrance exams. Many are edited or compiled to remove irrelevant or low-quality content.",
  },
  {
    question: "Can I share the reviewer with my friends?",
    answer: "Each purchase is for personal use. We rely on honest students to respect our work and not redistribute the files.",
  },
  {
    question: "Can I sell my own reviewers here?",
    answer: "Yes! If you’ve created your own digital reviewers or want to share helpful materials with other students, you’re welcome to sell them here. Just message the owner through our contact page or social media.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleIndex = (index: number) => {
    setOpenIndex(index === openIndex ? null : index)
  }

  return (
    <section id="how-it-works" className="bg-gray-50 py-20 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works / FAQs</h2>
          <p className="text-lg text-gray-600">Everything you need to know about our platform</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="transition-all duration-300 border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-md"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="flex w-full justify-between items-center px-6 py-5 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base font-semibold text-gray-900 text-left">{faq.question}</span>
                  <div className="flex-shrink-0 ml-4">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
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