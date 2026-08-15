"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const LoaderContext = createContext<{ ready: boolean; markReady: () => void }>({
  ready: false,
  markReady: () => {},
});

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  return (
    <LoaderContext.Provider value={{ ready, markReady: () => setReady(true) }}>
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);
