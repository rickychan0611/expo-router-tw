import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://hlutcdgwrptpczkwtrzp.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsdXRjZGd3cnB0cGN6a3d0cnpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MDk1MDUsImV4cCI6MjAyOTQ4NTUwNX0.AiRJvaaQyL__vf9j22zANYJ_MXLhvjZJFqD1wF0FIK4");

// supabase.auth.signInWithOAuth({
//   provider: 'google',
// })

export const API = {
  getCountries: async () => {
    const { data }: any = await supabase.from("countries").select();
    return data
  }
}
