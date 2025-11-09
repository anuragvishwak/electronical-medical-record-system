import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ilhlkysxiixzjodqjpwu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsaGxreXN4aWl4empvZHFqcHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1ODkwNTksImV4cCI6MjA3ODE2NTA1OX0._8S_yiGyVXsiYpq2FOCWCVqQ6H3z0aiPAEMA6uFyBYM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
