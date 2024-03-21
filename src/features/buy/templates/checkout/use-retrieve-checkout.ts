import { useCallback, useEffect, useState } from "react";

export default function useRetrieveCheckout(sessionId?: string | null) {
  const [status, setStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const checkSession = useCallback(async () => {
    setStatus("processing");
    const res = await fetch("/api/checkout/" + sessionId!, {
      method: "POST",
    });

    if (!res.ok) {
      setStatus("error");
      setIsVerified(false);
      return;
    }

    setStatus("success");
    setIsVerified(true);
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) return;
    checkSession();
  }, [checkSession, sessionId]);

  return {
    status,
    isVerified,
  };
}
