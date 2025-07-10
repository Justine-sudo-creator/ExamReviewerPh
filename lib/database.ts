import { supabase } from './supabase'
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

// Local storage keys (fallback for when Supabase is not configured)
const REVIEWERS_KEY = 'examreview_reviewers'
const ADMIN_KEY = 'examreview_admin'

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && 
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
         process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-project-url'
}

// Initialize data if not exists (fallback for localStorage)
export const initializeData = () => {
  if (typeof window !== 'undefined' && !isSupabaseConfigured()) {
    const existingReviewers = localStorage.getItem(REVIEWERS_KEY)
    if (!existingReviewers) {
      localStorage.setItem(REVIEWERS_KEY, JSON.stringify(sampleReviewers))
    }
  }
}

// Reviewer CRUD operations
export const getReviewers = async (): Promise<Reviewer[]> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('reviewers')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching reviewers from Supabase:', error)
      // Fallback to localStorage
      if (typeof window !== 'undefined') {
        const reviewers = localStorage.getItem(REVIEWERS_KEY)
        return reviewers ? JSON.parse(reviewers) : sampleReviewers
      }
      return sampleReviewers
    }
  } else {
    // Fallback to localStorage
    if (typeof window === 'undefined') {
      return sampleReviewers
    }
    
    const reviewers = localStorage.getItem(REVIEWERS_KEY)
    return reviewers ? JSON.parse(reviewers) : sampleReviewers
  }
}

export const addReviewer = async (reviewer: Omit<Reviewer, 'id' | 'created_at'>): Promise<Reviewer> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('reviewers')
        .insert([reviewer])
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error adding reviewer to Supabase:', error)
      throw error
    }
  } else {
    // Fallback to localStorage
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
}

export const updateReviewer = async (id: string, updates: Partial<Omit<Reviewer, 'id' | 'created_at'>>): Promise<Reviewer | null> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('reviewers')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error updating reviewer in Supabase:', error)
      throw error
    }
  } else {
    // Fallback to localStorage
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
}

export const deleteReviewer = async (id: string): Promise<boolean> => {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('reviewers')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deleting reviewer from Supabase:', error)
      throw error
    }
  } else {
    // Fallback to localStorage
    const reviewers = await getReviewers()
    const filteredReviewers = reviewers.filter(r => r.id !== id)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(REVIEWERS_KEY, JSON.stringify(filteredReviewers))
    }
    
    return true
  }
}

// Simple admin authentication
export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  if (isSupabaseConfigured()) {
    try {
      // For demo purposes, we'll use simple email/password check
      // In production, use Supabase Auth or proper authentication
      const isValid = email === 'admin@examreview.ph' && password === 'admin123'
      
      if (isValid && typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_KEY, 'true')
        // Set session expiry (24 hours)
        const expiry = new Date().getTime() + (24 * 60 * 60 * 1000)
        localStorage.setItem(ADMIN_KEY + '_expiry', expiry.toString())
      }
      
      return isValid
    } catch (error) {
      console.error('Error during admin login:', error)
      return false
    }
  } else {
    // Fallback to localStorage
    const isValid = email === 'admin@examreview.ph' && password === 'admin123'
    
    if (isValid && typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_KEY, 'true')
    }
    
    return isValid
  }
}

export const adminLogout = async (): Promise<void> => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_KEY)
    localStorage.removeItem(ADMIN_KEY + '_expiry')
  }
}

export const isAdminLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const isLoggedIn = localStorage.getItem(ADMIN_KEY) === 'true'
  
  if (isSupabaseConfigured()) {
    // Check session expiry
    const expiry = localStorage.getItem(ADMIN_KEY + '_expiry')
    if (expiry && new Date().getTime() > parseInt(expiry)) {
      adminLogout()
      return false
    }
  }
  
  return isLoggedIn
}