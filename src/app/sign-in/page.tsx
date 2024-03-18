"use client";

import { Button } from "@/components/ui/button";
import { env } from "@/env.mjs";
import { createBrowserClient } from "@supabase/ssr";
import { GithubIcon } from "lucide-react";

export default function Page() {
  const supabase = createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const loginWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/upscale`,
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center pt-40">
      <section className="flex flex-col justify-center">
        <h1 className="text-2xl font-semibold text-balance font-heading">
          Sign in
        </h1>
        <p className="text-sm text-balance max-w-[38rem] text-zinc-500">
          To use µScale, you need to sign in with your account.
        </p>

        <div className="bg-white rounded-lg border border-zinc-200 p-6 grid content-start gap-2 mt-4">
          <Button size="lg" onClick={loginWithGitHub}>
            <GithubIcon className="size-5 mr-2" />
            Sign in with GitHub
          </Button>
        </div>
        <p className="text-xs max-w-[20rem] mt-2 text-zinc-500">
          If you don't have an account, a new one will be created for you.
        </p>
      </section>
    </div>
  );
}
