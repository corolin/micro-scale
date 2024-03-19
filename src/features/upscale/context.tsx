"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type UpscaleContext = {
  currentPredictionId: string | null;
  setCurrentPredictionId: (id: string | null) => void;
};

const UpscaleContext = createContext<UpscaleContext | null>(null);

export const useUpscaleContext = () => {
  const context = useContext(UpscaleContext);
  if (!context) {
    throw new Error("useUpscaleContext must be used within a UpscaleProvider");
  }
  return context;
};

export default function UpscaleProvider({ children }: { children: ReactNode }) {
  const [currentPredictionId, setCurrentPredictionId] = useState<string | null>(
    null
  );
  return (
    <UpscaleContext.Provider
      value={{
        currentPredictionId,
        setCurrentPredictionId,
      }}
    >
      {children}
    </UpscaleContext.Provider>
  );
}
