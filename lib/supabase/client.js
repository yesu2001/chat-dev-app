import { createClient } from "@supabase/supabase-js";

const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Create a single supabase client for interacting with your database
export const supabase = createClient(dbUrl, anonKey);
