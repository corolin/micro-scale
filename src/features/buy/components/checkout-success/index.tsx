import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessDisplay() {
  return (
    <div className="flex flex-col items-center pt-40">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-7xl font-semibold text-balance text-center font-heading">
          Thanks for your purchase!
        </h1>
        <p className="text-xl text-balance max-w-[38rem] mt-8 text-center text-zinc-500">
          Your credits have been added to your account.
        </p>

        <div className="flex items-center gap-x-2 mt-5">
          <Button size="lg" asChild>
            <Link href="/upscale">
              Upscale now !
              <SparklesIcon className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
