import { createClient } from '@supabase/supabase-js'

// Your Supabase project URL and Key (from Supabase dashboard → Project Settings → API)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
