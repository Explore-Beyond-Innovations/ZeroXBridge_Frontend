import { clsx, type ClassValue } from "clsx";
import { StarknetProviders, starknetConnectorMeta } from "@/lib/connectors";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDate(): string {
  const now = new Date();

  const day = now.getDate();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  const hours24 = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const hours12 = hours24 % 12 || 12;
  const ampm = hours24 >= 12 ? "PM" : "AM";

  return `${day} ${month} ${year} ${hours12}:${minutes}:${seconds}${ampm}`;
}

export const shortenAddress = (address: string) => {
  if (!address) return;
  const shortened = `${address.slice(0, 4)}...${address.slice(-6)}`;
  return shortened;
};

export const getInjectedStarknetWallets = (): StarknetProviders[] => {
  if (typeof window === "undefined") return [];

  type StarknetWindow = {
    starknet?: unknown;
    starknet_braavos?: unknown;
    starknet_argentX?: unknown;
  };
  const win = window as unknown as StarknetWindow;

  const wallets: StarknetProviders[] = [];

  if (win.starknet_braavos) {
    wallets.push({
      id: starknetConnectorMeta.braavos.id,
      name: starknetConnectorMeta.braavos.name,
      icon: starknetConnectorMeta.braavos.icon,
    });
  }

  if (win.starknet_argentX) {
    wallets.push({
      id: starknetConnectorMeta.argentX.id,
      name: starknetConnectorMeta.argentX.name,
      icon: starknetConnectorMeta.argentX.icon,
    });
  }

  // Fallback
  if (win.starknet && wallets.length === 0) {
    wallets.push({
      id: starknetConnectorMeta.argentX.id,
      name: starknetConnectorMeta.argentX.name,
      icon: starknetConnectorMeta.argentX.icon,
    });
  }

  return wallets;
};
