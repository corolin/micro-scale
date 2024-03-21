import { Button } from "@/components/ui/button";
import getUserSession from "@/lib/actions/get-user-session";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const { data } = await getUserSession();
  const hasSession = !!data.session;

  return (
    <div className="flex flex-col items-center pt-20">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-7xl font-semibold text-balance text-center font-heading">
          Pricing
        </h1>
        <p className="text-xl text-balance max-w-[38rem] mt-8 text-center text-zinc-500">
          Straightforward pricing for your upscaling needs.
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="border border-zinc-200 p-6 rounded-lg max-w-xs shadow-xl flex flex-col justify-between mt-5 w-full">
            <div>
              <h2 className="text-3xl font-semibold text-balance text-center font-heading">
                5 credits for free!
              </h2>
              <p className="text-zinc-500 text-sm text-center  mt-3">
                Once you sign up for the first time, you will get 5 credits for
                free to try out our service.
              </p>
            </div>

            {!hasSession && (
              <div className="flex justify-end mt-6">
                <Button variant="outline" asChild>
                  <Link href="/sign-in">Sign-up now</Link>
                </Button>
              </div>
            )}
          </div>
          <div className="border border-zinc-800 bg-zinc-900 p-6 rounded-lg max-w-xs shadow-xl flex flex-col justify-between mt-5 w-full">
            <div>
              <h2 className="text-3xl text-white font-semibold text-balance text-center font-heading">
                $5.00 for 5 credits
              </h2>
              <p className="text-zinc-400 text-sm text-center  mt-3">
                Need more credits? Buy{" "}
                <span className="text-white">5 credits</span> for{" "}
                <span className="text-white">$5.00</span> to continue your
                upscaling journey.
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <Button variant="default" asChild>
                <Link href="/buy">
                  Buy 5 credits for $5.00{" "}
                  <ArrowRightIcon className="size-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
