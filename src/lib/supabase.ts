import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://itjwqugkxtwlxxzutfxp.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0andxdWdreHR3bHh4enV0ZnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczODY0OTEsImV4cCI6MjA3Mjk2MjQ5MX0.CcT-Wz8FnrQc-YfZwBldwg0RYel3TppP4wSOpuY-MCA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)