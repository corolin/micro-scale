import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center pt-40">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-7xl font-semibold text-balance text-center font-heading">
          A micro app to upscale your images using Replicate AI
        </h1>
        <p className="text-xl text-balance max-w-[38rem] mt-8 text-center text-zinc-500">
          This app is open-source, feel free to use it as a starting point for
          your next project.
        </p>

        <div className="flex items-center gap-x-2 mt-5">
          <Button size="lg" asChild>
            <Link href="/upscale">Try it now</Link>
          </Button>
        </div>
      </section>

      <section className="w-full rounded-tl-none rounded-3xl  p-6 mt-56">
        <h3 className="text-4xl font-semibold text-balance text-center font-heading text-zinc-800">
          Features
        </h3>
        <div className="grid grid-cols-2 gap-10 mt-10 relative">
          <div className="w-full h-full bg-white border border-zinc-200 p-5 rounded-3xl rounded-br-none space-y-2">
            <Image
              src="/brands/nextdotjs.svg"
              width={40}
              height={40}
              alt="Next.js logo"
            />
            <h4 className="text-base font-medium text-balance">Next.js</h4>
            <p className="text-sm text-zinc-500">v14 with RSC</p>
          </div>
          <div className="w-full h-full bg-white border border-zinc-200 p-5 rounded-3xl rounded-bl-none space-y-2">
            <Image
              src="/brands/replicate.svg"
              width={40}
              height={40}
              alt="Replicate logo"
            />
            <h4 className="text-base font-medium text-balance">Replicate</h4>
            <span className="text-sm text-zinc-500">
              Use of{" "}
              <Link
                href="https://replicate.com/nightmareai/real-esrgan"
                className="text-black underline"
              >
                nightmareai/real-esrgan
              </Link>{" "}
              model to upscale images
            </span>
          </div>

          <div className="w-full h-full bg-white border border-zinc-200 p-5 rounded-3xl rounded-tr-none space-y-2">
            <Image
              src="/brands/stripe.svg"
              width={40}
              height={40}
              alt="Next.js logo"
            />
            <h4 className="text-base font-medium text-balance">Stripe.js</h4>
            <p className="text-sm text-zinc-500">
              Buy credits to upscale your images
            </p>
            spI
          </div>
          <div className="w-full h-full bg-white border border-zinc-200 p-5 rounded-3xl rounded-tl-none space-y-2">
            <Image
              src="/brands/supabase.svg"
              width={40}
              height={40}
              alt="Next.js logo"
            />
            <h4 className="text-base font-medium text-balance">Supabase</h4>
            <p className="text-sm text-zinc-500">
              A Postgres database to store user data and process images
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
