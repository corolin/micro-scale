import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function useCreateCheckout() {
  const [status, setStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const router = useRouter();
  const mutation = async () => {
    setStatus("processing");

    const res = await fetch("/api/checkout", {
      method: "POST",
    });

    if (!res.ok) {
      setStatus("error");
      toast.error("Failed to create checkout session");
      return;
    }

    setStatus("success");
    const { url } = await res.json();
    router.push(url);
  };

  return {
    createCheckout: mutation,
    status,
  };
}
