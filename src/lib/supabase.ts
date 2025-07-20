

import { createClient } from '@supabase/supabase-js'

// Configurações do Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Tipos TypeScript para o banco de dados
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          role: 'admin' | 'user'
          country: string
          sector?: string
          organization?: string
          avatar_url?: string
          verified: boolean
          created_at: string
          updated_at: string
          preferences: {
            language: 'pt' | 'en'
            notifications: boolean
            theme: 'light' | 'dark'
          }
        }
        Insert: {
          id: string
          email: string
          name: string
          role?: 'admin' | 'user'
          country: string
          sector?: string
          organization?: string
          avatar_url?: string
          verified?: boolean
          preferences?: {
            language: 'pt' | 'en'
            notifications: boolean
            theme: 'light' | 'dark'
          }
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'admin' | 'user'
          country?: string
          sector?: string
          organization?: string
          avatar_url?: string
          verified?: boolean
          updated_at?: string
          preferences?: {
            language: 'pt' | 'en'
            notifications: boolean
            theme: 'light' | 'dark'
          }
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description?: string
          country: string
          sector: string
          status: 'active' | 'completed' | 'paused' | 'cancelled'
          progress: number
          budget: number
          client_id?: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          description?: string
          country: string
          sector: string
          status?: 'active' | 'completed' | 'paused' | 'cancelled'
          progress?: number
          budget: number
          client_id?: string
          user_id: string
        }
        Update: {
          name?: string
          description?: string
          country?: string
          sector?: string
          status?: 'active' | 'completed' | 'paused' | 'cancelled'
          progress?: number
          budget?: number
          client_id?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          email?: string
          country: string
          phone?: string
          company?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          email?: string
          country: string
          phone?: string
          company?: string
        }
        Update: {
          name?: string
          email?: string
          country?: string
          phone?: string
          company?: string
          updated_at?: string
        }
      }
    }
  }
}

// Tipos auxiliares
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type Client = Database['public']['Tables']['clients']['Row']

// Funções auxiliares para autenticação
export const authHelpers = {
  // Verificar se usuário está logado
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // Buscar perfil do usuário
  async getUserProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) {
      console.error('Erro ao buscar perfil:', error)
      return null
    }
    
    return data
  },

  // Login com email e senha
  async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  // Registro com email e senha
  async signUpWithEmail(email: string, password: string, userData: {
    name: string
    country: string
    role?: 'admin' | 'user'
    sector?: string
    organization?: string
  }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userData.name,
          country: userData.country,
          role: userData.role || 'user',
          sector: userData.sector,
          organization: userData.organization
        }
      }
    })
    
    if (error) throw error
    return data
  },

  // Logout
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }
}
 
export default supabase