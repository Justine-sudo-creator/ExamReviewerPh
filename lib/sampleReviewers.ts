import { Reviewer } from './database'

export const sampleReviewers: Reviewer[] = [
  {
    id: '1',
    title: 'Complete Math Reviewer for UPCAT',
    description: 'Comprehensive math review covering algebra, geometry, and trigonometry with practice problems.',
    subject: 'Practice Sets',
    difficulty: 'Hard',
    price: 299,
    payment_url: 'https://ko-fi.com/s/math-upcat-reviewer',
    image_url: '/preview-math.png',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'English Grammar Essentials',
    description: 'Master English grammar rules, vocabulary, and reading comprehension for entrance exams.',
    subject: 'Practice Sets',
    difficulty: 'Medium',
    price: 199,
    payment_url: 'https://gumroad.com/l/english-grammar-essentials',
    image_url: '/preview-english.png',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Filipino Literature and Language',
    description: 'Comprehensive review of Filipino literature, grammar, and comprehension skills.',
    subject: 'Practice Sets',
    difficulty: 'Medium',
    price: 179,
    payment_url: 'https://ko-fi.com/s/filipino-literature-review',
    image_url: '/preview-filipino.png',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Logic and Critical Thinking',
    description: 'Develop logical reasoning skills with practice problems and step-by-step solutions.',
    subject: 'Practice Sets',
    difficulty: 'Hard',
    price: 249,
    payment_url: 'https://gumroad.com/l/logic-critical-thinking',
    image_url: '/preview-logic.png',
    created_at: new Date().toISOString()
  },
]
