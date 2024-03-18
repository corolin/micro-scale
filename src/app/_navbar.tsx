import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <aside className="tracking-tight p-4">
      <nav className="flex flex-row" id="nav">
        <Button variant="link" asChild>
          <Link href="/">
            <Image
              src="/logo.svg"
              width={24}
              height={24}
              alt="Micro Scale Logo"
              className="mr-2"
            />
            <span>µScale</span>
          </Link>
        </Button>
        <div className="flex flex-row space-x-0 ml-auto">
          <Button variant="link" className="text-zinc-500" asChild>
            <Link href="/pricing">Pricing</Link>
          </Button>
          <Button variant="link" className="text-zinc-500" asChild>
            <Link href="/auth/sign-in">My Account</Link>
          </Button>
          <Button asChild>
            <Link href="/upscale">Upload my image</Link>
          </Button>
        </div>
      </nav>
    </aside>
  );
}
