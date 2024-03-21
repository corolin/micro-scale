import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center pt-20">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-7xl font-semibold text-balance text-center font-heading">
          Pricing
        </h1>
        <p className="text-xl text-balance max-w-[38rem] mt-8 text-center text-zinc-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus unde ad
          illo recusandae
        </p>

        <div className="border border-zinc-200 p-6 rounded-lg max-w-sm mt-5 w-full">
          <h2 className="text-4xl font-semibold text-balance mb-2">5 for 5!</h2>
          <p className="text-zinc-500 text-sm">
            Give your images a boost with 5 credits for $5.00
          </p>

          <div className="flex justify-end">
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/buy">
                Buy 5 credits for $5.00{" "}
                <ArrowRightIcon className="size-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
