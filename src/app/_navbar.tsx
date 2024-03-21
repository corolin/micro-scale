import { Button } from "@/components/ui/button";
import getUserSession from "@/lib/actions/get-user-session";
import createSupabaseServerClient from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import UserDropdownMenu from "./_user-menu";
import { SVGProps } from "react";

export const dynamic = "force-dynamic";

async function getUserCredits(userId?: string) {
  if (!userId) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("credits")
    .select()
    .eq("user_id", userId);

  return data?.[0]?.amount as number;
}

export default async function Navbar() {
  const { data } = await getUserSession();

  const avatarUrl = data.session?.user.user_metadata.avatar_url as string;

  const credits = await getUserCredits(data.session?.user.id);

  return (
    <aside className="tracking-tight px-4 pt-8">
      <nav className="flex flex-row" id="nav">
        <Button variant="link" asChild>
          <Link href="/">
            <Image
              src="/logo.png"
              width={1039}
              height={349}
              alt="MicroScale Logo"
              className="w-36"
            />
            <span className="sr-only">µScale</span>
          </Link>
        </Button>
        <div className="flex flex-row space-x-4 ml-auto">
          <Button variant="link" className="text-zinc-500" asChild>
            <Link href="/pricing">Pricing</Link>
          </Button>
          {!!data.session && (
            <div className="flex items-center gap-x-2">
              <span className="text-sm font-normal text-zinc-500">
                <span className="font-medium text-black">{credits}</span>{" "}
                credits
              </span>
              <UserDropdownMenu>
                <Image
                  src={avatarUrl}
                  width={32}
                  height={32}
                  className="rounded-full ring-1 ring-offset-1 ring-offset-white ring-zinc-400 hover:ring-emerald-400 cursor-pointer"
                  alt={data.session.user.user_metadata["user_name"]}
                />
              </UserDropdownMenu>
            </div>
          )}
          <Button asChild>
            <Link href="/upscale">Upscale</Link>
          </Button>
        </div>
      </nav>
    </aside>
  );
}
