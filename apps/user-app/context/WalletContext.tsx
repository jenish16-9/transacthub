"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type WalletSnapshot = { amount: number; locked: number; updatedAt: string };
type WalletContextValue = WalletSnapshot & { refresh: () => Promise<void>; isRefreshing: boolean };
const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [wallet, setWallet] = useState<WalletSnapshot>({ amount: 0, locked: 0, updatedAt: "" });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    if (status !== "authenticated") return;
    setIsRefreshing(true);
    try {
      const response = await fetch("/api/wallet", { cache: "no-store" });
      if (response.ok) setWallet(await response.json());
    } finally {
      setIsRefreshing(false);
    }
  }, [status]);

  useEffect(() => {
    void refresh();
    if (status !== "authenticated") return;
    const interval = window.setInterval(() => void refresh(), 5000);
    return () => window.clearInterval(interval);
  }, [refresh, status]);

  return <WalletContext.Provider value={{ ...wallet, refresh, isRefreshing }}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used inside WalletProvider");
  return context;
}
