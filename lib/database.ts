import { sampleReviewers } from './sampleReviewers'

export type Reviewer = {
  id: string
  title: string
  description: string
  subject: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  price: number
  payment_url: string
  image_url?: string
  created_at: string
}

// Local storage keys
const REVIEWERS_KEY = 'examreview_reviewers'
const ADMIN_KEY = 'examreview_admin'

// Initialize data if not exists
export const initializeData = () => {
  if (typeof window !== 'undefined') {
    const existingReviewers = localStorage.getItem(REVIEWERS_KEY)
    if (!existingReviewers) {
      localStorage.setItem(REVIEWERS_KEY, JSON.stringify(sampleReviewers))
    }
  }
}

// Reviewer CRUD operations
export const getReviewers = async (): Promise<Reviewer[]> => {
  if (typeof window === 'undefined') {
    return sampleReviewers
  }
  
  const reviewers = localStorage.getItem(REVIEWERS_KEY)
  return reviewers ? JSON.parse(reviewers) : sampleReviewers
}

export const addReviewer = async (reviewer: Omit<Reviewer, 'id' | 'created_at'>): Promise<Reviewer> => {
  const newReviewer: Reviewer = {
    ...reviewer,
    id: Date.now().toString(),
    created_at: new Date().toISOString()
  }
  
  const reviewers = await getReviewers()
  const updatedReviewers = [newReviewer, ...reviewers]
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(REVIEWERS_KEY, JSON.stringify(updatedReviewers))
  }
  
  return newReviewer
}

export const updateReviewer = async (id: string, updates: Partial<Omit<Reviewer, 'id' | 'created_at'>>): Promise<Reviewer | null> => {
  const reviewers = await getReviewers()
  const index = reviewers.findIndex(r => r.id === id)
  
  if (index === -1) return null
  
  const updatedReviewer = { ...reviewers[index], ...updates }
  reviewers[index] = updatedReviewer
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(REVIEWERS_KEY, JSON.stringify(reviewers))
  }
  
  return updatedReviewer
}

export const deleteReviewer = async (id: string): Promise<boolean> => {
  const reviewers = await getReviewers()
  const filteredReviewers = reviewers.filter(r => r.id !== id)
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(REVIEWERS_KEY, JSON.stringify(filteredReviewers))
  }
  
  return true
}

// Simple admin authentication
export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  // Simple hardcoded admin credentials for demo
  const isValid = email === 'admin@examreview.ph' && password === 'admin123'
  
  if (isValid && typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_KEY, 'true')
  }
  
  return isValid
}

export const adminLogout = async (): Promise<void> => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_KEY)
  }
}

export const isAdminLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(ADMIN_KEY) === 'true'
}