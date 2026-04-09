import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;

// Server-side client (full access, never expose to client)
export const supabaseAdmin = () =>
  createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
