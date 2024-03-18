"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { env } from "@/env.mjs";
import { cookies } from "next/headers";
import type { Database } from "../../../types/supabase";

/**
 * Used to create a Supabase server service client that bypass RLS
 */
export default async function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}
