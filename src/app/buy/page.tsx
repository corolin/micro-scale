"use client";

import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

const createCheckoutSession = async () => {
  const res = await fetch("/api/checkout", {
    method: "POST",
  });

  if (!res.ok) {
    toast.error("Failed to create checkout session");
    return;
  }

  const { url } = await res.json();
  window.location.href = url;
};

const checkSession = async (id: string) => {
  const res = await fetch("/api/checkout/" + id, {
    method: "POST",
  });

  if (!res.ok) {
    return false;
  }

  return true;
};

export default function Page() {
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const isSuccess =
    searchParams.get("success") === "true" &&
    sessionId &&
    verificationStatus === "success";
  const isCanceled =
    searchParams.get("canceled") === "true" || verificationStatus === "error";

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

  /**
   * Check that the session is valid and has been completed
   */
  useEffect(() => {
    if (!sessionId) return;
    (async () => {
      setVerificationStatus("processing");
      const isVerified = await checkSession(sessionId);
      if (isVerified) {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("error");
      }
    })();
  }, [sessionId]);

  if (isSuccess) {
    return <SuccessDisplay />;
  }

  return (
    <>
      {verificationStatus === "processing" &&
        createPortal(<LoadingOverlay />, document.body)}
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
            <Button
              size="lg"
              onClick={async () => await createCheckoutSession()}
            >
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

const LoadingOverlay = () => {
  return (
    <div className="inset-0 fixed bg-white/80 z-50 backdrop-blur-xl flex items-center justify-center">
      <p className="text-base text-zinc-500">Processing your payment...</p>
    </div>
  );
};

const SuccessDisplay = () => {
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
};
