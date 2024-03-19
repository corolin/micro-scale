"use server";

import { createClient } from "@supabase/supabase-js";

import { env } from "@/env.mjs";
import type { Database } from "../../../types/supabase";

/**
 * Used to create a Supabase server service client that bypass RLS
 */
export default async function createSupabaseAdminClient() {
  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );
}
