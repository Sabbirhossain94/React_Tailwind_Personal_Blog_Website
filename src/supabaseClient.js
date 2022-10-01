import { createClient } from '@supabase/supabase-js'

const supabaseUrl = " https://uytustuoqlniazcbopzo.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5dHVzdHVvcWxuaWF6Y2JvcHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ2MTgyNDYsImV4cCI6MTk4MDE5NDI0Nn0.UA2WiOfl_m9suesZ1nj-YH0l7lQgBDkf88dSlIR-7OA"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase