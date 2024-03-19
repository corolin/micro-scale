import { env } from "@/env.mjs";
import createSupabaseAdminClient from "@/lib/supabase/admin";
import createSupabaseServerClient from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const { searchParams, origin } = requestUrl;

  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const cookieStore = cookies();
    const supabase = await createSupabaseServerClient();

    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    const userId = data?.user?.id;

    if (!userId) {
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    /**
     * Check if the user has its userId linked in the "credits" table (DB)
     * If not, create a new record for the user with the default amount of credits (env.DEFAULT_CREDITS_PER_USER)
     */
    const { error: creditsError } = await initializeCredits(userId);
    if (creditsError) {
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}

async function initializeCredits(userId: string) {
  const supabase = await createSupabaseAdminClient();

  const { data } = await supabase
    .from("credits")
    .select()
    .eq("user_id", userId);

  const hasInitializedCredits = (data ?? []).length > 0;

  if (!hasInitializedCredits) {
    const { error: creditsError } = await supabase
      .from("credits")
      .insert([{ user_id: userId, amount: env.DEFAULT_CREDITS_PER_USER }]);

    if (creditsError) {
      console.error("Error initializing credits for user", creditsError);
      return {
        error: creditsError,
      };
    }
  }

  return {
    error: null,
  };
}
