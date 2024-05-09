import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ikraksbmrnywydxckruk.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrcmFrc2Jtcm55d3lkeGNrcnVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNzEwOTAsImV4cCI6MjAyODc0NzA5MH0.wfNty5m6_TNl_i8K-5qf94tsN5ZH2uGzQYWG7ob4hpo"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})