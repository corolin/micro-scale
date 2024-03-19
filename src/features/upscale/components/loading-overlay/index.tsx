import { Loader2 } from "lucide-react";
import React, { type ReactNode } from "react";

export default function LoadingOverlay({ children }: { children: ReactNode }) {
  return (
    <div className="inset-0 fixed text-sm bg-white/80 text-center backdrop-blur text-black  flex flex-col gap-2 items-center justify-center">
      <Loader2 className="animate-spin size-4" />
      {children}
    </div>
  );
}
