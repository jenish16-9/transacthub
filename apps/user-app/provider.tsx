"use client";
import { SessionProvider } from "next-auth/react";
import { WalletProvider } from "./context/WalletContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <WalletProvider>{children}</WalletProvider>
    </SessionProvider>
  );
};
