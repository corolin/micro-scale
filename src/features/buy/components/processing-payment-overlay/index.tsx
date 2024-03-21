import React from "react";

export default function ProcessingPaymentOverlay() {
  return (
    <div className="inset-0 fixed bg-white/80 z-50 backdrop-blur-xl flex items-center justify-center">
      <p className="text-base text-zinc-500">Processing your payment...</p>
    </div>
  );
}
