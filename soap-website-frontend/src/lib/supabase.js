// src/lib/supabase.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kmwuzakqaolropalebaf.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttd3V6YWtxYW9scm9wYWxlYmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzMzg5MzcsImV4cCI6MjEwMzkxNDkzN30._OlyhSBsAlZQV-y1kayIhCB83dqq0emsT8M8Fl4VqyA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
