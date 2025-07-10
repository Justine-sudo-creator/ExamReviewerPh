import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      reviewers: {
        Row: {
          id: string
          title: string
          description: string
          subject: string
          difficulty: 'Easy' | 'Medium' | 'Hard'
          price: number
          payment_url: string
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          subject: string
          difficulty: 'Easy' | 'Medium' | 'Hard'
          price: number
          payment_url: string
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          subject?: string
          difficulty?: 'Easy' | 'Medium' | 'Hard'
          price?: number
          payment_url?: string
          image_url?: string | null
          created_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          password_hash: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          created_at?: string
        }
      }
    }
  }
}