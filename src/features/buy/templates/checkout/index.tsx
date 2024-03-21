"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import PaymentSuccessDisplay from "../../components/checkout-success";
import ProcessingPaymentOverlay from "../../components/processing-payment-overlay";
import useCreateCheckout from "./use-create-checkout";
import useRetrieveCheckout from "./use-retrieve-checkout";

export default function BuyCheckoutTemplate() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { createCheckout, status: createCheckoutStatus } = useCreateCheckout();

  const { isVerified, status: retrieveCheckoutStatus } =
    useRetrieveCheckout(sessionId);

  const isSuccess =
    searchParams.get("success") === "true" && sessionId && isVerified;

  const isCanceled = searchParams.get("canceled") === "true" || !isVerified;

  /**
   * Display a toast message based on the purchase status
   */
  useEffect(() => {
    if (isCanceled) {
      toast.error(
        "Your purchase was canceled or an error has occured with your payment."
      );
      return;
    }
    if (isSuccess) {
      toast.success("Your purchase was successful");
      return;
    }
  }, [isCanceled, isSuccess]);

  if (isSuccess) {
    return <PaymentSuccessDisplay />;
  }

  return (
    <>
      {retrieveCheckoutStatus === "processing" ||
        (createCheckoutStatus === "processing" &&
          createPortal(<ProcessingPaymentOverlay />, document.body))}
      <div className="flex flex-col items-center pt-40">
        <section className="flex flex-col justify-center items-center">
          <h1 className="text-7xl font-semibold text-balance text-center font-heading">
            5 for 5!
          </h1>
          <p className="text-xl text-balance max-w-[38rem] mt-8 text-center text-zinc-500">
            Buy a pack of 5 credits for $5.00, allowing you to scale up to 5
            images!
          </p>

          <div className="flex items-center gap-x-2 mt-5">
            <Button size="lg" onClick={async () => await createCheckout()}>
              Buy Credits
            </Button>
          </div>

          <p className="text-xs text-zinc-500 mt-5">
            By purchasing, you agree to our{" "}
            <Link href="/terms" className="underline">
              Terms of Service
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
