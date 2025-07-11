import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Reviewer = {
  id: string
  title: string
  description: string
  subject: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  price: number
  payment_url: string
  image_url?: string
  preview_url?: string
  created_at: string
}

// Admin authentication - keeping simple for demo
const ADMIN_KEY = 'examreview_admin'

// Reviewer CRUD operations using Supabase
export const getReviewers = async (): Promise<Reviewer[]> => {
  try {
    const { data, error } = await supabase
      .from('reviewers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching reviewers:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching reviewers:', error)
    return []
  }
}

export const addReviewer = async (reviewer: Omit<Reviewer, 'id' | 'created_at'>): Promise<Reviewer | null> => {
  try {
    const { data, error } = await supabase
      .from('reviewers')
      .insert([{
        ...reviewer,
        created_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) {
      console.error('Error adding reviewer:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error adding reviewer:', error)
    return null
  }
}

export const updateReviewer = async (id: string, updates: Partial<Omit<Reviewer, 'id' | 'created_at'>>): Promise<Reviewer | null> => {
  try {
    const { data, error } = await supabase
      .from('reviewers')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating reviewer:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error updating reviewer:', error)
    return null
  }
}

export const deleteReviewer = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('reviewers')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting reviewer:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting reviewer:', error)
    return false
  }
}

// Simple admin authentication (keeping localStorage for session management)
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

// Initialize sample data if needed (run this once to populate your database)
export const initializeSampleData = async (): Promise<void> => {
  try {
    // Check if we already have data
    const { data: existingData } = await supabase
      .from('reviewers')
      .select('id')
      .limit(1)

    if (existingData && existingData.length > 0) {
      console.log('Sample data already exists')
      return
    }

    // Sample data to insert
    const sampleReviewers = [
      {
        title: 'Complete Math Reviewer for UPCAT',
        description: 'Comprehensive math review covering algebra, geometry, and trigonometry with practice problems.',
        subject: 'Practice Sets',
        difficulty: 'Hard' as const,
        price: 299,
        payment_url: 'https://ko-fi.com/s/math-upcat-reviewer',
        image_url: '/preview-math.png',
        preview_url: 'https://example.com/preview/math-upcat'
      },
      {
        title: 'English Grammar Essentials',
        description: 'Master English grammar rules, vocabulary, and reading comprehension for entrance exams.',
        subject: 'Practice Sets',
        difficulty: 'Medium' as const,
        price: 199,
        payment_url: 'https://gumroad.com/l/english-grammar-essentials',
        image_url: '/preview-english.png',
        preview_url: 'https://example.com/preview/english-grammar'
      },
      {
        title: 'Filipino Literature and Language',
        description: 'Complete guide to Filipino literature, grammar, and language comprehension for college entrance exams.',
        subject: 'Practice Sets',
        difficulty: 'Medium' as const,
        price: 179,
        payment_url: 'https://ko-fi.com/s/filipino-literature',
        image_url: '/preview-filipino.png',
        preview_url: 'https://example.com/preview/filipino-lit'
      },
      {
        title: 'Logic and Critical Thinking',
        description: 'Develop your analytical and logical reasoning skills with comprehensive practice exercises.',
        subject: 'Practice Sets',
        difficulty: 'Hard' as const,
        price: 249,
        payment_url: 'https://gumroad.com/l/logic-critical-thinking',
        image_url: '/preview-logic.png',
        preview_url: 'https://example.com/preview/logic-thinking'
      },
      {
        title: 'Reading Comprehension Mastery',
        description: 'Improve your reading comprehension skills with varied passages and strategic techniques.',
        subject: 'Practice Sets',
        difficulty: 'Easy' as const,
        price: 149,
        payment_url: 'https://ko-fi.com/s/reading-comprehension',
        image_url: '/preview-reading.png',
        preview_url: 'https://example.com/preview/reading-comp'
      }
    ]

    const { error } = await supabase
      .from('reviewers')
      .insert(sampleReviewers)

    if (error) {
      console.error('Error inserting sample data:', error)
    } else {
      console.log('Sample data inserted successfully')
    }
  } catch (error) {
    console.error('Error initializing sample data:', error)
  }
}

// Remove the old initializeData function since we're using Supabase now
export const initializeData = () => {
  // This function is no longer needed with Supabase
  // Data persistence is handled by the database
  console.log('Using Supabase for data persistence')
}